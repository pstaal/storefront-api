import request from 'supertest';
import express from 'express';

const server = express();

describe("User Endpoints", () => {

 it('Test /users POST route ', async () => {
  const user = {
      "firstName": "Billy",
      "lastName": "Bowden",
      "password": "billy123"
  };

  await request(server).post('/users')
      .auth('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiV2F0ZXIgQm90dGxlIiwicHJpY2UiOiIyLjk5In0.Flq3cKKZoTs8hWcAaTqJbvcAaJpb3FVi2IXU7rCzvvU', { type: 'bearer' })
      .send(user)
      .expect(200)
      .then(async (res: Response) => {
          expect(res.body).toBeTruthy;
      })
      .catch((error: Error) => console.error(error.message));
  });

});