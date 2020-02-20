export default (value: any): any => {
  const result: any = value;

  const resultKeys: string[] = Object.keys(value);
  resultKeys.forEach((key: string) => {
    if (result[key] === undefined) {
      delete result[key];
    }
  });

  return result;
};
