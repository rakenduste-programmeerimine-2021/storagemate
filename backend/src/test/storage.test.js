const supertest = require("supertest");
const expect = require('expect');
const app = require("../server");
const request = supertest(app);




let id ="";


describe('Creating new storage', () => {
    it('/api/storage/create should create new teststorage ', (done) => {
        
        

        const body ={
            name: 'Teststorage',
            number: '999',
            volume: "1m3",
            floorspace: '1m2',
            priceperday: '1'
            
        } 
     
      request
        .post('/api/storage/create')
        .send(body)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(200)
        .expect((res) => {


            expect(200)
            console.log(res.body)
            expect(res.body).not.toBeNull();
            expect(res.body._doc.name).toBe('Teststorage');
            expect(res.body._doc.number).toBe('999');
            id = res.body._doc._id;
            console.log("ID STORAGE LOOMISEST")
            console.log(id)
        })
        .end(done);
   
    });
})

describe('Update storage', () => {
    it('/api/storage/update/:id should update a storage information', (done) => {

        const body ={
            name: 'Updatedstorage',
            number: '999',
            volume: "2m3",
            floorspace: '2m2',
            priceperday: '2'
            
        } 
     
      request
        .put('/api/storage/update/'+id)
        .send(body)
        .set('Content-Type', 'application/json')
        
        .expect(200)
        .expect((res) => {
            expect(200)
            
            expect(res.body).not.toBeNull();
            expect(res.body._doc.name).toBe('Updatedstorage');
            expect(res.body._doc.number).toBe('999');
            expect(res.body._doc.volume).toBe('2m3');

            


        })
        .end(done);
   
    });
}) 

describe('Get storage by id', () => {
    it('/api/storage/byid should return a storage information', (done) => {


        const storageid = id;
        request
        .post('/api/storage/byid')
        .send({storageid})
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(200)
        .expect((res) => {
            expect(200)
            console.log(res.body)
            expect(res.body).not.toBeNull();
            expect(res.body._id).toBe(id);
            expect(res.body.name).toBe('Updatedstorage');
            expect(res.body.number).toBe('999');
            expect(res.body.volume).toBe('2m3');

            


        })
        .end(done);
    
    });
}) 



describe('Get storages', () => {
    it('/api/storage should return all storage data', (done) => {


        
        request
        .get('/api/storage')
        .set('Accept', 'application/json')
        .expect(200)
        .expect((res) => {
            expect(200)
            console.log(res.body)
            expect(res.body).not.toBeNull();
            expect.arrayContaining([
                expect.objectContaining({_id: id}),
            ])
        })
        .end(done);
    
    });
}) 



describe('Delete storage by id', () => {
    it('/api/storage/delete/:id should delete storage from database', (done) => {


        
        request
        .delete('/api/storage/delete/'+id)
        .set('Accept', 'application/json')
        .expect(200)
        .expect((res) => {
            expect(200)
            console.log(res.text)
            expect(res.text).toContain("Successfully deleted the following storage:")
        })
        .end(done);
    
    });
}) 

describe('Get storage by id after delete', () => {
    it('/api/storage/byid should not return storage information after deletion', (done) => {


        const storageid = id;
        request
        .post('/api/storage/byid')
        .send({storageid})
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(404)
        .expect((res) => {
            
            console.log(res.text)
            expect(res.body).not.toBeNull();
            expect(res.text).toBe("No storage with that id found")
          

            


        })
        .end(done);
    
    });
}) 


