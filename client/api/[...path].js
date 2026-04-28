const BACKEND_BASE_URL =
  process.env.BACKEND_BASE_URL || 'https://thrift-place-api.vercel.app';

async function readRawBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}

module.exports = async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const targetPath = url.pathname.replace(/^\/api\/?/, '');
  const query = url.search || '';
  const targetUrl = `${BACKEND_BASE_URL}/api/${targetPath}${query}`;

  const headers = { ...req.headers };
  delete headers.host;
  delete headers.connection;
  delete headers['content-length'];
  delete headers.expect;

  const options = {
    method: req.method,
    headers,
  };

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    options.body = await readRawBody(req);
  }

  try {
    const upstreamResponse = await fetch(targetUrl, options);
    const responseBody = Buffer.from(await upstreamResponse.arrayBuffer());

    res.status(upstreamResponse.status);
    res.setHeader('x-proxy-target', targetUrl);
    upstreamResponse.headers.forEach((value, key) => {
      const lower = key.toLowerCase();
      if (lower === 'transfer-encoding') return;
      if (lower === 'content-encoding') return;
      if (lower === 'content-length') return;
      res.setHeader(key, value);
    });
    res.send(responseBody);
  } catch (error) {
    console.error('API proxy error:', error);
    res.status(502).json({ message: 'Proxy request failed.' });
  }
};
