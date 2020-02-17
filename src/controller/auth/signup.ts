import { Request, Response } from "express";
import { hashSync } from "bcryptjs";
import User from "../../entity/User";

export default async (req: Request, res: Response) => {
  console.log("회원가입");
  const { email, username, password } = req.body;

  if (!email) {
    //! email이 비어있음
    return res.status(400).json("이메일을 입력해주세요");
  }
  if (!username) {
    //! username이 비어있음
    return res.status(400).json("이름을 입력해주세요");
  }
  if (!password) {
    //! password가 비어있음
    return res.status(400).json("비밀번호를 입력해주세요");
  }

  try {
    const user = await User.findByEmail(email);
    if (user) {
      return res.status(400).json("이미 존재하는 유저입니다.");
    }
    const hash = hashSync(password, 12);

    const newUser = await User.createUser(email, username, hash);

    if (newUser === undefined) {
      return res.status(400).json("fail to create user");
    }

    return res.status(201).json({
      id: newUser.id,
      email: newUser.email,
      username: newUser.username,
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json(err);
  }
};
