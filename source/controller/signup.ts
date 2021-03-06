import { Request, Response, NextFunction } from 'express';
import moment from "moment";
import * as crypto from "crypto";
import DataType from '../dataTypes/types';
import main from '../index';

const signup = (req: Request, res: Response, next: NextFunction) => {
    let body = req.body;
    let email: string = body.email;
    let hashed_email: string = crypto.createHash('md5').update(email).digest('base64')  // username (user)
    let password: string =  crypto.pbkdf2Sync(body.password, hashed_email, 1000, 64, "sha512").toString("base64");

    if (email == undefined && password == undefined) {
        return res.status(400).send("Bad Request")
    }
    else {
        if (main.mainDB.find(email)) {
            return res.status(400).send("Email already in use")
        }
        else {
            const new_user: DataType.User = {
                email: email,
                pwd: password,
                last_session: moment(Date.now()).format("YYYY-MM-DD"),
                limit: 80000
            }
            main.mainDB.write(new_user);
            return next()
        }
    }
}

export default signup;
