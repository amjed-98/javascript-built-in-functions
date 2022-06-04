import {
  forEach,
  map,
  filter,
  reduce,
  some,
  every,
  flat,
  find,
  findRight,
  fill,
  findIndex,
  findIndexRight,
} from '../functions/arrayMethods';

it('forEach', () => {
  const func = jest.fn();
  const startingArray = ['a', 'b', 'c'];
  forEach(startingArray, func);

  expect(func).toHaveBeenNthCalledWith(1, 'a', 0, startingArray);
  expect(func).toHaveBeenNthCalledWith(2, 'b', 1, startingArray);
  expect(func).toHaveBeenNthCalledWith(3, 'c', 2, startingArray);
  expect(func).toHaveBeenCalledTimes(3);
});

it('map', () => {
  const func = jest.fn((_elem, index) => index * 2);
  const startingArray = ['a', 'b', 'c'];
  const newArray = map(startingArray, func);

  expect(newArray).toEqual([0, 2, 4]);
  expect(func).toHaveBeenNthCalledWith(1, 'a', 0, startingArray);
  expect(func).toHaveBeenNthCalledWith(2, 'b', 1, startingArray);
  expect(func).toHaveBeenNthCalledWith(3, 'c', 2, startingArray);
  expect(func).toHaveBeenCalledTimes(3);
});

it('filter', () => {
  const func = jest.fn((elem, index) => elem === 'a' || index === 2);
  const startingArray = ['a', 'b', 'c'];
  const newArray = filter(startingArray, func);

  expect(newArray).toEqual(['a', 'c']);
  expect(func).toHaveBeenNthCalledWith(1, 'a', 0, startingArray);
  expect(func).toHaveBeenNthCalledWith(2, 'b', 1, startingArray);
  expect(func).toHaveBeenNthCalledWith(3, 'c', 2, startingArray);
  expect(func).toHaveBeenCalledTimes(3);
});

describe('reduce', () => {
  it('with a starting value', () => {
    const func = jest.fn((sum, elem) => sum + elem);
    const startingArray = [5, 3, 7];
    const total = reduce(startingArray, func, 4);

    expect(total).toEqual(19);
    expect(func).toHaveBeenNthCalledWith(1, 4, 5, 0, startingArray);
    expect(func).toHaveBeenNthCalledWith(2, 9, 3, 1, startingArray);
    expect(func).toHaveBeenNthCalledWith(3, 12, 7, 2, startingArray);
    expect(func).toHaveBeenCalledTimes(3);
  });

  it('with no starting value', () => {
    const func = jest.fn((sum, elem) => sum + elem);
    const startingArray = [5, 3, 7];
    const total = reduce(startingArray, func);

    expect(total).toEqual(15);
    expect(func).toHaveBeenNthCalledWith(1, 5, 3, 1, startingArray);
    expect(func).toHaveBeenNthCalledWith(2, 8, 7, 2, startingArray);
    expect(func).toHaveBeenCalledTimes(2);
  });
});

describe('some', () => {
  it('with a truthy value', () => {
    const func = jest.fn((elem) => elem > 0);
    const startingArray = [-4, 3, 6];
    const result = some(startingArray, func);

    expect(result).toEqual(true);
    expect(func).toHaveBeenNthCalledWith(1, -4, 0, startingArray);
    expect(func).toHaveBeenNthCalledWith(2, 3, 1, startingArray);
    expect(func).toHaveBeenCalledTimes(2);
  });

  it('with no truthy values', () => {
    const func = jest.fn((elem) => elem > 0);
    const startingArray = [-4, -3, -6];
    const result = some(startingArray, func);

    expect(result).toEqual(false);
    expect(func).toHaveBeenNthCalledWith(1, -4, 0, startingArray);
    expect(func).toHaveBeenNthCalledWith(2, -3, 1, startingArray);
    expect(func).toHaveBeenNthCalledWith(3, -6, 2, startingArray);
    expect(func).toHaveBeenCalledTimes(3);
  });
});

describe('every', () => {
  it('with a falsey value', () => {
    const func = jest.fn((elem) => elem < 0);
    const startingArray = [-4, 3, 6];
    const result = every(startingArray, func);

    expect(result).toEqual(false);
    expect(func).toHaveBeenNthCalledWith(1, -4, 0, startingArray);
    expect(func).toHaveBeenNthCalledWith(2, 3, 1, startingArray);
    expect(func).toHaveBeenCalledTimes(2);
  });

  it('with no falsey values', () => {
    const func = jest.fn((elem) => elem < 0);
    const startingArray = [-4, -3, -6];
    const result = every(startingArray, func);

    expect(result).toEqual(true);
    expect(func).toHaveBeenNthCalledWith(1, -4, 0, startingArray);
    expect(func).toHaveBeenNthCalledWith(2, -3, 1, startingArray);
    expect(func).toHaveBeenNthCalledWith(3, -6, 2, startingArray);
    expect(func).toHaveBeenCalledTimes(3);
  });
});

