import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';

chai.should();
chai.use(chaiHttp);

const user = {
  email: 'cniyindagiriye@gmail.com',
  password: 'Niyo12cele',
};
let userId;
let profileId;
const profile = {
  profileImage: 'profile.png',
  firstName: 'Celestin',
  lastName: 'Niyindagiriye',
  birthday: '6/4/1998',
  location: 'Kigali, Rwanda',
  phoneNumber: '0780728136',
};

// Test user login
describe('POST /users/login', () => {
  it('It should not login user with invalid credentials', (done) => {
    user.email = 'cniyindagiriye';
    chai.request(server)
      .post('/users/login')
      .send(user)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('message').equal('Login failed, either the account doesn\'t exist or you entered a wrong account');
        done();
      });
  });
  it('It should login user', (done) => {
    user.email = 'cniyindagiriye@gmail.com';
    chai.request(server)
      .post('/users/login')
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('id');
        userId = res.body.id; // profile owner
        done();
      });
  });
});

// Test profile api
describe('Profile API', () => {
  // Test POST to add profile
  describe('POST /profiles', () => {
    it('It should not add profile to anonymous user', (done) => {
      profile.userId = 23;
      chai.request(server)
        .post('/profiles')
        .send(profile)
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.have.property('message').equal('Not allowed');
          done();
        });
    });
    it('It should add profile', (done) => {
      profile.userId = userId;
      chai.request(server)
        .post('/profiles')
        .send(profile)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('message').equal('Profile created');
          res.body.should.have.property('id');
          profileId = res.body.id;
          done();
        });
    });
  });
  // Test GET profile by id
  describe('GET /pofiles/:profileID', () => {
    it('It should get profile by ID', (done) => {
      chai.request(server)
        .get(`/profiles/${profileId}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('id').equal(profileId);
          done();
        });
    });
    it('It should not get profile not available', (done) => {
      chai.request(server)
        .get('/profiles/2')
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.have.property('message').equal('Invalid choice');
          done();
        });
    });
  });

  // Test GET all profiles
  describe('GET /pofiles/', () => {
    it('It should get all profiles', (done) => {
      chai.request(server)
        .get('/profiles')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.a('object');
          res.body.should.have.property('profiles');
          done();
        });
    });
  });

  // Test PATCH profile
  describe('PATCH /pofiles/:profileId', () => {
    it('It should update profile by ID', (done) => {
      profile.lastName = 'Kagabo';
      chai.request(server)
        .patch(`/profiles/${profileId}`)
        .send(profile)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message').equal('Profile updated successfully');
          done();
        });
    });
  });

  // Test DELETE profile
  describe('DELETE /pofiles/:profileId', () => {
    it('It should update profile by ID', (done) => {
      chai.request(server)
        .delete(`/profiles/${profileId}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message').equal('Profile deleted');
          done();
        });
    });
  });
});
