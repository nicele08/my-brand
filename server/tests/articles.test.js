import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';

chai.should();
chai.use(chaiHttp);

const userId = '5fcfc90cb17cfb1e598b3b87';
// const userId = '5fe3a4b1b663983150bb1075';
// const categoryId = '5fe3a5b6cc20695dc891c977';
const categoryId = '5fe2135e8b6278b1c55d5043';

const article = {
  title: 'How to program in Python language?',
  visible: true,
  content: 'Python is dynamic programming language used in artificial intelligence',
  articleImage: 'math.png',
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
        .send({ ...article })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('message').equal('Article created successfully');
          res.body.should.have.property('createdArticle');
          addedArticleId = res.body.createdArticle.id;
          done();
        });
    });
    it('It should not add article without with missing fields', (done) => {
      chai.request(server)
        .post('/articles')
        .send({ article })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('message').equal('Author not found or something is wrong');
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
          res.body.should.have.property('articles');
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
          res.body.should.have.property('id').equal(addedArticleId);
          done();
        });
    });
    it('It should not get article not available', (done) => {
      chai.request(server)
        .get('/articles/12')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('message').equal('Article not found or somethin is wrong!');
          done();
        });
    });
  });

  // Test PATCH article with ID
  describe('PATCH /articles with articleId', () => {
    it('It should update article with ID', (done) => {
      article.title = 'Artcle has been updated';
      article.articleId = addedArticleId;
      chai.request(server)
        .patch('/articles')
        .send({ ...article })
        .end((err, res) => {
          res.should.have.status(201);
          res.should.be.a('object');
          res.body.should.have.property('message').equal('Article updated successfully');
          res.body.should.have.property('updatedArticle');
          done();
        });
    });
    it('It should not update article not available', (done) => {
      article.title = 'Artcle has been updated';
      article.articleId = 2;
      chai.request(server)
        .patch('/articles')
        .send({ ...article })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('message').equal('Something is wrong');
          done();
        });
    });
  });

  // Test DELETE to remove article
  describe('DELETE /articles with articleId', () => {
    it('It should delete article by ID', (done) => {
      chai.request(server)
        .delete('/articles')
        .send({ articleId: addedArticleId })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('message').equal('Article deleted successfully');
          done();
        });
    });
    it('It should not delete article not available', (done) => {
      chai.request(server)
        .delete('/articles')
        .send({ articleId: addedArticleId })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('message').equal('Deletion failed or somethin is wrong');
          done();
        });
    });
  });
});
