const forEach = (array: any[], cb: Function): void => {
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    cb(element, i, array);
  }
};

export { forEach };
