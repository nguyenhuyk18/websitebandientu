// framework express
const express = require('express');
// bodyparser để lấy dữ liệu từ form
const bodyParser = require('body-parser');
// session
const session = require('express-session');
// nơi lưu trữ session
const FileStore = require('session-file-store')(session);
// nơi điều hành chính
const app = express();
// .env
require('dotenv').config();
// nơi để import middleware
const checkLoginAdminSite = require('./middlewares/checkLoginAdminSite');


const port = process.env.PORT || 6969;

// set up ejs
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded());

// parse application/json
app.use(bodyParser.json());

// các file tỉnh cố định
app.use(express.static('public'));

// Set up session
app.use(session({
    store: new FileStore({}),
    secret: 'phattrienungdunghihi',
    resave: false,
    saveUninitialized: true,
}));


const helpers = require('./util/helpers');
// rules: những thuộc tính trong app.locals sẽ trở thành tên biến bên view
// vd: thuộc tính helpers bên trái sẽ trở thành biến helpers trong view
app.locals.helpers = helpers;



// require router admin 
const adminRouters = require('./routers/adminRouters');
app.use('/admin', adminRouters);


// require router client
const clientRouters = require('./routers/clientRouters');
app.use('/', clientRouters);



app.listen(port, () => {
    console.log(`Example app listening on port http://127.0.0.1:${port}`)
});