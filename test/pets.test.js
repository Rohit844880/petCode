/** To Check Unit Test Cases of all CRUD API's */

const request = require('supertest');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const app = require('../app');
const expect = chai.expect;

chai.use(chaiAsPromised);

/** Creating a Suite for Unit Tests */

describe('functional - Pets', () => {
  /** Negative Test Case for Creating a Pet */
  it('should fail to to create without name', async () => {
    const res = await request(app).post('/pets').send({
      age:16 ,  
      color: 'gamer',

    });
    expect(res.status).to.equal(400);
    expect(res.body.message).to.equal('"name" is required');
   
  });
  /** Positive Test Case For Creating a Pet */
  it('should create a Pet', async () => {
    const user = {
      name:'Rohit1',
      age:161 ,  
      color: 'gamer1',
      
    };
    const res = await request(app).post('/pets').send(user);
    expect(res.status).to.equal(201);
    expect(res.body.name).to.equal(user.name);
    expect(res.body.age).to.equal(user.age);
    expect(res.body.color).to.equal(user.color);
   });
   /** Positive Test Case to Load All Pets */
  it('should load all pets', async () => {
    const res = await request(app).get('/pets');
     expect(res.status).to.equal(200);
   
  });
  /** Negative Test Case to Load All Pets */
  it('should fail to load pets', async () => {
    const res = await request(app).get('/');
     expect(res.status).to.equal(404);
   });

   /** Negative Test Case to Load Pet By Pet Name */
  it('should fail to load pet by Pet Id', async () => {
    const petName= " "
    const res = await request(app).get(`/pets/${petName}`)
    expect(res.status).to.equal(400);
   });

   /** Negative Test Case for Creating a Pet */
  it('should fail to delete with Blank Delete Id', async () => {
    const deleteId= " "
    const res = await request(app).delete(`/pets/${deleteId}`)
    expect(res.status).to.equal(400);
  });

});








