const forEach = (array: any[], cb: Function): void => {
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    cb(element, i, array);
  }
};

const find = (array: any[], cb: Function): any | undefined => {
  for (let i = 0; i < array.length; i++) {
    const element = array[i];

    const isFound = cb(element, i, array);

    if (isFound) return element;
  }
};

const findRight = (array: any[], cb: Function): any | undefined => {
  for (let i = array.length - 1; i >= 0; i--) {
    const element = array[i];
    const isFound = cb(element, i, array);
    if (isFound) return element;
  }
};

const filter = (array: any[], cb: Function): any[] => {
  const filteredArray = [];

  for (let i = 0; i < array.length; i++) {
    const element = array[i];

    const isMatch = cb(element, i, array);

    if (isMatch) filteredArray.push(element);
  }

  return filteredArray;
};

const map = (array: any[], cb: Function): any[] => {
  const mappedArray = [];

  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    const mappedElement = cb(element, i, array);

    mappedArray.push(mappedElement);
  }

  return mappedArray;
};

const every = (array: any[], cb: Function): boolean => {
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    const isMatch = cb(element, i, array);

    if (!isMatch) return false;
  }

  return true;
};

const some = (array: any[], cb: Function): boolean => {
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    const isMatch = cb(element, i, array);

    if (isMatch) return true;
  }

  return false;
};

const flat = (array: any[], level: number = 1): any[] => {
  const flattenArray = [];

  for (let i = 0; i < array.length; i++) {
    const element = array[i];

    if (Array.isArray(element) && level > 0) {
      flattenArray.push(...flat(element, level - 1));
    } else {
      flattenArray.push(element);
    }
  }

  return flattenArray;
};

const reduce = (array: any[], cb: Function, initValue?: any) => {
  let result = initValue;

  for (let i = 0; i < array.length; i++) {
    const element = array[i];

    if (!initValue && i === 0) result = element;
    else result = cb(result, element, i, array);
  }

  return result;
};

const fill = (array: any[], value?: any, start = 0, end = array?.length): any[] => {
  if (!array) throw new Error('please pass an array as a first argument');
  if (end > array.length) end = array.length;
  if (start < 0) start = 0;

  for (let i = start; i < end; i++) {
    array[i] = value;
  }

  return array;
};

const findIndex = (array: any[], cb: Function): number | -1 => {
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    const isFound = cb(element, i, array);

    if (isFound) return i;
  }

  return -1;
};

const findIndexRight = (array: any[], cb: Function): number | -1 => {
  for (let i = array.length - 1; i >= 0; i--) {
    const element = array[i];
    const isFound = cb(element, i, array);

    if (isFound) return i;
  }

  return -1;
};

const includes = (array: any[], target: any): boolean => {
  for (const element of array) {
    if (element === target) return true;
  }

  return false;
};

const reverse = (array: any[]): any[] => {
  const midIndex = Math.floor(array.length / 2);
  let counter = 0;

  while (counter < midIndex) {
    [array[array.length - 1 - counter], array[counter]] = [
      array[counter],
      array[array.length - 1 - counter],
    ];

    counter++;
  }
  return array;
};

const join = (array: any[], separator: string = ','): string => {
  let str = '';

  for (const index in array) {
    // ? if last element don't insert separator
    if (+index === array.length - 1) {
      str += `${array[index]}`;
      return str;
    }

    str += `${array[index]}${separator}`;
  }

  return str;
};

const split = (str: string, separator: string | number = ' '): string[] => {
  const array = [];

  if (separator === ' ') return [str];

  if (separator === '') {
    for (let i = 0; i < str.length; i++) {
      const char = str[i];
      if (char === `${separator}`) continue;
      array.push(char);
    }
  } else {
    let tempStr = '';

    for (let i = 0; i < str.length; i++) {
      const char = str[i];

      if (char === `${separator}` || i === str.length - 1) {
        if (i === str.length - 1) tempStr += char;

        array.push(tempStr);
        tempStr = '';
        continue;
      }

      tempStr += char;
    }
  }
  return array;
};

const slice = (
  target: any[] | string,
  start: number = 0,
  end: number = target.length,
): any[] | string => {
  const isString = typeof target === 'string';

  let sliced: any[] | string = isString ? '' : [];

  for (let i = start; i < end; i++) {
    const element = target[i];

    if (isString) sliced += element;
    else (sliced as any[]).push(element);
  }

  return sliced;
};

export {
  forEach,
  find,
  findRight,
  filter,
  map,
  every,
  some,
  flat,
  reduce,
  fill,
  findIndex,
  findIndexRight,
  includes,
  reverse,
  join,
  split,
  slice,
};
