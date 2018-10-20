const {server} = require('../../../LAB-06/www/server.js');
const supertest = require('supertest');
const mockRequest = supertest(server);

//console.log(server);

describe ('HDGS web server', () => {
  // it('should respond with a 404 on an invalid route', () => {
  //   return mockRequest
  //     .get('/boo')
  //     .then(results => {
  //       console.log(results.status); //TODO REMOVE
  //       expect(results.status).toBe(404);
  //     }).catch(
  //       //console.error
  //       error => { expect(error.status).toBe(404);}
  //       );
  // });

  it('should respond with a 201 on a valid route', () => {
    return mockRequest
      .get('/')
      .then(results => {
        //console.log(results); TODO REMOVE
        expect(results.status).toBe(201);
      }).catch(console.error);
  });
}); 