describe('flat', () => {
  it('with no value passed', () => {
    const startingArray = [1, [2, 3], [4, [5, 6, [7, 8]]]];
    const result = flat(startingArray);

    expect(result).toEqual([1, 2, 3, 4, [5, 6, [7, 8]]]);
  });

  it('with a value passed', () => {
    const startingArray = [1, [2, 3], [4, [5, 6, [7, 8]]]];
    const result = flat(startingArray, 2);

    expect(result).toEqual([1, 2, 3, 4, 5, 6, [7, 8]]);
  });

  it('with infinite passed', () => {
    const startingArray = [1, [2, 3], [4, [5, 6, [7, 8]]]];
    const result = flat(startingArray, Number.POSITIVE_INFINITY);

    expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
  });
});

describe('find', () => {
  it('with no value found', () => {
    const func = jest.fn((elem) => elem === 5);
    const startingArray = [1, 2, 3];
    const result = find(startingArray, func);

    expect(result).toBeUndefined();
    expect(func).toHaveBeenNthCalledWith(1, 1, 0, startingArray);
    expect(func).toHaveBeenNthCalledWith(2, 2, 1, startingArray);
    expect(func).toHaveBeenNthCalledWith(3, 3, 2, startingArray);
    expect(func).toHaveBeenCalledTimes(3);
  });

  it('with a value found', () => {
    const func = jest.fn((elem) => elem === 2);
    const startingArray = [1, 2, 3];
    const result = find(startingArray, func);

    expect(result).toEqual(2);
    expect(func).toHaveBeenNthCalledWith(1, 1, 0, startingArray);
    expect(func).toHaveBeenNthCalledWith(2, 2, 1, startingArray);
    expect(func).toHaveBeenCalledTimes(2);
  });
});

describe('findRight', () => {
  it('with no value found', () => {
    const func = jest.fn((elem) => elem === 5);
    const startingArray = [1, 2, 3, 4];
    const result = findRight(startingArray, func);

    expect(result).toBeUndefined();
    expect(func).toHaveBeenNthCalledWith(1, 4, 3, startingArray);
    expect(func).toHaveBeenNthCalledWith(4, 1, 0, startingArray);
    expect(func).toHaveBeenCalledTimes(4);
  });

  it('with a value found', () => {
    const func = jest.fn((elem) => elem === 2);
    const startingArray = [1, 2, 3, 2];
    const result = findRight(startingArray, func);

    expect(result).toEqual(2);

    expect(func).toHaveBeenCalledTimes(1);
  });
});

describe('fill', () => {
  it('with no start index and no end index', () => {
    const startingArray = [1, 2, 3, 4];
    const result = fill(startingArray, 10);

    expect(result).toEqual([10, 10, 10, 10]);
  });

  it('with a start index and no end index', () => {
    const startingArray = [1, 2, 3, 2];
    const result = fill(startingArray, 10, 2);

    expect(result).toEqual([1, 2, 10, 10]);
  });

  it('with a start index and end index', () => {
    const startingArray = [1, 2, 3, 2];
    const result = fill(startingArray, 10, 1, 3);

    expect(result).toEqual([1, 10, 10, 2]);
  });

  it('with a start index and end index', () => {
    const startingArray = [1, 2, 3, 2];
    const result = fill(startingArray, 10, 1, 3);

    expect(result).toEqual([1, 10, 10, 2]);
  });

  it('with no value argument', () => {
    const startingArray = [1, 2, 3, 2];
    const result = fill(startingArray);

    expect(result).toEqual([undefined, undefined, undefined, undefined]);
  });
});

describe('findIndex', () => {
  it('with no index found', () => {
    const func = jest.fn((elem) => elem === 5);
    const startingArray = [1, 2, 3];
    const result = findIndex(startingArray, func);

    expect(result).toEqual(-1);
    expect(func).toHaveBeenNthCalledWith(1, 1, 0, startingArray);
    expect(func).toHaveBeenNthCalledWith(2, 2, 1, startingArray);
    expect(func).toHaveBeenNthCalledWith(3, 3, 2, startingArray);
    expect(func).toHaveBeenCalledTimes(3);
  });

  it('with a index found', () => {
    const func = jest.fn((elem) => elem === 2);
    const startingArray = [1, 2, 3, 2];
    const result = findIndex(startingArray, func);

    expect(result).toEqual(1);
    expect(func).toHaveBeenNthCalledWith(1, 1, 0, startingArray);
    expect(func).toHaveBeenNthCalledWith(2, 2, 1, startingArray);
    expect(func).toHaveBeenCalledTimes(2);
  });
});

describe('findIndexRight', () => {
  it('with no index found', () => {
    const func = jest.fn((elem) => elem === 5);
    const startingArray = [1, 2, 3];
    const result = findIndexRight(startingArray, func);

    expect(result).toEqual(-1);
    expect(func).toHaveBeenCalledTimes(3);
  });

  it('with a index found', () => {
    const func = jest.fn((elem) => elem === 2);
    const startingArray = [1, 2, 3, 2];
    const result = findIndexRight(startingArray, func);

    expect(result).toEqual(3);
    expect(func).toHaveBeenCalledTimes(1);
  });
});
