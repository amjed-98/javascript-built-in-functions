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

export { forEach, find, findRight };
