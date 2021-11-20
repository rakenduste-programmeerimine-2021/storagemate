const User = require('../src/models/User');
const assert = require('assert');
  
describe('Creating documents in MongoDB', () => {
    it('Creates a New User', (done) => {
        const newUser = new User({ name: 'Shriyam' });
        newUser.save() // returns a promise after some time
            .then(() => {
                //if the newUser is saved in db and it is not new
                assert(!newUser.isNew);
                done();
            });
    });
});