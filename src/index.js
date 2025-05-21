import { createServer } from 'http';

async function fetchInstanceId() {
  const token = await fetch('http://169.254.169.254/latest/api/token', {
    method: 'PUT',
    headers: { 'X-aws-ec2-metadata-token-ttl-seconds': '60' },
  }).then((res) => res.text());

  const instanceId = await fetch(
    'http://169.254.169.254/latest/meta-data/instance-id',
    {
      headers: { 'X-aws-ec2-metadata-token': token },
    },
  ).then((res) => res.text());

  if (!instanceId) {
    throw new Error('Unable to fetch instance ID.');
  }

  return instanceId;
}

const server = createServer((req, res) => {
  if (req.url === '/' && req.method === 'GET') {
    fetchInstanceId()
      .then((instanceId) => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ instanceId }));
      })
      .catch((error) => {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: error.message }));
      });
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

const PORT = process.env.PORT || 80;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
