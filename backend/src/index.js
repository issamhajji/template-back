const express = require("express")
const cors = require('cors')
const dbConnection = require('./config/conn.js')
const swaggerUI = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json')
// VERSION DE ROUTER A UTILIZAR EN CADA CATEGORIA
const v1TestRouter = require("./routes/v1/testRoutes");
const v1UserRouter = require("./routes/v1/userRoutes");


const app = express();
const PORT = process.env.PORT || 3000;
// CORS
app.use(cors({
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'Authorization',
        'Access-Control-Allow-Origin',
        'Access-Control-Allow-Headers'
    ],
    exposedHeaders: ['Content-Range', 'X-Content-Range']
}));

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));

// SEPARACION DE APIs POR CATEGORIAS
app.use("/api/v1/test", v1TestRouter)
app.use("/api/v1/user", v1UserRouter)

dbConnection;

app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`)
});
