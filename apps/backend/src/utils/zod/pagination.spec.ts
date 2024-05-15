import { paginationSchema } from './pagination.schema';

describe('Pagination', () => {
  describe('Page', () => {
    it.each([1, 1000000])('Greater than 0', (page) => {
      const res = paginationSchema.parseAsync({
        page,
      });

      expect(res).resolves.not.toThrow();
    });

    it.each([-1000000, 0])('Page less than 0', (page) => {
      const res = paginationSchema.parseAsync({
        page,
      });

      expect(res).rejects.toThrow();
    });
  });

  describe('Page size', () => {
    it.each([10, 25, 50, 100])('Possible', (pageSize) => {
      const res = paginationSchema.parseAsync({
        pageSize,
      });

      expect(res).resolves.not.toThrow();
    });

    it.each([-100, 0, 1, 100000])('Not possible', (pageSize) => {
      const res = paginationSchema.parseAsync({
        pageSize,
      });

      expect(res).rejects.toThrow();
    });
  });
});
