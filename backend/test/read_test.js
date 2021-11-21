const User = require('../src/models/User');
const assert = require('assert');

let user;
// this will run before running every test
beforeEach(() => {
    // Creating a new Instance of User Model
    user = new User({
        firstName: "FirstName",
        lastName: "Lastname",
        email: "testing@test.com",
        password: "testpassword"
        });
    user.save()
        .then(() => done());
});

describe('Reading Details of User', () => {
    it('Finds user with the name ', (done) => {
        User.findOne({ lastName: 'Lastname' })
            .then((user) => {
                
                assert(user.lastName === 'Lastname');
                done();
            }).catch(done);
    })
})