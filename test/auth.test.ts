var cha =require('chai') ;
var chaiHttp =require('chai-http') ;
var app= 'http://localhost:9000'
var request = require("supertest")(app);
cha.use(chaiHttp);
var expect = cha.expect;
/** Authentication and user information testing  */
describe('Authentication Testing', () => {


    /**Test case for get company profile  */
    it('TC001  Login User', (done) => {    
      cha.request(app)
            .post('/api/login?email=manish@gmail.com&password=123456')
            // .send()
            .end((err, res) => {
                if (!err) {
                    expect(res.body.status).to.deep.equal(200);
                    expect(res.body.message).to.deep.equal('User login successfully');
                    done();
                }
                });
                

    });
    it('TC002 Invalid User', (done) => {    
      cha.request(app)
            .post('/api/login?email=Wrongemail@gmail.com&password=123456')
            // .send()
            .end((err, res) => {  
                if (!err){
                    expect(res.body.status).to.deep.equal(400);
                    expect(res.body.message).to.deep.equal('Invalid Credentials');
                    done();
                }
                
            });
    });

});