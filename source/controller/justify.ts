import { Response, NextFunction } from 'express';
import DataType from '../dataTypes/types';
import moment from "moment";
import get_justify_text from '../algo/justify';
import MainDB from "../index";

const justify =  (req: DataType.JustifyRequest, res: Response, next: NextFunction) => {
    const context: string = req.body;
    const mail: string = req.email!;
    let data = MainDB.read();
    const user: DataType.User = MainDB.getDB().chain.get("users").find({email: mail}).value();
    let limit: number = user.limit;
    let last_session: string = user.last_session

    limit -= context.length;
    if (limit < 0) {
        return res.status(402).json({
            "message": "Payment required"
        })
    }
    else {
        MainDB.update(mail, limit, last_session);
        const justify_text = get_justify_text(context, 80);
        req.output = justify_text
        return next();
    }


}

export default justify