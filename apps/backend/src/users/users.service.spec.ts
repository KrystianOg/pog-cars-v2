import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find user by email', async () => {
    const res = await service.findOne('test@mail.com');

    expect(res).toBe({ email: 'test@mail.com' });
  });

  it('should throw USER_EXISTS on email duplicate', async () => {
    const res = await service.create({
      email: 'test@mail.com',
      password: 'TestPassword123',
    });

    expect(res).toThrow('User already exists');
  });

  it('should throw error on invalid credentials', async () => {
    const res = await service.create({
      email: 'test@mail.com',
      password: 'Testpassword123',
    });

    expect(res).toThrow('Invalid createntials');
  });

  it('can create new user', async () => {
    const res = await service.create({
      email: 'test@mail.com',
      password: 'TestPassword123',
    });
    // TODO: define some data
    expect(res).toBe({ email: 'test@mail.com' });
  });
});
