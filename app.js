const express = require('express');
const session = require('express-session');
const customRenderMiddleware = require('./middlewares/custom-render-middleware');
const homeRouter = require('./routes/home-router');
const memberRouter = require('./routes/member-route');

// Chargement des variables d'environement
require('dotenv-flow').config();

// Création du serveur web
const app = express();

// Variable de config
const { PORT, NODE_ENV, SESSION_SECRET, SESSION_STORE_SECRET } = process.env;

// Storage session in file (exemple)
const FileStore = require('session-file-store')(session);
const fileStoreConfig = {};

// Active session in Express
app.use(session({
    store: new FileStore(fileStoreConfig),
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 3600000
    }
}));

// Configurgation
app.set('view engine', 'ejs');
app.set('views', process.cwd() + '/views');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(customRenderMiddleware({ title: 'Title page ♥' }));

// Routing
app.use(homeRouter);
app.use(memberRouter);

// Demarrage du serveur Web
app.listen(PORT, () => {
    console.log(`Web Server running on port ${PORT} [${NODE_ENV}]`);
});