import divide from './divide';

describe('divide', () => {
  describe('success path', () => {
    it('should divide two numbers', () => {
      const a = 6;
      const b = 3;
      const expected = 2;

      expect(divide(a, b)).toBe(expected);
    });
  });

  describe('sad path', () => {
    it('should throw error when dividing by zero', () => {
      const a = 6;
      const b = 0;

      expect(() => divide(a, b)).toThrow('division by zero');
    });
  });
});
