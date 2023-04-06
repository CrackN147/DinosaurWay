const asyncFunction = async () => {
  return await 1;
}

const promiseFunction = () => {
  return Promise.resolve(1);
}

const syncFunction = () => {
  return new Promise((resolve, reject) => {
    resolve(1);
  });
}

setTimeout(() => {}, 1000); 