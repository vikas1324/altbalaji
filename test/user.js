let chai=require('chai');
let chaiHttp=require('chai-http');
let server=require('../server.js');
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
                response.body.should.be.a('array');
                response.body.length.be.eq(5);
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