const {Router} = require("express");
const {createUser, getUsers, checklogins} = require("../controllers/user.controller.js")
const api = Router()


api.post("/user", createUser)
api.get("/user", getUsers)
api.get("/user",checklogins)


module.exports = api;