const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../express-backend/index');
const request = require("supertest")("http://localhost:3000");

chai.use(chaiHttp);


describe("Test User API", function () {
  let uid;

  let user =  {
        firstName: 'Test-First-Name',
        lastName: 'Test-Last-Name',
        email: 'test@email.com',
        password: 'testPassword',
  } 

  it("Create User", async () => {
    const response = await request.post('/api/user/create').send(user).set('API-Key', process.env.APIKey);

    expect(response.status).to.eql(200);
    response.body.should.be.a('object');

    uid = response.body.uid;
  });

  it("Login User", async () => {
    const response = await request.post('/api/user/login').send(user).set('API-Key', process.env.APIKey);

    expect(response.status).to.eql(200);
    response.body.should.be.a('object');

    let actualVal = response.body.uid;
    expect(actualVal).to.be.equal(uid);
  });

  it("Get User Name", async () => {
    const response = await request.get('/api/user/name/'+uid).set('API-Key', process.env.APIKey);

    expect(response.status).to.eql(200);
    response.body.should.be.a('object');

    let actualVal = response.body;
    expect(actualVal).to.be.include({firstName: user.firstName, lastName: user.lastName});
  });

});


describe("Test Questionnaire API", function () {
  
  let questionnaireID;
  const uid = '123456789';

  let questionnaire =  {
    title: 'Sample Title',
    owner: uid,

    question1: 'Sample Question 1',
    q1a: 'Sample Correct Answer',
    q1w1: 'Sample Wrong Answer 1',
    q1w2: 'Sample Wrong Answer 2',
    q1w3: 'Sample Wrong Answer 3',

    question2: 'Sample Question 2',
    q2a: 'Sample Correct Answer',
    q2w1: 'Sample Wrong Answer 1',
    q2w2: 'Sample Wrong Answer 2',
    q2w3: 'Sample Wrong Answer 3',

    question3: 'Sample Question 3',
    q3a: 'Sample Correct Answer',
    q3w1: 'Sample Wrong Answer 1',
    q3w2: 'Sample Wrong Answer 2',
    q3w3: 'Sample Wrong Answer 3',

    question4: 'Sample Question 4',
    q4a: 'Sample Correct Answer',
    q4w1: 'Sample Wrong Answer 1',
    q4w2: 'Sample Wrong Answer 2',
    q4w3: 'Sample Wrong Answer 3',

    question5: 'Sample Question 5',
    q5a: 'Sample Correct Answer',
    q5w1: 'Sample Wrong Answer 1',
    q5w2: 'Sample Wrong Answer 2',
    q5w3: 'Sample Wrong Answer 3',
  } 

  it("Create Questionnaire", async () => {
    const response = await request.post('/api/questionnaire/create').send(questionnaire).set('API-Key', process.env.APIKey);

    expect(response.status).to.eql(200);
    response.body.should.be.a('object');

    questionnaireID = response.body.id;
  });

  it("Get All Questionnaires for User", async () => {
    const response = await request.get('/api/questionnaire/all/'+ uid).set('API-Key', process.env.APIKey);

    expect(response.status).to.eql(200);
    response.body.should.be.a('array');
  });

  it("Get Questionnaire", async () => {
    const response = await request.get('/api/questionnaire/'+ questionnaireID).set('API-Key', process.env.APIKey);

    expect(response.status).to.eql(200);
    response.body.should.be.a('object');

    let actualVal = response.body;
    expect(actualVal).to.be.include(questionnaire);
  });

});


describe("Test Answer API", function () {

  let answer = {
    questionnaire: '123456789',
    answerer: '123456789',
    answererName: 'Sample Name',
    marks: '100',
  }

  it("Create Questionnaire", async () => {
    const response = await request.post('/api/answer/create').send(answer).set('API-Key', process.env.APIKey);

    expect(response.status).to.eql(200);
    response.body.should.be.a('object');
  });
});
