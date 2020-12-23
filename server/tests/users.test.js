import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';

chai.should();
chai.use(chaiHttp);

const user = {
  email: 'andela_atlpprogram2020@gmail.com',
  password: 'niyindagiriye',
  userType: 'admin',
};

let userId;

describe('Users API', () => {
  // Test POST route(signup)
  describe('POST /users/signup', () => {
    it('It should register new user', (done) => {
      chai.request(server)
        .post('/users/signup')
        .send(user)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('message').equal('User created');
          userId = res.body.id;
          done();
        });
    });
    it('It should not register existing user', (done) => {
      chai.request(server)
        .post('/users/signup')
        .send(user)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('message').equal('Email already exists');
          done();
        });
    });
  });

  // Test Get all users
  describe('GET /users', () => {
    it('It should get all users', (done) => {
      chai.request(server)
        .get('/users')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('countUsers');
          assert.isAbove(res.body.countUsers, 0);
          done();
        });
    });
  });

  describe('GET /users/:userId', () => {
    it('It should get user by user ID', (done) => {
      chai.request(server)
        .get(`/users/${userId}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('id').equal(userId);
          done();
        });
    });
    it('It should not get user with invalid ID', (done) => {
      chai.request(server)
        .get('/users/1')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('message').equal('User not found or something is wrong');
          done();
        });
    });
  });

  // Test user login
  describe('POST /users/login', () => {
    it('It should log in user with email and password', (done) => {
      const credentials = {
        email: user.email,
        password: user.password,
      };
      chai.request(server)
        .post('/users/login')
        .send(credentials)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message').equal('Login successful');
          done();
        });
    });

    it('It should not log in user with email which is not exist', (done) => {
      const credentials = {
        email: 'niyindagiriye.com',
        password: user.password,
      };
      chai.request(server)
        .post('/users/login')
        .send(credentials)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('message').equal('Login failed');
          done();
        });
    });
  });
  // Test user account
  describe('DELETE /users', () => {
    it('It should delete user with id', (done) => {
      chai.request(server)
        .delete('/users')
        .send({ userId })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message').equal('User has been deleted');
          done();
        });
    });
    it('It should not delete user not available', (done) => {
      chai.request(server)
        .delete('/users')
        .send({ userId: 12 })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('message').equal('Deletion failed');
          done();
        });
    });
  });
});
