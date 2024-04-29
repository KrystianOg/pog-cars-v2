import { Agency } from './agencies.schema';

export const agencies: Agency[] = [
  {
    id: 1,
    name: 'Test Agency 1',
    address: {
      id: 1,
      street: 'Willow',
      city: 'NY',
      state: 'NY',
      postal_code: '10012',
      country: 'US',
    },
  },
  {
    id: 2,
    name: 'Test Agency 2',
    address: {
      id: 2,
      street: 'Tanglewood',
      city: 'LA',
      state: 'Louisiana',
      postal_code: '70130',
      country: 'US',
    },
  },
];
