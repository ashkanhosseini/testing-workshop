import getOldest from './get-oldest';

describe('getOldest', () => {
  // 😎
  it('should get the oldest person (without mocking)', () => {
    const oldest = { name: 'john', age: 64 };
    const persons = [
      { name: 'jane', age: 40 },
      oldest,
      { name: 'Sarah', age: 32 },
    ];

    expect(getOldest(persons)).toBe(oldest);
  });
});

// TODO:
// Change Dependencies
// Change method signature
