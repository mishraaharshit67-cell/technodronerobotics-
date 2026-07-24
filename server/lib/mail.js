import net from 'net';
import tls from 'tls';

export async function sendEmail({ to, subject, text, html }) {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.SMTP_PORT || '587');
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM || user;

  if (!user || !pass) {
    console.warn('SMTP not configured — email not sent');
    return;
  }

  return new Promise((resolve, reject) => {
    const useTLS = port === 465;
    const socket = useTLS
      ? tls.connect(port, host, { rejectUnauthorized: false })
      : net.createConnection(port, host);

    let buffer = '';
    let step = 0;
    let base64Auth = Buffer.from(`${user}:${pass}`).toString('base64');

    const boundary = `=_${Math.random().toString(36).slice(2, 10)}`;

    const htmlPart = html ? `\r\n--${boundary}\r\nContent-Type: text/html; charset="UTF-8"\r\nContent-Transfer-Encoding: 7bit\r\n\r\n${html}` : '';
    const body = text
      ? `\r\n--${boundary}\r\nContent-Type: text/plain; charset="UTF-8"\r\nContent-Transfer-Encoding: 7bit\r\n\r\n${text}${htmlPart}\r\n--${boundary}--`
      : html;

    const message = [
      `From: ${from}`,
      `To: ${to}`,
      `Subject: ${subject}`,
      `MIME-Version: 1.0`,
      `Content-Type: multipart/alternative; boundary="${boundary}"`,
      ``,
      `This is a multi-part message in MIME format.`,
      body,
    ].join('\r\n');

    const commands = [
      () => sendLine(`EHLO ${host}`),
      () => sendLine('STARTTLS'),
    ];

    let isTLSUpgraded = false;

    function sendLine(line) {
      socket.write(line + '\r\n');
    }

    function onData(data) {
      buffer += data.toString();
      const responses = buffer.split('\r\n');
      buffer = responses.pop() || '';

      for (const resp of responses) {
        if (!resp || resp.length < 3) continue;
        const code = parseInt(resp.slice(0, 3));

        if (step === 0 && code === 220) {
          step++;
          sendLine(`EHLO ${host}`);
        } else if (step === 1 && code === 250) {
          if (!useTLS && !isTLSUpgraded) {
            step = 2;
            sendLine('STARTTLS');
          } else {
            step = 3;
            sendLine('AUTH LOGIN');
          }
        } else if (step === 2 && code === 220) {
          isTLSUpgraded = true;
          socket.removeListener('data', onData);
          const sslSocket = tls.connect({ socket, rejectUnauthorized: false });
          sslSocket.on('data', (d) => {
            const str = d.toString();
            if (str.includes('220') || str.includes('250')) {
              step = 3;
              sslSocket.write('AUTH LOGIN\r\n');
            }
          });
          sslSocket.on('close', () => reject(new Error('TLS handshake failed')));
          return;
        } else if (step === 3 && code === 334) {
          step = 4;
          sendLine(base64Auth);
        } else if (step === 4 && code === 334) {
          step = 5;
          sendLine(Buffer.from(pass).toString('base64'));
        } else if (step === 5 && code === 235) {
          step = 6;
          sendLine(`MAIL FROM:<${from}>`);
        } else if (step === 6 && code === 250) {
          step = 7;
          sendLine(`RCPT TO:<${to}>`);
        } else if (step === 7 && code === 250) {
          step = 8;
          sendLine('DATA');
        } else if (step === 8 && code === 354) {
          step = 9;
          sendLine(message + '\r\n.');
        } else if (step === 9 && code === 250) {
          step = 10;
          sendLine('QUIT');
          resolve();
        }
      }
    }

    socket.on('data', onData);
    socket.on('error', reject);
    socket.on('close', () => { if (step < 10) reject(new Error('Connection closed before completion')); });
  });
}
