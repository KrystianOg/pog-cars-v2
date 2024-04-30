import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { CarsModule } from './cars.module';
import { CarsService } from './cars.service';
import { Test } from '@nestjs/testing';

describe('Cars', () => {
  let app: INestApplication;
  const carsService = {
    create: () => {},
    findAll: () => [],
    findOne: () => {},
    update: () => {},
    softDelete: () => undefined,
    hardDelete: () => undefined,
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [CarsModule],
    })
      .overrideProvider(CarsService)
      .useValue(carsService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('GET /cars', () => {
    return request(app.getHttpServer()).get('/cars').expect(200).expect({
      data: carsService.findAll(),
    });
  });

  it('GET /car/:id', () => {
    return request(app.getHttpServer()).get('/cars/1').expect(200).expect({
      data: carsService.findOne(),
    });
  });

  it('POST /cars', () => {
    return request(app.getHttpServer()).post('/cars').expect(201).expect({
      data: carsService.create(),
    });
  });

  it('PATCH /cars/:id', () => {
    return request(app.getHttpServer()).patch('/cars/1').expect(200).expect({
      data: carsService.update(),
    });
  });

  it('(soft) DELETE /cars/:id', () => {
    return request(app.getHttpServer()).delete('/cars/1').expect(204).expect({
      data: carsService.softDelete(),
    });
  });

  it('DELETE /cars/:id/hard', () => {
    return request(app.getHttpServer())
      .delete('/cars/1/hard')
      .expect(204)
      .expect({
        data: carsService.hardDelete(),
      });
  });
  afterAll(async () => {
    await app.close();
  });
});
