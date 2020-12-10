import request from 'supertest';
import expect from 'expect';
import app from '../index';

describe('GET /', () => {
  it('Should get Active status of the server', (done) => {
    const status = 'Active';

    request(app)
      .get('/home')
      .expect(200)
      .expect((result) => {
        expect(result.body.status).toBe(status);
      })
      .end(done);
  });
});

describe('GET /database', () => {
  it('Should get status of the database: 1-connected', (done) => {
    request(app)
      .get('/database')
      .expect((result) => {
        expect(result.status).toBe(200);
        expect(result.body.message).toBe('Database connected');
      })
      .end(done);
  });
});
