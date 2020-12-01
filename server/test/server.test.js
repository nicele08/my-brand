/* eslint-disable no-undef */
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
    const state = 1;

    request(app)
      .get('/database')
      .expect((result) => {
        expect(result.body.dbState).toBe(state);
      })
      .end(done);
  });
});
