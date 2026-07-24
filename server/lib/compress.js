import { createGzip, createBrotliCompress, createDeflate } from 'zlib';

const encodings = {
  br: { create: createBrotliCompress, name: 'br' },
  gzip: { create: createGzip, name: 'gzip' },
  deflate: { create: createDeflate, name: 'deflate' },
};

export function createCompression() {
  return (req, res, next) => {
    const accept = req.headers['accept-encoding'] || '';
    let encoding;
    for (const key of ['br', 'gzip', 'deflate']) {
      if (accept.includes(key)) { encoding = encodings[key]; break; }
    }
    if (!encoding) return next();

    const originalEnd = res.end.bind(res);
    const originalWrite = res.write.bind(res);
    const chunks = [];
    res.write = (chunk) => { chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)); return true; };
    res.end = (chunk, ...args) => {
      if (chunk) chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
      const body = Buffer.concat(chunks);
      const compressor = encoding.create();
      const compressed = [];
      compressor.on('data', (c) => compressed.push(c));
      compressor.on('end', () => {
        res.setHeader('Content-Encoding', encoding.name);
        res.setHeader('Content-Length', String(Buffer.concat(compressed).length));
        originalEnd(Buffer.concat(compressed), ...args);
      });
      compressor.end(body);
    };
    next();
  };
}
