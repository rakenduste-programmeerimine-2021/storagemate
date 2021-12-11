const supertest = require("supertest");
const expect = require('expect');
const app = require("../server");
const request = supertest(app);

let id ="";


describe('Signup new admin', () => {
    it('/api/adminauth/adminsignup should create a user', (done) => {
        
        const email = 'test@test.com';

        const body ={
            firstName: 'TestFirstName',
            lastName: 'TestLastname',
            email: email,
            password: 'testpassword'
        } 
     
      request
        .post('/api/adminauth/adminsignup')
        .send(body)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(200)
        .expect((res) => {
            expect(200)
            expect(res.body).not.toBeNull();
            expect(res.body.message).toBe("Admin created successfully");
            
        })
        /* .end((err) => {
            if(err) return done(err);
   
        }); */
        .end(done);
   
    });
})


describe('Login admin', () => {
    it('/api/adminauth/adminlogin should return token and admindata', (done) => {

        //const email = 'test@test.com';

        const body ={
            
            email: 'test@test.com',
            password: 'testpassword'
        } 

        request
            .post('/api/adminauth/adminlogin')
            .type('json')
            .set('Content-Type', 'application/json')

            .send(body)
           
            .set('Accept', 'application/json')
            .expect(200)
            .expect((res) => {
                expect(200)
                expect(res.body).toHaveProperty('token');
                expect(res.body).toHaveProperty('email');
                expect(res.body.email).toBe("test@test.com");
                expect(res.body.isAdmin).toBe("true");
                id= res.body.id
                console.log("ID: " +id)
              
                
            })    
            .end(done);

    })
})
describe('Delete admin by id', () => {
    it('/api/adminauth/delete/:id should delete user from database', (done) => {

        const body ={
            
            email: 'test@test.com',
            password: 'testpassword'
        }    
        
        request
        .delete('/api/adminauth/delete/')

        .type('json')
        .set('Content-Type', 'application/json')
        .send(body)

        .set('Accept', 'application/json')
        .expect(200)
        .expect((res) => {
            expect(200)
            console.log(res.text)
            expect(res.text).toContain("Successfully deleted the following admin:")
        })
        .end(done);
    
    });
})     
