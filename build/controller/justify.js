import get_justify_text from '../algo/justify.js';
import main from "../index.js";
const justify = (req, res, next) => {
    const context = req.body;
    const mail = req.email;
    let data = main.mainDB.read();
    const user = main.mainDB.getDB().chain.get("users").find({ email: mail }).value();
    let limit = user.limit;
    let last_session = user.last_session;
    limit -= context.length;
    if (limit < 0) {
        return res.status(402).json({
            "message": "Payment required"
        });
    }
    else {
        main.mainDB.update(mail, limit, last_session);
        const justify_text = get_justify_text(context, 80);
        req.output = justify_text;
        return next();
    }
};
export default justify;
