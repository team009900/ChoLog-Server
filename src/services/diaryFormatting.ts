import Diary from "../entity/Diary";

//! diary 데이터 가공
export default (value: Diary): Diary => {
  const diary = value;

  //! 업데이트 날짜 삭제
  delete diary.updatedAt;

  //! weather 데이터 가공
  if (diary.weather) {
    (<any>diary).weatherId = diary.weather.id;
    delete diary.weather;
  } else {
    (<any>diary).weatherId = null;
    delete diary.weather;
  }

  //! plant 데이터 가공
  const plantKeys = Object.keys(diary.plant);
  plantKeys.forEach((key) => {
    if (key !== "id" && key !== "nickname") {
      delete diary.plant[key];
    }
  });

  //! states 테이터 가공
  diary.states.forEach((oneState) => {
    // console.log(oneState);
    const updateState = oneState;
    updateState.id = oneState.parameter.id;
    delete updateState.parameter;
    delete updateState.createdAt;
    delete updateState.updatedAt;
  });

  return diary;
};
