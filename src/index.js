const express=require('express');
const app=express();

const {PORT}=require('./config/serverConfig');

const ApiRoutes=require('./routes/index');
const bodyParser = require('body-parser');


const prepareAndStartServer=()=>{

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    app.use('/api',ApiRoutes);

    app.listen(PORT,async ()=>{
        console.log(`Server is running on port ${PORT}`);
    });
}

prepareAndStartServer();