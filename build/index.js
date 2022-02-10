import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import DBManager from "./db/db.js";
import main_controller from "./main_controller.js";
import * as dotenv from "dotenv";
dotenv.config();
const mainDB = new DBManager();
const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.text({type:"*/*"}));
app.post("/api/signup", main_controller.signup, (req, res) => {
    return res.status(200).send("User signed up successfully ✅");
});
app.post("/api/token", main_controller.token, (req, res) => {
    return res
                .cookie("access_token", req.token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                })
                .status(200).send("User logged in ✅")
});

app.post("/api/justify", [main_controller.authorization, main_controller.justify], (req, res) => {
    res.setHeader('Content-Type', 'text/plain')
    return res.status(200).send(req.output)
})
app.get("/", (req, res) => {
    return res.status(200).send("Welcome to API Justify text 👋");
});
const start = () => {
    let port = process.env.PORT;
    try {
        app.listen(port, () => {
            console.log(`🚀 Api up and running at: http://localhost:${port}`);
        });
    }
    catch (error) {
        console.error(error);
        process.exit();
    }
};
start();
export default mainDB;
