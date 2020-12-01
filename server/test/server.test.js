import request from 'supertest';
import expect from 'expect';
import app from '../index';

describe('GET /', () => {
  it('Should get Active status of the server', (done) => {
    const status = 'Active';

    request(app)
      .get('/')
      .expect(200)
      .expect((result) => {
        expect(result.body.status).toBe(status);
      })
      .end(done);
  });
});
