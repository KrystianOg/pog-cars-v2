import { CreateCarDto } from './cars.schema';

export const mocks: CreateCarDto[] = [
  {
    mileage: 10000,
    horsepower: 120,
    seats: 5,
    drivetrain: 'FWD',
    price: 200,
    year: 2015,
    model: 'Corsa',
    make: 'Open',
  },
  {
    mileage: 25000,
    horsepower: 332,
    seats: 4,
    drivetrain: 'RWD',
    price: 400,
    year: 2018,
    model: '370Z',
    make: 'Nissan',
  },
];
