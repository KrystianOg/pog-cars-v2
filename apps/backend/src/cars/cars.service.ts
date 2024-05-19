import {
  HttpException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { CreateCarDto, Car } from './cars.schema';
import { PG_CONNECTION } from '../db/db.module';
import { Pool } from 'pg';
import { Pagination } from '../utils/zod/pagination.schema';

@Injectable()
export class CarsService {
  constructor(@Inject(PG_CONNECTION) private conn: Pool) { }

  async create(car: CreateCarDto): Promise<Car> {
    const res = await this.conn.query<Car>({
      text: `INSERT INTO cars (mileage, horsepower, seats, drivetrain, price, year, model, make) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id, mileage, horsepower, seats, drivetrain, price, year, model, make`,
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

  async findAll(
    { page, pageSize }: Pagination,
    orderBy: keyof Car = 'price',
  ): Promise<Car[]> {
    const offset = Math.floor((page - 1) * pageSize);

    const res = await this.conn.query<Car>({
      text: 'SELECT * FROM cars WHERE deleted_at IS NULL ORDER BY $1 ASC LIMIT $2 OFFSET $3',
      values: [orderBy, pageSize, offset],
    });

    return res.rows;
  }

  /**
   * @throws {NotFoundException}
   */
  async findOne(id: number): Promise<Car> {
    const res = await this.conn.query<Car>({
      text: 'SELECT id, mileage, horsepower, seats, drivetrain, price, year, model, make FROM cars WHERE id = $1',
      values: [id],
    });

    if (!res.rowCount) {
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
      WHERE id =$9 RETURNING id, mileage, horsepower, seats, drivetrain, price, year, model, make`,
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
    const existing = await this.conn.query<{ deleted_at: Date | null }>({
      text: 'SELECT deleted_at FROM cars WHERE id = $1',
      values: [id],
    });

    const deleted_at = existing.rows[0].deleted_at;

    if (deleted_at) {
      throw new HttpException('Already deleted', 400);
    }
    const res = await this.conn.query({
      text: 'UPDATE cars SET deleted_at = NOW() WHERE id = $1',
      values: [id],
    });

    if (!res.rowCount) {
      throw new NotFoundException();
    }
  }

  async hardDelete(id: number): Promise<void> {
    const res = await this.conn.query({
      text: 'DELETE FROM cars WHERE id = $1',
      values: [id],
    });
    if (!res.rowCount) {
      throw new NotFoundException();
    }
  }
}
