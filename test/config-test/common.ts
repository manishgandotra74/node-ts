let app= 'http://localhost:9000'
export const request = require("supertest")(app);
export const DefaultUser = {
    username: "manish@gmail.com",
    password: "123456"
};
export const loginWithDefaultUser = async () => {
    return request
        .post('/api/easyjob_login')
        .send({
            "username": DefaultUser.username,
            "password": DefaultUser.password
        })
        .expect(200);
};