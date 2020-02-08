/* eslint-disable max-len */
import * as passportLocal from "passport-local";
import { createConnection } from "typeorm";
import * as bcrypt from "bcrypt";
import * as Users from "../entity/users";
// 기존 방식: 인증 처리하는 middleware를 직접 구현.
// 새 방식:
// - 1. 인증 처리하는 middleware로 passport를 사용. 따라서 기존의 middleware에 담긴 코드를 passport의 콜백 함수들로 옮겨줘야 함.
// - 2. 로그인 middleware에서는 passport의 authenticate을 호출한 후 성공하면 JWT 토큰을 생성.

const LocalStrategy = passportLocal.Strategy;

// const user = await this.userRepository.findOne(
//   { where:
//       { email: 'this@mailisnotindatabase.de' }
//   }
// );

export default (passport: any) => {
  createConnection(/* ... */)
    .then(async (connection: any) => {
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
              // const user = await connection.manager.find(Users);
              const userRepository = connection.getRepository(Users);
              const exUser = await userRepository.findOne({
                where: { email },
              }); // 사용자 데이터베이스에서 일치하는 이메일이 있는 지 찾는다.
              if (exUser) {
                const result = await bcrypt.compare(password, exUser.password); // 있다면 bcrypt의 compare함수로 비밀번호를 비교한다.
                if (result) {
                  done(null, exUser, {
                    message: "성공적으로 로그인 했습니다.",
                  }); // 비밀번호까지 일치한다면 done 함수의 두 번째 인자로 사용자 정보를 넣어 보낸다.
                } else {
                  done(null, false, {
                    message: "비밀번호가 일치하지 않습니다.",
                  });
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
    })
    .catch((error: any) => console.log(error));
};
