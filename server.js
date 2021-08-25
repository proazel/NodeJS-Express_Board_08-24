require('dotenv').config();
const PORT = process.env.PORT;

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const cors = require('cors');
const session = require('express-session');

const { sequelize } = require('./models');
const router = require('./routers/index');

app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.set('view engine', 'html');
nunjucks.configure('views', {
    express:app,
})

app.use(session({
    secret:'aaa',
    resave:false,
    saveUninitialized:true,
}));

sequelize.sync({force:false})
.then(()=>{
    console.log('DB 연결 성공');
})
.catch(()=>{
    console.log('DB 연결 실패');
})

app.use('/', router);

app.listen(PORT, ()=>{
    console.log(`server on PORT : ${PORT}`);
})