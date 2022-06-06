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
  includes,
  reverse,
  join,
  split,
  slice,
} from '../functions/arrayMethods';
1;

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

describe('includes', () => {
  const startingArray = [1, 23, 4, 5, 6];

  it('with element found', () => {
    const result = includes(startingArray, 4);

    expect(result).toBeTruthy();
  });

  it('with no element found', () => {
    const result = includes(startingArray, 3);

    expect(result).toBeFalsy();
  });
});

it('reverse', () => {
  const startingArray = [1, 2, 3, 4];
  const result = reverse(startingArray);

  expect(result).toEqual([4, 3, 2, 1]);
});

describe('join', () => {
  const startingArray = ['amjad', 'yahia', 'software', 'developer'];

  it('should separate with "@" ', () => {
    const result = join(startingArray, '@');
    expect(result).toEqual('amjad@yahia@software@developer');
  });

  it('should separate with "-" when no separator provided', () => {
    const result = join(startingArray);
    expect(result).toEqual('amjad,yahia,software,developer');
  });

  it('should separate and stringify number elements', () => {
    const result = join([1, 2, 3, 4]);
    expect(result).toEqual('1,2,3,4');
  });
});

describe('split', () => {
  const startingString = 'amjad@yahia@software@developer';

  it('should split on "@" ', () => {
    const result = split(startingString, '@');
    expect(result).toEqual(['amjad', 'yahia', 'software', 'developer']);
  });

  it('should split on " " ', () => {
    const result = split(startingString);
    expect(result).toEqual(['amjad@yahia@software@developer']);
  });

  it('should split to an array of single characters ', () => {
    const result = split('amjad', '');
    expect(result).toEqual(['a', 'm', 'j', 'a', 'd']);
  });
});

describe('slice', () => {
  const startingArray = [1, 2, 3, 4];
  const startingString = 'amjadyahia';

  it('should slice from start index', () => {
    const arrayResult = slice(startingArray, 1);
    const strResult = slice(startingString, 1);

    expect(arrayResult).toEqual([2, 3, 4]);
    expect(strResult).toEqual('mjadyahia');
  });

  it('should slice from start index and end index', () => {
    const arrayResult = slice(startingArray, 1, 3);
    const strResult = slice(startingString, 1, 3);

    expect(arrayResult).toEqual([2, 3]);
    expect(strResult).toEqual('mj');
  });

  it('should slice the whole target when no start & end index provided', () => {
    const arrayResult = slice(startingArray);
    const strResult = slice(startingString);

    expect(arrayResult).toEqual(startingArray);
    expect(strResult).toEqual(strResult);
  });
});
