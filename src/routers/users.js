const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const Users=require('../models/users')
var verifyToken = require('../middlewear/verifytoken');
var dateTime = require('node-datetime');
var jwt = require('jsonwebtoken');
var config = require('../config/configToken');
var dt = dateTime.create();
var formatted = dt.format('Y-m-d H:M:S');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

/**
 * @swagger
 * /user:
 *   post:
 *     tags:
 *       - User
 *     name: Insert User Data
 *     summary: Insert User Data
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
*             user_id:
 *               type: integer
 *             user_name:
 *               type: string
 *             user_dob:
 *               type: string
 *             user_address:
 *               type: string
 *             user_state:
 *               type: string
 *         required:
 *           - user_name
 *           - user_dob
 *           - user_address
 *           - user_state
 *     responses:
 *       '200':
 *         description: Insert user data Successfully
 *       '400':
 *         description: error
 * 
 * /users/{userid}:
 *   delete:
 *     tags:
 *       - User
 *     name: Delete User
 *     summary: Delete User
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: "userid"
 *         in: path
 *         schema:
 *           type: object
 *     responses:
 *       '200':
 *         description: User is deleted
 *       '400':
 *         description: error
 *  
 * /users/{user_id}:
 *   put:
 *     tags:
 *       - User
 *     name: Update User 
 *     summary: Update User 
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: "user_id"
 *         in: path
 *         schema:
 *           type: object
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             user_name:
 *               type: string
 *             user_dob:
 *               type: string
 *             user_address:
 *               type: string
 *             user_state:
 *               type: string
 *         required:
 *           - user_id
 *     responses:
 *       '200':
 *         description: Project Updated
 *       '400':
 *         description: error
 * 
 * /users/{id}:
 *   get:
 *     tags:
 *       - User
 *     name: Show User
 *     summary: Show User Details
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: "id"
 *         in: path
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *         required:
 *           - id
 *     responses:
 *       '200':
 *         description: fetch users successfully
 *       '400':
 *         description: Error
 *     security:
 *       - bearerAuth: []
 * 
 * /users:
 *   get:
 *     tags:
 *       - User
 *     name: Show User
 *     summary: Show User list
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     responses:
 *       '200':
 *         description: fetch users successfully
 *       '400':
 *         description: Error
 *     security:
 *       - bearerAuth: []
 * 
 * /login:
 *   post:
 *     tags:
 *       - Login
 *     name: Login
 *     summary: Logs in a user
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *             password:
 *               type: string
 *         required:
 *           - username
 *           - password
 *     responses:
 *       '200':
 *         description: User found and logged in successfully
 *       '401':
 *         description: Bad username, not found in db
 *       '400':
 *         description: Username don't match
 */

/** 
 * Insert users data into DB 
 */
router.post('/user',verifyToken,(req,res)=>{
    let ts = Date.now();
    if(req.body.user_id=='' || req.body.user_id==null){
      res.status(401).json({"status":false,"message":"id is not passed"})
      return false
    }
    if(req.body.user_name=='' || req.body.user_name==null){
      res.status(401).json({"status":false,"message":"User name is not passed"})
      return false
    }
    if(req.body.user_address=='' || req.body.user_address==null){
      res.status(401).json({"status":false,"message":"User address is not passed"})
      return false
    }
    if(req.body.user_dob=='' || req.body.user_dob==null){
      res.status(401).json({"status":false,"message":"Date of birt is not passed"})
      return false
    }
    if(req.body.user_state=='' || req.body.user_state==null){
      res.status(401).json({"status":false,"message":"State is not passed"})
      return false
    }
    const user = new Users({
        id: req.body.user_id,
        name: req.body.user_name,
        address: req.body.user_address,
        dob: req.body.user_dob,
        state:req.body.user_state,
        createdAt:formatted
      }); 
      user.save().then(createdUser => {
        res.status(201).json({
          message: "User added successfully"
        //   userId: createdUser._id
        });
      });
})
/** 
 * Get the list of users
*/  
router.get('/users',verifyToken,(req,res)=>{
    Users.find().then(userData => {
        res.status(200).json({
          message: "Users data fetched successfully!",
          data: userData
        });
      });
})
/**
 * Get the user details using id   
 */ 
router.get('/users/:id',verifyToken,(req,res)=>{
    if(req.params.id=='' || req.params.id==null){
      res.status(401).json({"status":false,"message":"id is not passed"})
      return false
    }
    Users.find({id:req.params.id}).then(user => {
        if (user) {
          res.status(200).json({
              status:true,
              message:'Success',
              data:user
            });
        } else {
          res.status(404).json({ 
            status:false,  
            message: "user is not found!",
         });
        }
      });
})
/**
 * update user data
 */

router.put('/users/:id',verifyToken,(req,res)=>{
    if(req.params.id=='' || req.params.id==null){
      res.status(401).json({"status":false,"message":"id is not passed"})
      return false
    }
    const user ={ 
        name: req.body.user_name,
        address: req.body.user_address,
        dob: req.body.user_dob,
        state:req.body.user_state
      };
      Users.updateOne({id: req.params.id }, user).then(result => {
        res.status(200).json({ status:true,message: "Update successful!" });
      });
})
/**
 * Delete the user using user id
 */
router.delete('/users/:id',verifyToken,(req,res)=>{
    if(req.params.id=='' || req.params.id==null){
      res.status(401).json({"status":false,"message":"id is not passed"})
      return false
    }
    Users.deleteOne({ id: req.params.id }).then(result => {
        res.status(200).json({ status:true,message: "User deleted!" });
    });
})

/**
 *  user login
 */ 
router.post('/login', function(req, res) {
    if(req.body.username=='' || req.body.username==null){
        res.status(401).json({"status":false,"message":"username is not passed"})
        return false
    }
    if(req.body.password=='' || req.body.password==null){
        res.status(401).json({"status":false,"message":"Password is not passed"})
        return false
    }

    if(req.body.username=='user' && req.body.password=='123456'){
        var token = jwt.sign({ id: req.body.username,pwd:req.body.password }, config.secret, {
            expiresIn: 3600 // expires in 1 hours
        });
        var data={ "auth": true, "token": token }
        res.status(200).send({"status":true,"message":"User is Available","data":data});
    }
    else{
        res.status(400).send({"status":false,"message":"User credential not matched"});
    }
  
})
/**
 *  user logout
 */ 
router.get('/logout', function(req, res) {
    res.status(200).send({ auth: false, token: null });
});
module.exports = router;