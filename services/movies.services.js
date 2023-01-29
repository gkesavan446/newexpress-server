import { client } from '../index.js';

export async function updateMoviesById(id, data) {
    return await client.db("newmongo").collection("newmovies").updateOne({ id: id }, { "$set": data });
}
export async function deleteMoviesById(id) {
    return await client.db("newmongo").collection("newmovies").deleteOne({ id: id });
}
export async function createMovies(data) {
    return await client.db("newmongo").collection("newmovies").insertMany(data);
}
export async function getMoviesById(id) {
    return await client.db("newmongo").collection("newmovies").findOne({ id: id });
}
export async function getAllMovies(request) {
    return await client.db("newmongo").collection("newmovies").find(request.query).toArray();
}
