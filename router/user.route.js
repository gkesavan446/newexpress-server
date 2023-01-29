import express from 'express';
import { createUser, getHashedPassword, getUserByName } from '../services/users.service.js';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import * as dotenv from 'dotenv'
dotenv.config()
const router = express.Router();

router.post("/signup", async function (request, response) {
    const { username, password } = request.body;
    const userFromDB = await getUserByName(username)
    console.log(userFromDB)
    if (userFromDB) {
        response.status(400).send({ Message: "Username exits already!!!" })
    } else if (password.length < 8) {
        response.status(400).send({ Message: "your password must be atleast 8 Characters" })
    }
    else {
        const hashedPassword = await getHashedPassword(password);
        const result = await createUser({
            username: username,
            password: hashedPassword
        });
        response.send(result);
    }

});

router.post("/login", async function (request, response) {
    const { username, password } = request.body;
    const userFromDB = await getUserByName(username)
    console.log(userFromDB)
    if (!userFromDB) {
        response.status(400).send({ Message: "Invalid Credentials" })
    } else {
        const storedDBPassword = userFromDB.password
        const isPasswordCrct = await bcrypt.compare(password, storedDBPassword)
        console.log(isPasswordCrct)
        if (isPasswordCrct) {
            const token = jwt.sign({ id: userFromDB._id }, process.env.SECRET_KEY)
            response.send({ Message: "Successfully Logged in!!!", token: token })
        } else {
            response.status(400).send({ Message: "Invalid Credentials" })
        }
    }
});


export default router;



