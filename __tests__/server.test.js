import { describe, before, after, it } from 'node:test';
import { deepStrictEqual, ok, strictEqual } from 'node:assert';
import buildServer from '../server.js';

describe('API Workflow', t => {
  let _server;
  let _globalToken = '';

  before(async () => {
    _server = await buildServer('test');
  });

  after(async () => {
    await _server.close();
    _server = null;
  });

  it('should receive not authorized given wrong user and password', async () => {
    const data = {
      user: 'xeusteerapat',
      password: 'wrongpassword',
    };

    const response = await _server.inject({
      url: '/login',
      method: 'POST',
      payload: data,
    });

    strictEqual(response.statusCode, 401);

    deepStrictEqual(JSON.parse(response.payload), {
      error: 'invalid username!',
    });
  });

  it('should login successfuly given user and password', async () => {
    const data = {
      user: 'xeusteerapat',
      password: '1234',
    };

    const response = await _server.inject({
      url: '/login',
      method: 'POST',
      payload: data,
    });

    strictEqual(response.statusCode, 200);

    ok(JSON.parse(response.body), 'token should be present');
    const { token } = response.json();
    _globalToken = token;
  });

  it('should throw 404 Not Found Error', async () => {
    const response = await _server.inject({
      url: '/xxx',
      method: 'POST',
      payload: {},
    });

    strictEqual(response.statusCode, 404);

    deepStrictEqual(response.json(), {
      message: 'Route POST:/xxx not found',
      error: 'Not Found',
      statusCode: 404,
    });
  });

  it('should be allowed to access private data with a valid token', async () => {
    const response = await _server.inject({
      url: '/',
      method: 'GET',
      headers: {
        authorization: _globalToken,
      },
    });

    strictEqual(response.statusCode, 200);

    deepStrictEqual(response.json(), { result: 'Hey welcome!' });
  });
});
