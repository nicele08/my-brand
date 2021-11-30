import chai from 'chai';
import chaiHttp from 'chai-http';
import mongoose from '../db/mongoose';
import app from '../index';

const { assert } = chai;
chai.use(chaiHttp);

describe('Test Server', () => {
  it('Is server on', (done) => {
    assert.isNotNull(app, 'Server should be on');
    done();
  });
  it('Test GET /', (done) => {
    chai
      .request(app)
      .get('/')
      .end((err, res) => {
        assert.isObject(res, 'Response should be an object');
        assert.equal(res.status, 200, 'Status should be 200-Ok');
        done();
      });
  });
});

describe('Test database', () => {
  it('Database should be connected', (done) => {
    assert.isDefined(mongoose, 'Database should be defined');
    assert.isNotNull(mongoose, 'Database should be connected');
    done();
  });
});
