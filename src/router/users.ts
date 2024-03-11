import express from "express";

import { fetchUsers } from "../controllers/users";

export default (router: express.Router) => {
  router.get("/users", fetchUsers);
};
