export default (time: number) => {
  const newPromise: any = new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
  return newPromise;
};
