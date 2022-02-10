import { Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken";
import DataType from '../dataTypes/types';
import * as crypto from "crypto";
import mainDB from '../index';
import * as dotenv from "dotenv";
import moment from "moment";

dotenv.config();

const token = (req: DataType.UserDataRequest, res: Response, next: NextFunction) => {
    let body = req.body;
    console.log(body)
    if (body.email != undefined && body.password != undefined) {
        let email = body.email;
        let hashed_email: string = crypto.createHash('md5').update(email).digest('base64')  // username (user)
        let pwd: string =  crypto.pbkdf2Sync(body.password, hashed_email, 1000, 64, "sha512").toString("base64");
        let data = mainDB.read()
        const val = mainDB.getDB().chain.get('users').find({ "email": email, "pwd": pwd }).value();
        if (val != undefined) {
            req.email = email
            req.token = jwt.sign({ email: email, expiresIn: "1h"}, process.env.SECRET_KEY!)
            if (moment(val.last_session, "YYYY-MM-DD").date() != moment().date()) {
                mainDB.update(email, 80000, moment().format("YYYY-MM-DD"))
            }
            return next();
        }
        else {
            return res.status(400).send("Email or password incorrect");
        }
    }
    else {
        return res.status(400).send("Bad Request")
    }

}

export default token;