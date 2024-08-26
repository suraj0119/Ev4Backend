const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.should();
chai.use(chaiHttp);

describe('Events', () => {
  it('should create an event', (done) => {
    chai.request(server)
      .post('/events')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Test Event', date: '2024-12-31', capacity: 100, price: 50 })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('string').eql('Event created');
        done();
      });
  });

  // Add more tests for other endpoints
});
