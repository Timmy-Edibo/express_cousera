import express from "express";
import { createUser, getUserByEmail, getUsers } from "../db/users";
import { authentication, random } from "../helpers/index";


export const fetchUsers = async (
  req: express.Request,
  res: express.Response
) => {
  console.log("users list called");
  try {
    const users = await getUsers();

    return res.status(200).json(users).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
