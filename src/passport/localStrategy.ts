import * as passportLocal from "passport-local";
import * as bcrypt from "bcrypt";
import { User } from "../entity/User";

const LocalStrategy = passportLocal.Strategy;

export default (passport: any) => {
  passport.use(
    // 전략에 관한 설정을 하는 곳
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      // 전략을 수행하는 async 함수. 세 번째 매개변수 함수는 passport.authenticate의 콜백 함수
      async (email: string, password: string, done: any) => {
        try {
          const exUser = await User.findOne({ where: { email } }); // 사용자 데이터베이스에서 일치하는 이메일이 있는 지 찾는다.
          if (exUser) {
            const result = await bcrypt.compare(password, exUser.password); // 있다면 bcrypt의 compare함수로 비밀번호를 비교한다.
            if (result) {
              done(null, exUser, { message: "성공적으로 로그인 했습니다." }); // 비밀번호까지 일치한다면 done 함수의 두 번째 인자로 사용자 정보를 넣어 보낸다.
            } else {
              done(null, false, { message: "비밀번호가 일치하지 않습니다." });
            }
          } else {
            done(null, false, { message: "가입되지 않은 회원입니다." });
          }
        } catch (error) {
          done(error); // 서버에러
        }
      },
    ),
  );
};
