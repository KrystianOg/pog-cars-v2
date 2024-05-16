import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
// import { readFileSync } from 'fs';
// const setupDB = readFileSync('init_database.sql').toString();

describe('CarsController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      // .overrideGuard(AuthGuard)
      // .useValue({
      //   canActivate: () => true,
      // })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  const req = () => request(app.getHttpServer());

  it('(GET) /cars)', () => {
    return req().get('/cars').expect(200).expect([]);
  }, 100);

  it('(GET) /cars/:id', () => {
    return req().get('/cars/1').expect(200).expect({});
  }, 100);

  it('(POST) /cars', () => {
    return req()
      .post('/cars')
      .send({})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201);
  }, 100);

  it('(PATCH) /cars/:id', () => {
    return req().patch('/cars/1').expect(200);
  }, 100);

  it('(DELETE) /cars/:id', () => {
    return req().delete('/cars/1').expect(200);
  }, 100);

  it('(DELETE) /cars/:id/hard', () => {
    return req().delete('/cars/1/hard').expect(200);
  }, 100);
});
