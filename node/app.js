const express = require('express');
const images = require('./routes/images');
const auth = require('./routes/auth');
const history = require('connect-history-api-fallback');
const path = require('path');

const app = express();
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')
const cookieParser = require('cookie-parser')

//authentication
const session = require('express-session')
const { passport }  = require('./middleware/passport')

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    // allow preflight
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});
const staticMiddleware = express.static(path.join(__dirname, 'dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use('/images', express.static('images'));
app.use(cookieParser())
app.use(session({
    secret: 'rhafhsdlaflj',
    resave: false,
    saveUninitialized: false,
    //cookie: { secure: true }
}))
app.use(passport.initialize())
app.use(passport.session())
app.use('/api', images);
app.use('/auth', auth);
app.use(staticMiddleware);
app.use(history());
app.use(staticMiddleware);
app.listen(8080);