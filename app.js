const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const userRouter = require('./routes/user.routes');
const indexRouter = require('./routes/index.routes');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
var cookieParser = require('cookie-parser')
app.use(cookieParser());
const connectToDB = require('./config/db');
connectToDB();

app.set('view engine', 'ejs');

app.use('/', indexRouter);
app.use('/user', userRouter);

app.listen(3000, ()=> {
    console.log('Server is running on port 3000');
});