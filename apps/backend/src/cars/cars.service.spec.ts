import { Test, TestingModule } from '@nestjs/testing';
import { CarsService } from './cars.service';
import { DbModule } from '../db/db.module';
import { CreateCarDto } from './cars.schema';
import { MAX_INT_32 } from '../constants/int';

const mockCar: CreateCarDto = {
  mileage: 10000,
  horsepower: 120,
  seats: 5,
  drivetrain: 'FWD',
  price: 200,
  year: 2015,
  model: 'Corsa',
  make: 'Open',
};

describe('CarsService', () => {
  let service: CarsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DbModule],
      providers: [CarsService],
    }).compile();

    service = module.get<CarsService>(CarsService);
  });

  it('should create new car', async () => {
    const res = await service.create(mockCar);
    expect(res).toStrictEqual({ ...mockCar, id: res.id });
  });

  describe('Find one', () => {
    it('should find specific car', async () => {
      const { id } = await service.create(mockCar);
      const res = await service.findOne(id);
      expect(res).toStrictEqual({ ...mockCar, id });
    });

    it.failing('should not find a car', async () => {
      await service.findOne(MAX_INT_32);
    });
  });

  describe('Find all', () => {
    it('should find specific car', async () => {
      await service.create(mockCar);
      const cars = await service.findAll({ page: 1, pageSize: 25 });
      // TODO: change to specific length
      expect(Boolean(cars.length)).toBe(true);
    });
  });

  describe('Soft delete', () => {
    it('should soft delete a car', async () => {
      const { id } = await service.create(mockCar);
      // TODO: check the result of it
      await service.softDelete(id);
    });

    it.failing('should not soft delete a car', async () => {
      await service.softDelete(MAX_INT_32);
    });
  });

  describe('Hard delete', () => {
    it('should hard delete a car', async () => {
      const { id } = await service.create(mockCar);
      // TODO: check if it was realy deleted
      await service.hardDelete(id);
    });

    it.failing('should not hard delete a car', async () => {
      await service.hardDelete(MAX_INT_32);
    });
  });
  // TODO: check created_by field
});
