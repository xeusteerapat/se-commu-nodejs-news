import Fastify from 'fastify';
import JWT from 'jsonwebtoken';

const DEFAULT_USER = {
  user: 'xeusteerapat',
  password: '1234',
};

const JWT_KEY = 'abc123';

async function loginRoute(request, reply) {
  const { user, password } = JSON.parse(request.body);

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

async function loginHandler(request, reply) {
  if (request.url === '/login' && request.method === 'POST') {
    return loginRoute(request, reply);
  }

  if (!isHeadersValid(request.headers)) {
    reply.status = 400;
    return reply.end(JSON.stringify({ error: 'invalid token!' }));
  }

  reply.send({ result: 'Hey welcome!' });
}

function buildServer() {
  const server = Fastify({
    logger: true,
  });

  server.post('/login', async function handler(request, reply) {
    return loginHandler(request, reply);
  });

  server.get('/', async function handler(request, reply) {
    return loginHandler(request, reply);
  });

  return server;
}

export default buildServer;
