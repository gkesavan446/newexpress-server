import jwt from "jsonwebtoken";

export function auth(request, response, next) {
    try {
        const token = request.header('x-auth-token');
        console.log("token", token)
        jwt.verify(token, process.env.SECRET_KEY)
        next();
    } catch (err) {
        response.status(401).send({ Message: err.message })
    }
}