import { Response, Request, NextFunction } from "express";
import {msg} from "./status"
  const success = (res:Response, message:string, resData:any) => {
    return res.json({
      status:msg.SUCCESS,
      message: message,
      body: resData
    });
}
  const error = (res:Response, message:string, resData:any) => {
    return res.json({
      status:msg.ERROR,
      message: message,
      body: null
    });
  }
  const server_error = (res:Response, message:string, resData:any) => {
    return res.json({
      status:msg.SERVER_ERROR,
      message: message,
      body: null
    });
  }
export const helper = {
  success,
  error,
  server_error
}