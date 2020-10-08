import { Response, Request, NextFunction } from "express";
import {helper} from '../helpers/response-helper';
import {UserModel} from '../models/user.model'
import * as express from "express";
import {msg} from "../helpers/messages"
import  jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

export class AuthController {
          async login(req:Request, res:express.Response, next :NextFunction) {
            try {
              
              UserModel.find({email : req.query.email , password : req.query.password}).select('_id , name , email').then (
               async (data : any )=>{
                  if (data.length === 1 && data[0]._id ){
                    var token = await jwt.sign({ _id: data[0]._id, email : data[0].email }, process.env.JWT_TOKEN+'');
                   let resp={
                     email : data[0].email , 
                     name :data[0].name,
                     _id: data[0]._id,
                     token : token 
                   }
                    helper.success(res, msg.USER_LOGIN_SUCCESS, resp)
                  } else {
                    helper.error(res, msg.INVALID_CREDENTIALS, null)
                  }                 
                }
              )
            }catch(e){
            helper.server_error(res, msg.SERVER_ERROR, null)
            }
          }
          async signup(req:Request, res:express.Response, next :NextFunction) {
            const {email , name , password }= req.query      
            try{
              const user = new UserModel({
                name: name,
                email: email,
                password: password
              });
              user.save().then((userinfo:any)=>{
                helper.success(res, msg.USER_REGISTER_SUCCESS, userinfo)
              })
            } catch(e){
              helper.server_error(res, msg.SERVER_ERROR, null)
              }
             }
         async getusers(req:Request, res:Response, next :NextFunction) {
           console.log('in get users');
           
           try{
            UserModel.find({}).then((user:any)=>{
              if (user.length >0){
                helper.success(res, msg.RECORD_FETCHED_SUCCESSFULLY, user)
              }else {
                helper.error(res, msg.NO_RECORD, user)
              }
            })
           }catch(e){
            helper.server_error(res, msg.SERVER_ERROR, null)
           }
          }
          }

