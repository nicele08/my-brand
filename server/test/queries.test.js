import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';

chai.should();
chai.use(chaiHttp);

let queryId;

const query = {
  name: 'Celestin Niyindagiriye',
  email: 'cniyindagiriye@gmail.com',
  message: 'I like this site',
};

describe('Query API', () => {
  // Test POST to store query
  describe('POST /queries', () => {
    it('It should store query', (done) => {
      chai.request(server)
        .post('/queries')
        .send(query)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('message').equal('Query stored successfully');
          res.body.should.have.property('id');
          queryId = res.body.id;
          done();
        });
    });
    it('It should not store query without name', (done) => {
      delete query.name;
      chai.request(server)
        .post('/queries')
        .send(query)
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.have.property('message').equal('Send query failed');
          done();
        });
    });
  });

  // GET stored query by id
  describe('GET /queries/:queryId', () => {
    it('It should get query by ID', (done) => {
      chai.request(server)
        .get(`/queries/${queryId}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.a('object');
          res.body.should.have.property('id').equal(queryId);
          done();
        });
    });
    it('It should not get query not available', (done) => {
      chai.request(server)
        .get('/queries/32')
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.have.property('message').equal('Invalid choice');
          done();
        });
    });
  });

  // GET all article
  describe('GET /queries', () => {
    it('It should get all queries', (done) => {
      chai.request(server)
        .get('/queries')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.a('object');
          res.body.should.have.property('count');
          done();
        });
    });
  });

  // PATCH  article
  describe('PATCH /queries/:queryId', () => {
    it('It should update query with ID', (done) => {
      query.message = 'I\'d like to contact you';
      chai.request(server)
        .patch(`/queries/${queryId}`)
        .send(query)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message').equal('Query updated successfully');
          res.body.should.have.property('nModified').equal(1);
          done();
        });
    });
    it('It should not update query not available', (done) => {
      query.message = 'I\'d like to contact you';
      chai.request(server)
        .patch('/queries/45')
        .send(query)
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.have.property('message').equal('Invalid choice');
          done();
        });
    });
  });

  // DELETE  article
  describe('DELETE /queries/:queryId', () => {
    it('It should delete query with ID', (done) => {
      chai.request(server)
        .delete(`/queries/${queryId}`)
        .send(query)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message').equal('Query deleted');
          done();
        });
    });
    it('It should not delete query not available', (done) => {
      chai.request(server)
        .delete('/queries/45')
        .send(query)
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.have.property('message').equal('Invalid choice');
          done();
        });
    });
  });
});
