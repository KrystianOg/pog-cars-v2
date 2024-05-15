import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { SignInProps } from './auth.service';
import { DbModule } from '../db/db.module';

const userData1: SignInProps = {
  email: 'test@mail.com',
  password: 'Testpassword1',
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DbModule],
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('sign in', () => {
    it('should login existing user', async () => {
      const res = await service.signIn(userData1);
      expect(res).toHaveReturned();
    });

    it('should reject logging user', async () => {
      const res = await service.signIn({
        ...userData1,
        password: 'Testpassword2',
      });
      expect(res).toThrow();
    });
  });

  it('should register new user', async () => {
    const res = await service.signUp('test@mail.com', 'Testpassword1');

    expect(res).toHaveReturned();
  });
});
