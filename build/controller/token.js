import jwt from "jsonwebtoken";
import * as crypto from "crypto";
import main from '../index.js';
import * as dotenv from "dotenv";
import moment from "moment";
dotenv.config();
const token = (req, res, next) => {
    let body = req.body;
    if (body.email != undefined && body.password != undefined) {
        let email = body.email;
        let hashed_email = crypto.createHash('md5').update(email).digest('base64'); // username (user)
        let pwd = crypto.pbkdf2Sync(body.password, hashed_email, 1000, 64, "sha512").toString("base64");
        let data = main.mainDB.read();
        const val = main.mainDB.getDB().chain.get('users').find({ "email": email, "pwd": pwd }).value();
        if (val != undefined) {
            req.email = email;
            req.token = jwt.sign({ email: email, expiresIn: "1h" }, process.env.SECRET_KEY);
            if (moment(val.last_session, "YYYY-MM-DD").date() != moment().date()) {
                main.mainDB.update(email, 80000, moment().format("YYYY-MM-DD"));
            }
            return next();
        }
        else {
            return res.status(400).send("Email or password incorrect");
        }
    }
    else {
        return res.status(400).send("Bad Request");
    }
};
export default token;
