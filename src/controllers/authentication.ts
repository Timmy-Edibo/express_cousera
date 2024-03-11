import express from "express";
import { createUser, getUserByEmail, getUsers } from "../db/users";
import { authentication, random } from "../helpers/index";


export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username } = req.body;
    if (!email || !password || !username) return res.sendStatus(400);

    const existingUser = await getUserByEmail(email);
    if (existingUser){
      console.log("there is a problem here", existingUser.email)
       return res.sendStatus(400)
      };
    console.log("working till here", email, password, username)

    const salt = random();
    const user = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });

    console.log("new user....", user)
    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
