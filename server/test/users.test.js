import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';

chai.should();
chai.use(chaiHttp);

const user = {
  email: 'andela_atlp_program2020@gmail.com',
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
          res.should.have.status(409);
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
          res.body.should.have.property('count');
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
          res.body.should.have.property('_id').equal(userId);
          done();
        });
    });
    it('It should not get user with invalid ID', (done) => {
      chai.request(server)
        .get('/users/1')
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.have.property('message').equal('Invalid request');
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
          res.body.should.have.property('message').equal('Login failed, either the account doesn\'t exist or you entered a wrong account');
          done();
        });
    });
  });
  // Test user account
  describe('DELETE /users', () => {
    it('It should delete user with id', (done) => {
      const body = {
        userId,
      };
      chai.request(server)
        .delete('/users')
        .send(body)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message').equal('User has been deleted');
          done();
        });
    });
    it('It should not delete user not available', (done) => {
      const body = {
        userId: 12,
      };
      chai.request(server)
        .delete('/users')
        .send(body)
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.have.property('message').equal('Invalid request');
          done();
        });
    });
  });
});
