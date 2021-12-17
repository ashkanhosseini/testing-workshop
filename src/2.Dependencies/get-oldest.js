import orderby from 'lodash.orderby';

const getOldest = (persons) => {
  // Returns first item ordered by "age"
  // orderby({configuration}, person) // * lodash 2
  const [oldest] = orderby(persons, ['age'], ['desc']);
  return oldest;
};

export default getOldest;
