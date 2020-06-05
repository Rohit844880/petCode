/** To Check Unit Test Cases of all CRUD API's */

const request = require('supertest');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const app = require('../app');
const expect = chai.expect;

chai.use(chaiAsPromised);

/** Creating a Suite for Unit Tests */

describe('functional - Pets',function ()  {
  /** Negative Test Case for Creating a Pet */
   it('should not create a pet because name is required',async function () {
     const res = await request(app).post('/pets').send({
          age:16 ,  
          color: 'gamer',
         
        });
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('"name" is required');
  });
  /** Positive Test Case For Creating a Pet */
  it('Is should create a pet',async function() {
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
  /** Positive Test Case For Fetching All Pets */
  it('should fetch all records',async function() {
     const res = await request(app).get('/pets');
     expect(res.status).to.equal(200);
  });

 /** Negative Test Case For Fetching Pets */
 it('should not fetch any record',async function() {
    const res = await request(app).get('/')
    expect(res.status).to.equal(404);
  });

  /** Negative Test Case for fetching Pet By Id */
  it('should not fetch record by Id',async function() {
    const petId="";
    const res = await request(app).get(`/pets/${petId}`);
    expect (res.status).to.equal(200)
  });

 /** Negative Test Case For Removing a  Pet */
  it('should not remove a pet',async function() {
    const deleteId=" "
  const res = await request(app).delete(`/pets/${deleteId}`)
  expect(res.status).to.equal(404);
})
})








