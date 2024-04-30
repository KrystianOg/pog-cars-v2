import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should register new user', () => {
    const res = await service.signUp('test@mail.com', 'Testpassword1');

    expect(res).toHaveProperty('access_token');
  });

  it('should login existing user', () => {
    const res = await service.signIn('test@mail.com', 'Testpassword2');
    expect(res).toHaveProperty('access_token');
  });
});
