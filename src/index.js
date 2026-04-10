const express=require('express');
const app=express();

const {PORT}=require('./config/serverConfig');

const ApiRoutes=require('./routes/index');
const bodyParser = require('body-parser');

const db = require('./models/index');

const prepareAndStartServer=()=>{

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    app.use('/api',ApiRoutes);

    app.listen(PORT,async ()=>{
        console.log(`Server is running on port ${PORT}`);
        if(process.env.DB_SYNC){
             db.sequelize.sync({alter:true});
        }
        // const u1= await User.findByPk(4);
        // const r1=await Role.findByPk(2);
        // u1.addRole(r1);

    });
}

prepareAndStartServer();