const express = require('express');
const homeRouter = require('./routes/home-router');
const memberRouter = require('./routes/member-route');

// Chargement des variables d'environement
require('dotenv-flow').config();

// Création du serveur web
const app = express();

// Variable de config
const { PORT, NODE_ENV } = process.env;

// Configurgation
app.set('view engine', 'ejs');
app.set('views', process.cwd() + '/views');

// Middleware
app.use(express.urlencoded({ extended: true }));

// Routing
app.use(homeRouter);
app.use(memberRouter);

// Demarrage du serveur Web
app.listen(PORT, () => {
    console.log(`Web Server running on port ${PORT} [${NODE_ENV}]`);
});