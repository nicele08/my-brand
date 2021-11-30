import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

const { assert } = chai;
chai.use(chaiHttp);
chai.should();

let categoryId;
describe('Article-Categories Tests', () => {
  it('Test GET /article-categories', (done) => {
    chai
      .request(app)
      .get('/article-categories')
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isAbove(res.body.countArticleCategories, 0);
        done();
      });
  });

  it('Test POST /article-categories without userId', (done) => {
    chai
      .request(app)
      .post('/article-categories')
      .send({
        name: 'Machine Learing',
      })
      .end((err, res) => {
        assert.equal(res.status, 404);
        assert.equal(res.body.message, 'Something is wrong');
        done();
      });
  });

  it('Test POST /article-categories', (done) => {
    chai
      .request(app)
      .post('/article-categories')
      .send({
        name: 'Machine Learing',
        // userId: '5fe3a4b1b663983150bb1075',
        userId: '5fcfd7d77a49f72ae20d846f',
      })
      .end((err, res) => {
        assert.equal(res.status, 201);
        assert.equal(res.body.message, 'Article category has been created successfully');
        res.body.should.have.property('createdArticleCategory');
        categoryId = res.body.createdArticleCategory.id;
        done();
      });
  });

  it('Test POST /article-categories with invalid userID', (done) => {
    chai
      .request(app)
      .post('/article-categories')
      .send({
        name: 'Machine Learing',
        userId: '5fcfd7d77a49f72ae2$s846f',
      })
      .end((err, res) => {
        assert.equal(res.status, 404);
        assert.equal(res.body.message, 'Something is wrong');
        done();
      });
  });

  it('Test GET /article-categories with categoryID', (done) => {
    chai
      .request(app)
      .get(`/article-categories/${categoryId}`)
      .end((err, res) => {
        assert.equal(res.status, 200);
        res.body.should.have.property('id').equal(categoryId);
        done();
      });
  });

  it('Test PATCH /article-categories with categoryID', (done) => {
    chai
      .request(app)
      .patch('/article-categories')
      .send({
        categoryId,
        name: 'New Category',
        // userId: '5fe3a4b1b663983150bb1075',
        userId: '5fcfd7d77a49f72ae20d846f',
      })
      .end((err, res) => {
        assert.equal(res.status, 201);
        res.body.should.have.property('updates');
        assert.equal(res.body.updates.id, categoryId);
        done();
      });
  });

  it('Test PATCH /article-categories with invalid userID', (done) => {
    chai
      .request(app)
      .patch('/article-categories')
      .send({
        categoryId,
        name: 'New Category',
        userId: '5fcfd7d77a49f72ae20$846f',
      })
      .end((err, res) => {
        assert.equal(res.status, 404);
        res.body.should.have.property('message').equal('Something is wrong');
        done();
      });
  });

  it('Test DELETE /article-categories with categoryID', (done) => {
    chai
      .request(app)
      .delete('/article-categories')
      .send({
        categoryId,
      })
      .end((err, res) => {
        assert.equal(res.status, 201);
        res.body.should.have.property('message').equal('Category has been deleted successfully');
        done();
      });
  });

  it('It should not DELETE /article-categories deleted category', (done) => {
    chai
      .request(app)
      .delete('/article-categories')
      .send({
        categoryId,
      })
      .end((err, res) => {
        assert.equal(res.status, 500);
        res.body.should.have.property('message').equal('Article Category not found');
        done();
      });
  });

  it('It should not GET /article-categories deleted category', (done) => {
    chai
      .request(app)
      .get(`/article-categories/${categoryId}`)
      .end((err, res) => {
        assert.equal(res.status, 404);
        res.body.should.have.property('message').equal('Something is wrong!');
        done();
      });
  });
});
