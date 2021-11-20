const User = require('../src/models/User');
const assert = require('assert');
  
let user;
// this will run before running every test
beforeEach(() => {
    // Creating a new Instance of User Model
    user = new User({  name: 'Shriyam' });
    user.save()
        .then(() => done());
});
  
describe('Reading Details of User', () => {
    it('Finds user with the name', (done) => {
        User.findOne({ name: 'Shriyam' })
            .then((user) => {
                assert(user.name === 'Shriyam');
                done();
            });
    })
})