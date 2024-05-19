import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

let app: INestApplication;

beforeAll(async () => {
  const moduleFixture = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  // authService = moduleFixture.get<AuthService>(AuthService);
  // dbService = moduleFixture.get<DbService>(DbService);

  app = moduleFixture.createNestApplication();
  await app.init();
});

afterAll(async () => {
  await app.close();
});

const setup = async () => {
  //cleanup table here
};

beforeEach(setup);
afterEach(setup);

describe('Authentication', () => {
  const req = () => request(app.getHttpServer());

  const credentials = {
    email: 'test@mail.com',
    password: 'StrongPassword1234',
  };

  it('User should be able to signup', async () => {
    return req().post('/register').send(credentials).expect(201);
  });

  describe('Login', () => {
    it('User should be able to login', async () => {
      return req().post('/login').send(credentials).expect(200);
    });

    it('Should respond with 422 for invalid email', async () => {
      return req()
        .post('/login')
        .send({
          ...credentials,
          email: credentials.email.substring(0, credentials.email.length - 1),
        });
    });

    it('Should response with 422 for invalid password', async () => {
      return req()
        .post('/login')
        .send({
          ...credentials,
          pasword: credentials.password.substring(
            0,
            credentials.password.length - 1,
          ),
        });
    });
  });

  it('User should be able to refrsh token', async () => {
    return req().post('/refresh-token').expect(200);
  });

  it('User should be able to log out', async () => {
    return req().post('/logout').expect(200);
  });

  it('User should be able to verify email', async () => {
    return req().get('/verify-email').expect(200);
  });
});
