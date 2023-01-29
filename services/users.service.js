import { client } from '../index.js';
import bcrypt from 'bcrypt';

export async function getHashedPassword(password) {
    const no_of_rounds = 10;
    const salt = await bcrypt.genSalt(no_of_rounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    // console.log(salt);
    console.log(hashedPassword);
    return hashedPassword
}

export async function createUser(data) {
    return await client.db("newmongo").collection("users").insertOne(data);
}

export async function getUserByName(username) {
    return await client.db("newmongo").collection("users").findOne({ username: username });
}