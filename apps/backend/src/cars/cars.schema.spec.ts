import { MAX_INT_32 } from '../constants/int';
import { CreateCarDto, carSchema } from './cars.schema';

const passes: CreateCarDto[] = [
  {
    mileage: 0,
    horsepower: 0,
    seats: 1,
    drivetrain: 'FWD',
    price: 0,
    year: 1886,
    model: 'A',
    make: 'A',
  },
  {
    mileage: 10_000_000,
    horsepower: 20_000,
    seats: 300,
    drivetrain: 'AWD',
    price: 50_000,
    year: new Date().getFullYear(),
    model: 'Land Rover Range Rover Evoque 2.0 TD4 E-Capability 4x4 HSE',
    make: 'Lamborghini Aventador LP 750-4 Superveloce Roadster',
  },
];

const fails: CreateCarDto[] = [
  {
    mileage: -1,
    horsepower: -1,
    seats: 0,
    drivetrain: 'SOME' as CreateCarDto['drivetrain'],
    price: -1,
    year: 1885,
    model: '',
    make: '',
  },
  {
    mileage: MAX_INT_32 + 1,
    horsepower: 20_001,
    seats: 301,
    drivetrain: 'SOME2' as CreateCarDto['drivetrain'],
    price: 50_001,
    year: new Date().getFullYear() + 1,
    model: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellu',
    make: 'Cras a mauris purus. Pellentesque id fermentum ex. Duis nulla orc',
  },
];

describe('Car schema', () => {
  it.each(passes)('Validation passes', (car) => {
    const res = carSchema.parse(car);
    expect(res).toStrictEqual(car);
  });

  it('Validation fails (too low)', () => {
    const res = carSchema.safeParse(fails[0]);
    if (res.success) {
      // NOTE: this must fail, this assertion acts as type guard
      throw new Error();
    }
    expect(res.success).toBe(false);
    expect(res.error.errors.length).toBe(8);

    const errorMap = res.error.errors.reduce(
      (acc, cur) => {
        return {
          ...acc,
          [cur.path[0]]: cur.code,
        };
      },
      {} as Record<keyof CreateCarDto, string>,
    );

    expect(errorMap).toStrictEqual({
      make: 'too_small',
      model: 'too_small',
      year: 'too_small',
      drivetrain: 'invalid_enum_value',
      horsepower: 'too_small',
      mileage: 'too_small',
      price: 'too_small',
      seats: 'too_small',
    });
  });

  it('Validation fails (too big)', () => {
    const res = carSchema.safeParse(fails[1]);

    if (res.success) {
      // NOTE: this must fail, this assertion acts as type guard
      throw new Error();
    }
    expect(res.success).toBe(false);
    expect(res.error.errors.length).toBe(8);

    const errorMap = res.error.errors.reduce(
      (acc, cur) => {
        return {
          ...acc,
          [cur.path[0]]: cur.code,
        };
      },
      {} as Record<keyof CreateCarDto, string>,
    );

    expect(errorMap).toStrictEqual({
      make: 'too_big',
      model: 'too_big',
      year: 'too_big',
      horsepower: 'too_big',
      mileage: 'too_big',
      price: 'too_big',
      seats: 'too_big',
      drivetrain: 'invalid_enum_value',
    });
  });
});
