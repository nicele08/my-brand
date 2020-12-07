/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
import mongoose from 'mongoose';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';

chai.should();
chai.use(chaiHttp);

const userId = '5fcd4b07004e5c2ee278e52f';
const categoryId = '5fcd4b07004e5c2ee278e530';
const articleId = '5fc3c558bf194862c274d097';

const article = {
  _id: new mongoose.Types.ObjectId(),
  title: 'How to program in Python language?',
  visible: true,
  content: 'Python is dynamic programming language used in artificial intelligence',
  articleImage: 'python.png',
  category: categoryId,
  user: userId,
};

describe('Articles API', () => {
  // Test GET all articles
  describe('GET /articles', () => {
    it('It should get all articles', (done) => {
      chai.request(server)
        .get('/articles')
        .end((err, res) => {
          res.should.be.a('object');
          res.should.have.status('200');
          done();
        });
    });
  });

  // Test Get article with ID
  describe('GET /articles', () => {
    it('It should get article with ID', (done) => {
      chai.request(server)
        .get(`/articles/${articleId}`)
        .end((err, res) => {
          res.should.have.status('200');
          res.should.have.property('request');
          done();
        });
    });
  });

  // Test POST route to add article
  describe('POST /articles', () => {
    it('It should add new article', (done) => {
      chai.request(server)
        .post('/articles')
        .send(article)
        .end((err, res) => {
          res.should.have.status(201);
          res.should.have.property('message').equal('Article created successfully');
          done();
        });
    });
  });
});
