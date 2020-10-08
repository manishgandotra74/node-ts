import { Validator } from 'node-input-validator';
import {UserModel} from "../models/user.model"
import { Response, Request, NextFunction } from "express";
import * as responseHelper from '../helpers/response-helper';

/** 
 * Middleware validation class
 */

export class validations  {
  async isEmailExist(req:Request, res:Response, next :NextFunction) {    
    let isEmailExist = await UserModel.findOne({ email: req.query.email });
    if (isEmailExist !== null) {
        responseHelper.helper.error(res, 'User Already Exists', null)
    } else {
      next();
    }
  }

  async loginvalidation(req:Request, res:Response, next :NextFunction) {
    let ruleObj = {
          email: 'required|email|minLength:7|maxLength:50',
          password: 'required|minLength:6|maxLength:25'
        }
    
    const v = new Validator(req.query, ruleObj);
    v.check().then((matched:any) => {
      var allErr = [];
      if (!matched) {
        for (let er in v.errors) {
          allErr.push(v.errors[er]["message"]);
        }
        return res.status(400).send({ message: allErr });
      } else {
        next();
      }
    });
  }
  async signupvalidation(req:Request, res:Response, next :NextFunction) {
    let ruleObj = {
          name: 'required|minLength:2|maxLength:40',
          email: 'required|email|minLength:7|maxLength:50',
          password: 'required|minLength:6|maxLength:25'
        }
    
    const v = new Validator(req.query, ruleObj);
    v.check().then((matched:any) => {
      var allErr = [];
      if (!matched) {
        for (let er in v.errors) {
          allErr.push(v.errors[er]["message"]);
        }
        return res.status(400).send({ message: allErr });
      } else {
        next();
      }
    });
  }

}
