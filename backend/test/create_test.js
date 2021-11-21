const User = require('../src/models/User');
const assert = require('assert');
  
describe('Creating documents in MongoDB', () => {
    it('Creates a New User', (done) => {
        console.log(done);
        const newUser = new User({
            firstName: "TestFirstName",
            lastName: "TestLastname",
            email: "test@test.com",
            password: "testpassword"
            
            
            });
        newUser.save() // returns a promise after some time
            .then(() => {
                //if the newUser is saved in db and it is not new
                assert(!newUser.isNew);
                done();

            });
    });
});
