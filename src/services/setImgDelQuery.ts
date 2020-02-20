export default (imgDel: string | undefined): boolean | undefined => {
  if (imgDel !== "true" && imgDel !== "false" && imgDel !== undefined) {
    return undefined;
  }
  const result: boolean = imgDel === "true";
  return result;
};
