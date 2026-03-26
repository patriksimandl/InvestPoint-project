import 'dotenv/config'

import app from '../server.js'
import request from 'supertest'
//import db from '../prismaClient.js'



//fix the test to be able to import app from server.js

describe('stockRoutes', () => {
  it('/stocks', async () => {
    const response = await request(app)
      .get('/health')
      .set('Accept', 'application/json')
      .set('Origin',process.env.FRONTEND_URL)
      .send();
      
      
    expect(response.headers['content-type']).toMatch("application/json");
    expect(response.status).toBe(200);
    //expect(response.body.length).toBe(25)



  })

  /*
  afterAll(async () => {
    await db.$disconnect()
  })
  */
})

