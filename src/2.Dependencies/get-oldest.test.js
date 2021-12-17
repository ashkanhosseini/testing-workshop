import getOldest from './get-oldest';
import orderby from 'some_cool_orderby';

jest.mock('some_cool_orderby', () => {
  return jest.fn();
});

describe('getOldest', () => {
  // OLD SCHOOL
  it('should get the oldest person (mocking order by)', () => {
    const oldest = { name: 'john', age: 64 };
    const persons = [
      { name: 'jane', age: 40 },
      oldest,
      { name: 'Sarah', age: 32 },
    ];

    orderby.mockReturnValue([
      { name: 'john', age: 64 },
      { name: 'jane', age: 40 },
      { name: 'Sarah', age: 32 },
    ]);

    expect(getOldest(persons)).toEqual(oldest);
  });
});

// describe('mock test', () => {
//   it('should mock me !', () => {
//     const myFn = jest.fn();
//     myFn(5);
//     expect(myFn).toHaveBeenCalledWith(1, 2, 3);
//   });
// });
