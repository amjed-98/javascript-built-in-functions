type TCb<T> = (el: T, i: number, arr: any[]) => any;

const forEach = <T>(array: T[], cb: TCb<T>): void => {
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    cb(element, i, array);
  }
};

const find = <T>(array: T[], cb: TCb<T>): T | undefined => {
  for (let i = 0; i < array.length; i++) {
    const element = array[i];

    const isFound = cb(element, i, array) as boolean | T;

    if (isFound) return element;
  }

  return;
};

const findRight = <T>(array: T[], cb: TCb<T>): T | undefined => {
  for (let i = array.length - 1; i >= 0; i--) {
    const element = array[i];

    const isFound = cb(element, i, array) as boolean | T;

    if (isFound) return element;
  }

  return;
};

const filter = <T>(array: T[], cb: TCb<T>): T[] => {
  const filteredArray = [];

  for (let i = 0; i < array.length; i++) {
    const element = array[i];

    const isMatch = cb(element, i, array) as boolean | T;

    if (isMatch) filteredArray.push(element);
  }

  return filteredArray;
};

const map = <T>(array: T[], cb: TCb<T>): any[] => {
  const mappedArray = [];

  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    const mappedElement = cb(element, i, array);

    mappedArray.push(mappedElement);
  }

  return mappedArray;
};

const every = <T>(array: T[], cb: TCb<T>): boolean => {
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    const isMatch = cb(element, i, array) as boolean | T;

    if (!isMatch) return false;
  }

  return true;
};

const some = <T>(array: T[], cb: TCb<T>): boolean => {
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    const isMatch = cb(element, i, array) as boolean | T;

    if (isMatch) return true;
  }

  return false;
};

const flat = <T>(array: T[], level = 1): any[] => {
  const flattenArray = [];

  for (let i = 0; i < array.length; i++) {
    const element = array[i];

    if (Array.isArray(element) && level > 0) {
      const flatten = flat(element, level - 1);
      flattenArray.push(...flatten);
    } else {
      flattenArray.push(element);
    }
  }

  return flattenArray;
};

type TReduceCb<T> = (result: any, el: T, i: number, arr: any[]) => any;
const reduce = <T>(array: T[], cb: TReduceCb<T>, initValue?: any) => {
  let result = initValue;

  for (let i = 0; i < array.length; i++) {
    const element = array[i];

    if (!initValue && i === 0) result = element;
    else result = cb(result, element, i, array);
  }

  return result;
};

const fill = <T>(array: any[], value?: T, start = 0, end = array?.length): T[] => {
  if (!array) throw new Error('please pass an array as a first argument');
  if (end > array.length) end = array.length;
  if (start < 0) start = 0;

  for (let i = start; i < end; i++) {
    array[i] = value;
  }

  return array;
};

const findIndex = <T>(array: T[], cb: TCb<T>): number | -1 => {
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    const isFound = cb(element, i, array) as boolean | T;

    if (isFound) return i;
  }

  return -1;
};

const findIndexRight = <T>(array: T[], cb: TCb<T>): number | -1 => {
  for (let i = array.length - 1; i >= 0; i--) {
    const element = array[i];
    const isFound = cb(element, i, array) as boolean | T;

    if (isFound) return i;
  }

  return -1;
};

const includes = <T>(array: T[], target: T): boolean => {
  for (const element of array) {
    if (element === target) return true;
  }

  return false;
};

const reverse = <T>(array: T[]): T[] => {
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

const join = <T>(array: T[], separator = ','): string => {
  let str = '';

  for (const index in array) {
    // ? if last element don't insert separator
    if (+index === array.length - 1) {
      str += `${array[index]}`;
      continue;
    }

    str += `${array[index]}${separator}`;
  }

  return str;
};

const split = (str: string, separator: string | number = ' '): string[] => {
  const array: string[] = [];

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

const slice = <T>(target: T[] | string, start = 0, end = target.length): T[] | string => {
  const isString = typeof target === 'string';

  let sliced = (isString ? '' : []) as T[] | string;

  for (let i = start; i < end; i++) {
    const element = target[i];

    if (isString) (sliced as string) += element;
    else (sliced as any[]).push(element);
  }

  return sliced;
};

const push = <T>(arr: T[], ...elements: T[]): number => {
  for (const key in elements) {
    arr[arr.length] = elements[key];
  }
  return arr.length;
};

const pop = <T>(arr: T[]): T => {
  const poppedElement = arr.at(-1) as T;
  arr.length = arr.length - 1;

  return poppedElement;
};

const flatMap = <T>(arr: T[], cb: TCb<T>): any[] => {
  const mappedArray = [];

  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];

    const mappedElement = cb(element, i, arr);

    mappedArray.push(...flat(mappedElement));
  }

  return mappedArray;
};

const shift = <T>(arr: T[]): T | undefined => {
  if (!arr.length) return;
  const shiftedElement = arr[0];

  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i + 1];
  }

  arr.length = arr.length - 1;
  return shiftedElement;
};

const unshift = <T>(arr: T[], ...elements: T[]): number => {
  arr.splice(0, 0, ...elements);
  return arr.length;
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
  push,
  pop,
  flatMap,
  shift,
  unshift,
};
