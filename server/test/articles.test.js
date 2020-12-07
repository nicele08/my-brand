/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';

chai.should();
chai.use(chaiHttp);

const userId = '5fcb3acfb9e9c029b9e8536a';
const categoryId = '5fc33ba258e3af1819a744e7';

const article = {
  title: 'How to program in Python language?',
  visible: true,
  content: 'Python is dynamic programming language used in artificial intelligence',
  articleImage: 'python.png',
  categoryId,
  userId,
};

let addedArticleId;

describe('Articles API', () => {
  // Test POST to add article
  describe('POST /articles', () => {
    it('It should add new article', (done) => {
      chai.request(server)
        .post('/articles')
        .send(article)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('message').equal('Article created successfully');
          res.body.should.have.property('id');
          addedArticleId = res.body.id;
          done();
        });
    });
  });

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
  describe('GET /articles/:articleId', () => {
    it('It should get article with ID', (done) => {
      chai.request(server)
        .get(`/articles/${addedArticleId}`)
        .end((err, res) => {
          res.should.have.status('200');
          res.should.have.property('request');
          done();
        });
    });
    it('It should not get article not available', () => {
      chai.request(server)
        .get('/articles/12', (done) => {
          res.should.have.status(500);
          res.should.have.property('message').equal('Invlaid article');
          done();
        });
    });
  });

  // Test PATCH article with ID
  describe('PATCH /articles/:articleId', () => {
    it('It should update article with ID', (done) => {
      article.title = 'Artcle has been updated';
      chai.request(server)
        .patch(`/articles/${addedArticleId}`)
        .send(article)
        .end((err, res) => {
          res.should.have.status(201);
          res.should.be.a('object');
          res.body.should.have.property('nModified').equal(1);
          done();
        });
    });
    it('It should update article not available', (done) => {
      article.title = 'Artcle has been updated';
      chai.request(server)
        .patch('/articles/12')
        .send(article)
        .end((err, res) => {
          res.should.have.status(500);
          done();
        });
    });
  });

  // Test DELETE to remove article
  describe('DELET /articles/:articleId', () => {
    it('It should delete article by ID', (done) => {
      chai.request(server)
        .delete(`/articles/${addedArticleId}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message').equal('Article deleted successfully');
          done();
        });
    });
    it('It should not delete article not available', () => {
      chai.request(server)
        .delete('/articles/12', (done) => {
          res.should.have.status(500);
          res.should.have.property('message').equal('Invlaid article');
          done();
        });
    });
  });
});
