const express = require('express')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3000
const jwtAuth = require("./middleware/jwtAuth")
require("dotenv").config()


authRoutes = require('./routes/auth');
adminauthRoutes = require('./routes/adminauth');
storageRoutes = require('./routes/storage');
reservationRoutes= require('./routes/reservation');



const app = express()

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use('/api/auth', authRoutes);
app.use('/api/adminauth',adminauthRoutes);
app.use('/api/storage', storageRoutes);
app.use('/api/reservation', reservationRoutes);


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/secret', jwtAuth, (req, res) => {
    res.send('Secret Hello World!')
})


app.get('*', (req, res) => {
    res.send('This route does not exist')
})

//DATABASE_URL="mongodb://localhost:27017/"
//mongodb://root:root@mongo/storagemate?authSource=admin
//rmongoose.Promise = global.Promise;
mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`))
    })
    .catch((err) => {
        console.log(err)
        process.exit(1)
    })
    console.log(process.env.DATABASE_URL);

module.exports = app;

