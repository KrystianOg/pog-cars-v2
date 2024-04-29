import type { User } from './users.schema';

export const users: User[] = [
  {
    id: 1,
    username: 'Mock 1',
    email: 'mock1@mail.com',
    password: 'Mock password 1', // let's hope this doesnt have to be hashed
  },
  {
    id: 2,
    username: 'Mock 2',
    email: 'mock2@mail.com',
    password: 'Mock password 2',
  },
];
