import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { Car, CreateCarDto } from './cars.schema';
import { PG_CONNECTION } from 'src/db/db.module';
import { Pool } from 'pg';

@Injectable()
export class CarsService {
  constructor(@Inject(PG_CONNECTION) private conn: Pool) {}

  async create(car: CreateCarDto): Promise<Car> {
    const res = await this.conn.query<Car>({
      text: 'INSERT INTO cars (mileage, horsepower, seats, drivetrain, price, year, model, make) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      values: [
        car.mileage,
        car.horsepower,
        car.seats,
        car.drivetrain,
        car.price,
        car.year,
        car.model,
        car.make,
      ],
    });

    return res.rows[0];
  }

  async findAll(): Promise<Car[]> {
    const res = await this.conn.query<Car>({
      text: 'SELECT * FROM cars',
    });

    return res.rows;
  }

  async findOne(id: number): Promise<Car> {
    const res = await this.conn.query<Car>({
      text: 'SELECT * FROM cars WHERE id = $1',
      values: [id],
    });

    // TODO: what if result was not found ??

    const row = res.rows[0];

    if (!row) {
      throw new NotFoundException();
    }
    return res.rows[0];
  }

  async update(id: number, car: CreateCarDto): Promise<Car> {
    const res = await this.conn.query<Car>({
      text: `UPDATE cars SET 
        mileage = COALESCE($1, mileage), 
        horsepower = COALESCE($2, horsepower), 
        seats = COALESCE($3, seats), 
        drivetrain = COALESCE($4, drivetrain), 
        price = COALESCE($5, price), 
        year = COALESCE($6, year),
        model = COALESCE($7, model),
        make = COALESCE($8, make)
      WHERE id =$9 RETURNING *`,
      values: [
        car.mileage,
        car.horsepower,
        car.seats,
        car.drivetrain,
        car.price,
        car.year,
        car.model,
        car.make,
        id,
      ],
    });

    return res.rows[0];
  }

  async softDelete(id: number): Promise<void> {
    await this.conn.query({
      text: 'UPDATE cars SET deleted_at = NOW() WHERE id = $1',
      values: [id],
    });
  }

  async hardDelete(id: number): Promise<void> {
    await this.conn.query({
      text: 'DELETE FROM cars WHERE id = $1',
      values: [id],
    });
  }
}
