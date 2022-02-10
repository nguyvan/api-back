import { Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken";
import DataType from '../dataTypes/types';

const authorization = (req: DataType.JustifyRequest, res: Response, next: NextFunction) => {
    const token = req.cookies.access_token;
    if (!token) {
        return res.sendStatus(403).json({
            "message": "No token provided"
        });
    }
    try {
        const data: any = jwt.verify(token, process.env.SECRET_KEY!);
        if (data.email != undefined) {
            req.email = data.email
            return next();
        }
        else {
            return res.sendStatus(403).json({
                "message": "Token invalid"
            });
        }
    } 
    catch(e) {
        return res.sendStatus(403).json({
            "message": "Failed to authenticate token."
        });
    }
}

export default authorization;