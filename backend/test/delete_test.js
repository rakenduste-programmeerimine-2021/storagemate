const User = require('../src/models/User');
const assert = require('assert');
  
describe('Deleting a User', () => {
  
    let user;
    beforeEach((done), () => {
        // user is an instance of User Model
        user = new User({ name: 'Shriyam' });
        user.save()
            .then(() => done());
    });
  
    it('Removes a User using its instance', (done) => {
    User.remove()
        // Checking if the user was deleted from DB or not
        .then(() => User.findOne({ name: 'Shriyam' }))
        .then((user) => {
            assert(user === null);
            done();
        });
    });
  
    it('Removes a user', (done) => {
    User.findOneAndRemove({ name: 'Shriyam' })
        .then(() => User.findOne({ name: 'Shriyam' }))
        .then((user) => {
            assert(user === null);
            done();
        });
    });
  
    it('Removes a user using its id', (done) => {
    User.findIdAndRemove(user._id)
        .then(() => User.findOne({ name: 'Shriyam' }))
        .then((user) => {
            assert(user === null);
            done();
        });
    })
})