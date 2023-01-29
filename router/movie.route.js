import express from 'express';
import { getAllMovies, getMoviesById, createMovies, deleteMoviesById, updateMoviesById } from '../services/movies.services.js';
import { auth } from '../middleware/auth.js'
const router = express.Router();

router.get("/", async function (request, response) {
    if (request.query.rating) {
        request.query.rating = + request.query.rating
    }
    console.log(request.query)
    const movies = await getAllMovies(request);
    response.send(movies)
});

// router.get("/movies/:id", function (request, response) {
//     const { id } = request.params;
//     const movie = movies.find((mv) => mv.id === id);
//     movie ? response.send(movie) : response.status(404).send({ Message: "Movie Not Found" })
// });

router.get("/:id", async function (request, response) {
    const { id } = request.params;
    const movie = await getMoviesById(id)
    // const movie = movies.find((mv) => mv.id === id);
    movie ? response.send(movie) : response.status(404).send({ Message: "Movie Not Found" })
});

router.post("/", async function (request, response) {
    const data = request.body;
    console.log(data);
    //db.movies.insertMany({})
    const result = await createMovies(data);
    response.send(result);

});

router.delete("/:id", async function (request, response) {
    const { id } = request.params;
    const result = await deleteMoviesById(id)

    result.deletedCount > 0 ?
        response.send({ Message: "Movie Deleted Successflly!!!" })
        : response.status(404).send({ Message: "Movie Not Found!" })
});

router.put("/:id", async function (request, response) {
    const { id } = request.params;
    const data = request.body;
    const movie = await updateMoviesById(id, data)
    // const movie = movies.find((mv) => mv.id === id);
    movie ? response.send(movie) : response.status(404).send({ Message: "Movie Not Found" })
});

export default router;