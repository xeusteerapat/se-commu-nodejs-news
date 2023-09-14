import Fastify from 'fastify';
import JWT from 'jsonwebtoken';

const DEFAULT_USER = {
  user: 'xeusteerapat',
  password: '1234',
};

const JWT_KEY = 'abc123';

async function loginRoute(request, reply) {
  const { user, password } = request.body;

  console.log('default', DEFAULT_USER.user);

  console.log('check user', user);
  console.log('check password', password);

  if (user !== DEFAULT_USER.user || password !== DEFAULT_USER.password) {
    reply.statusCode = 401;
    return { error: 'invalid username!' };
  }

  const token = JWT.sign({ user, message: 'hey duuude!' }, JWT_KEY);

  return { token };
}

function isHeadersValid(headers) {
  try {
    const auth = headers.authorization.replace(/bearer\s/gi, '');
    JWT.verify(auth, JWT_KEY);

    return true;
  } catch (error) {
    return false;
  }
}

async function loginHandler(request, response) {
  if (request.url === '/login' && request.method === 'POST') {
    return loginRoute(request, response);
  }

  if (!isHeadersValid(request.headers)) {
    response.writeHead(400);
    return response.end(JSON.stringify({ error: 'invalid token!' }));
  }

  response.end(JSON.stringify({ result: 'Hey welcome!' }));
}

function buildServer() {
  const server = Fastify({
    logger: true,
  });

  server.post('/login', async function handler(request, reply) {
    return loginHandler(request, reply);
  });

  return server;
}

export default buildServer;
