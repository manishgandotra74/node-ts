import express from "express";
export const routes = express();

import {userrouter}  from "../router/user.router";
routes.use('/', userrouter);


