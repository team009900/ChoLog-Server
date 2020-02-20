import Diary from "../entity/Diary";

export default (value: Diary): Diary => {
  const diary = value;
  delete diary.updatedAt;
  const plantKeys = Object.keys(diary.plant);
  plantKeys.forEach((key) => {
    if (key !== "id" && key !== "nickname") {
      delete diary.plant[key];
    }
  });
  diary.states.forEach((oneState) => {
    const updateState = oneState;
    updateState.id = oneState.parameter.id;
    delete updateState.parameter;
    delete updateState.createdAt;
    delete updateState.updatedAt;
  });

  return diary;
};
