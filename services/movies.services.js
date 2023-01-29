import { ObjectId } from 'mongodb';
import { client } from '../index.js';

export async function updateMoviesById(id, data) {
    return await client.db("newmongo").collection("newmovies").updateOne({ _id: ObjectId(id) }, { "$set": data });
}
export async function deleteMoviesById(id) {
    return await client.db("newmongo").collection("newmovies").deleteOne({ _id: ObjectId(id) });
}
export async function createMovies(data) {
    return await client.db("newmongo").collection("newmovies").insertOne(data);
}
export async function getMoviesById(id) {
    return await client.db("newmongo").collection("newmovies").findOne({ _id: ObjectId(id) });
}
export async function getAllMovies(request) {
    return await client.db("newmongo").collection("newmovies").find(request.query).toArray();
}
