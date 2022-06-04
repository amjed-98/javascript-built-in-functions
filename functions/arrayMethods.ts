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
};
