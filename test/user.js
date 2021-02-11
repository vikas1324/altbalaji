let chai=require('chai');
let chaiHttp=require('chai-http');
let server=require('../src/app.js');
chai.use(chaiHttp);
//assertion style
chai.should();

describe('Users API',()=>{
    /**
     * Test the get route
     */
    describe('GET /users',()=>{
        it("it should GET all the Users",(done)=>{
            chai.request(server)
            .get("/users")
            .end((error,response)=>{
                response.should.have.status(200);
            done()
            })
        })
    })
     /**
     * Test the get {id} route
     */

     /**
     * Test the post route
     */     

     /**
     * Test the put route
     */     

     /**
     * Test the delete route
     */     
})