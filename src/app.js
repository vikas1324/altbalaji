const express=require('express')
const path = require('path')
const mongoose=require('mongoose')
const userRouter=require('./routers/users')
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const cors=require('cors');
const config = require('./config/config');
const bodyParser = require('body-parser')
const app=express()
const port = config.port;
// Connection with Mongo Db

mongoose.connect('mongodb://localhost/user_db',{
    useNewUrlParser:true,useUnifiedTopology:true
})
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

/** Swagger Defination */  
const swaggerDefinition = {
   info: {
     title: 'Alt Balji',
     version: '1.0.0',
     description: 'API Documentation',
   },
   host: config.host+":"+config.port,
   basePath: '/',
   securityDefinitions: {
     bearerAuth: {
       type: 'apiKey',
       name: 'token',
       in: 'header',
     },
   },
 };
 /** pass route path to swagger */
 const options = {
   swaggerDefinition,
   apis: ['./routers/*.js'],
 };
 
 const swaggerSpec = swaggerJSDoc(options);
 
 app.get('/swagger.json', (req, res) => {
   res.setHeader('Content-Type', 'application/json');
   res.send(swaggerSpec);
 });

app.use(cors());
// initialize body-parser to parse incoming parameters requests to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(userRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Run server
app.listen({ port }, () => {
  console.log(`🚀Server ready at http://localhost:${ port }`);
});
module.exports=app;