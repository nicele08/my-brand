/* eslint-disable no-undef */
import mongoose from 'mongoose';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';
import User from '../models/userModel';

chai.should();
chai.use(chaiHttp);

const user = new User({
  _id: new mongoose.Types.ObjectId(),
  email: 'yindagiriye@gmail.com',
  password: 'niyindagiriye',
  userType: 'admin',
});

const id = '5fca3b0374bb7bdd669b09f8';

describe('Users API', () => {
  // Test POST route(signup)
  describe('POST /users/signup', () => {
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
        .get(`/users/${id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('_id').equal(id);
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
        email: 'yindagiriye@gmail.com',
        password: 'niyindagiriye',
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
        password: 'niyindagiriye',
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
});
