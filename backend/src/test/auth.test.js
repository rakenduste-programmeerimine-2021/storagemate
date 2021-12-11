const supertest = require("supertest");
const expect = require('expect');
const app = require("../server");
const request = supertest(app);




let id ="";


describe('Testing / API', () => {
    
    it('/ should return Hello World! response', (done) => {
        //request(server)
            request.get('/')
            .expect('Hello World!')
            .end(done);


    })

})
describe('Signup new user', () => {
    it('/api/auth/signup should create a user', (done) => {
        
        const email = 'test@test.com';

        const body ={
            firstName: 'TestFirstName',
            lastName: 'TestLastname',
            email: email,
            phone: '53000000',
            password: 'testpassword'
        } 
     
      request
        .post('/api/auth/signup')
        .send(body)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(200)
        .expect((res) => {
            expect(200)
            expect(res.body).not.toBeNull();
            expect(res.body.message).toBe("User created successfully");
            
        })
        /* .end((err) => {
            if(err) return done(err);
   
        }); */
        .end(done);
   
    });
})


describe('Login user', () => {
    it('/api/auth/login should return token and user', (done) => {

        //const email = 'test@test.com';

        const body ={
            
            email: 'test@test.com',
            password: 'testpassword'
        } 

        request
            .post('/api/auth/login')
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
                id= res.body.id
                console.log("ID: " +id)
              
                
            })    
            .end(done);

    })
})

describe('Update user', () => {
    it('/api/auth/update/:id should update a user information', (done) => {
        
        const email = 'test@test.com';

        const body ={
            firstName: 'TestFName',
            lastName: 'TestLName',
            email: email,
            phone: '53999999',
            password: 'testpassword'

            
        } 
     
      request
        .post('/api/auth/update/'+id)
        .send(body)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(200)
        .expect((res) => {
            expect(200)
            expect(res.body).not.toBeNull();
            expect(res.body.email).toBe("test@test.com");
            expect(res.body.lastName).toBe('TestLName');
            expect(res.body.firstName).toBe('TestFName');
            expect(res.body.phone).toBe('53999999');
            


        })
        .end(done);
   
        });
    }) 


describe('Change user password', () => {
    it('/api/auth/changepw should update password', (done) => {
        
        const email = 'test@test.com';

        const body ={
            firstName: 'TestFName',
            lastName: 'TestLName',
            email: email,
            phone: '53999999',
            password: 'newpassword',
            oldpassword: 'testpassword'
        } 
        
        request
        .post('/api/auth/changepw')

        .type('json')
        .set('Content-Type', 'application/json')
        .send(body)
        
        .set('Accept', 'application/json')
        .expect(200)
        .expect((res) => {
            expect(200)
            expect(res.body.message).not.toBeNull();
            expect(res.body.message).toBe("Password updated successfully");
        })
        .end(done);
    
        });
    })   

describe('Delete user by id', () => {
    it('/api/auth/delete/:id should delete user from database', (done) => {

        const body ={
            password: 'newpassword'
        } 
        
        request
        .delete('/api/auth/delete/'+id)
        .type('json')
        .set('Content-Type', 'application/json')
        .send(body)

        .set('Accept', 'application/json')
        .expect(200)
        .expect((res) => {
            expect(200)
            console.log(res.text)
            expect(res.text).toContain("Successfully deleted the following user:")
        })
        .end(done);
    
    });
})     