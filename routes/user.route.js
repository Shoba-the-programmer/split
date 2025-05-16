/*
const {Router} = require("express");
const {createUser, getUsers, checklogins} = require("../controllers/user.controller.js")
const api = Router()


api.post("/user", createUser)
api.get("/user", getUsers)
api.get("/user",checklogins)


module.exports = api;

*/
// routes/user.route.js
import { Router } from "express";
import { createUser, getUsers, checklogins } from "../controllers/user.controller.js";

const api = Router();

api.post("/user", createUser);
api.get("/user", getUsers);
api.get("/user", checklogins);  // Note: Consider the route ordering if using same route + method

export default api;
