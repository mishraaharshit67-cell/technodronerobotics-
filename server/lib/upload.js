import { randomUUID } from 'crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const UPLOAD_DIR = path.resolve(__dirname, '..', 'uploads');

if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

export function createUpload(opts = {}) {
  const allowedMimes = opts.allowedMimes || ['image/jpeg', 'image/png', 'image/webp'];
  const maxSize = opts.maxSize || 5 * 1024 * 1024;

  return (req, res, next) => {
    const contentType = req.headers['content-type'] || '';
    if (!contentType.includes('multipart/form-data')) {
      return res.status(400).json({ success: false, message: 'Expected multipart/form-data' });
    }
    const boundary = contentType.split('boundary=')[1];
    if (!boundary) return res.status(400).json({ success: false, message: 'No boundary found' });

    const chunks = [];
    req.on('data', (c) => chunks.push(c));
    req.on('end', () => {
      const buf = Buffer.concat(chunks);
      const parts = parseMultipart(buf, boundary);
      const file = parts.find(p => p.filename);
      if (!file) return res.status(400).json({ success: false, message: 'No file uploaded' });
      if (file.size > maxSize) return res.status(400).json({ success: false, message: 'File too large' });
      if (!allowedMimes.includes(file.contentType)) return res.status(400).json({ success: false, message: 'File type not allowed' });

      const ext = path.extname(file.filename) || '.bin';
      const savedName = `${randomUUID()}${ext}`;
      const filePath = path.join(UPLOAD_DIR, savedName);
      fs.writeFileSync(filePath, file.data);

      req.file = { originalname: file.filename, filename: savedName, path: filePath, mimetype: file.contentType, size: file.size };
      req.files = parts.filter(p => p.filename).map(f => {
        const e = path.extname(f.filename) || '.bin';
        const n = `${randomUUID()}${e}`;
        fs.writeFileSync(path.join(UPLOAD_DIR, n), f.data);
        return { originalname: f.filename, filename: n, path: path.join(UPLOAD_DIR, n), mimetype: f.contentType, size: f.size };
      });
      next();
    });
  };
}

function parseMultipart(buf, boundary) {
  const parts = [];
  const delimiter = Buffer.from(`--${boundary}`);
  const endDelimiter = Buffer.from(`--${boundary}--`);

  let start = buf.indexOf(delimiter);
  if (start === -1) return parts;
  start = buf.indexOf(Buffer.from('\r\n'), start) + 2;

  while (start < buf.length) {
    const nextDelim = buf.indexOf(delimiter, start);
    if (nextDelim === -1) break;

    const section = buf.slice(start, nextDelim);
    const headerEnd = section.indexOf(Buffer.from('\r\n\r\n'));
    if (headerEnd === -1) { start = nextDelim + delimiter.length + 2; continue; }

    const headerRaw = section.slice(0, headerEnd).toString();
    const data = section.slice(headerEnd + 4);
    const trimmed = data[data.length - 1] === 10 ? data.slice(0, -2) : data; // remove trailing \r\n

    const part = { headers: headerRaw, data: trimmed, size: trimmed.length };
    const cd = headerRaw.match(/Content-Disposition:[^;]*;\s*(.+)/i);
    if (cd) {
      const nameMatch = cd[1].match(/name="([^"]+)"/);
      if (nameMatch) part.name = nameMatch[1];
      const filenameMatch = cd[1].match(/filename="([^"]+)"/);
      if (filenameMatch) part.filename = filenameMatch[1];
    }
    const ctMatch = headerRaw.match(/Content-Type:\s*(\S+)/i);
    if (ctMatch) part.contentType = ctMatch[1];

    parts.push(part);
    if (buf.slice(nextDelim, nextDelim + endDelimiter.length).equals(endDelimiter)) break;
    start = nextDelim + delimiter.length + 2;
  }
  return parts;
}
