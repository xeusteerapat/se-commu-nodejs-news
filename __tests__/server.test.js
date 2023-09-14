// api.test.js
import { describe, before, after, it } from 'node:test';
import { deepStrictEqual, ok, strictEqual } from 'node:assert';
import buildServer from '../server.js';

const BASE_URL = 'http://localhost:3000';

describe('API Workflow', t => {
  let _server = {};
  let _globalToken = '';

  before(async () => {
    _server = buildServer();
    await _server.listen();
  });

  after(done => _server.close(done));

  it('should receive not authorized given wrong user and password', async () => {
    const data = {
      user: 'xeusteerapat',
      password: 'wrongpassword',
    };

    const request = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      body: JSON.stringify(data),
    });

    strictEqual(request.status, 401);
    const response = await request.json();
    deepStrictEqual(response, { error: 'invalid username!' });
  });

  it('should login successfuly given user and password', async () => {
    const data = {
      user: 'xeusteerapat',
      password: '1234',
    };

    const request = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      body: JSON.stringify(data),
    });

    strictEqual(request.status, 200);
    const response = await request.json();

    ok(response.token, 'token should be present');
    _globalToken = response.token;
  });

  it('should throw 404 Not Found Error', async () => {
    const request = await fetch(`${BASE_URL}/xxx`, {
      method: 'POST',
      headers: {
        authorization: '',
      },
    });

    strictEqual(request.status, 404);
    const response = await request.json();
    deepStrictEqual(response, {
      message: 'Route POST:/xxx not found',
      error: 'Not Found',
      statusCode: 404,
    });
  });

  it('should be allowed to access private data with a valid token', async () => {
    const request = await fetch(`${BASE_URL}/`, {
      method: 'GET',
      headers: {
        authorization: _globalToken,
      },
    });

    strictEqual(request.status, 200);
    const response = await request.json();
    deepStrictEqual(response, { result: 'Hey welcome!' });
  });
});
