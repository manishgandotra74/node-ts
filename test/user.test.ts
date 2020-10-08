var cha =require('chai') ;
var chaiHttp =require('chai-http') ;
var app= 'http://localhost:9000'
var request = require("supertest")(app);
cha.use(chaiHttp);
var expect = cha.expect;
let token =''
/** Authentication and user information testing  */
describe('user information testing ', () => {
    before(async () => {
        let resToken = await request
        .post('/api/login?email=manish@gmail.com&password=123456')
        .send({
        
        })
if (resToken.body && resToken.body.body && resToken.body.body.token){
    token=resToken.body.body.token
        }            
    });
    it('TC001  Get All Users', (done) => {
        cha.request(app)
              .get('/api/getUsers')
              .set('authorization', `Bearer ${token}`)
              .end((err, res) => {    
                  if (!err){
                    expect(res.body.status).to.deep.equal(200);
                    expect(res.body.message).to.deep.equal('Record Fetched successfully');
                    done();
      
                  }
              });
      });
});