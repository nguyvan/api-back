import moment from "moment";
import * as crypto from "crypto";
import mainDB from '../index.js';
const signup = (req, res, next) => {
    let body = req.body;
    let email = body.email;
    let hashed_email = crypto.createHash('md5').update(email).digest('base64'); // username (user)
    let password = crypto.pbkdf2Sync(body.password, hashed_email, 1000, 64, "sha512").toString("base64");
    if (email == undefined && password == undefined) {
        return res.status(400).send("Bad Request");
    }
    else {
        if (mainDB.find(email)) {
            return res.status(400).send("Email already in use");
        }
        else {
            const new_user = {
                email: email,
                pwd: password,
                last_session: moment(Date.now()).format("YYYY-MM-DD"),
                limit: 80000
            };
            mainDB.write(new_user);
            return next();
        }
    }
};
export default signup;
