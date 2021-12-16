const supertest = require("supertest");
const expect = require('expect');
const app = require("../server");
const request = supertest(app);


let id ="";


describe('Creating new reservation', () => {
    it('/api/reservation/create should create new testreservation ', (done) => {
        
        

        const body ={
            storageid: "testid",
            rentalstart: "2100-01-01T00:00:00.000+00:00" ,
            rentalend: "2100-02-01T00:00:00.000+00:00" ,
            rentinguseremail: "test@test.com",
            totalprice: 31,
            storageName: 'Teststorage',
            storageNumber: '999',
            volume: "1m3",
            floorspace: '1m2',
            priceperday: '1'
        } 
     
      request
        .post('/api/reservation/create')
        .send(body)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(200)
        .expect((res) => {


            expect(200)
            
            expect(res.body).not.toBeNull();
            expect(res.body.savedReservation.storageid).toBe('testid');
            expect(res.body.savedReservation.rentalstart).toBe("2100-01-01T00:00:00.000Z");
            expect(res.body.savedReservation.storageName).toBe('Teststorage');
            expect(res.body.savedReservation.storageNumber).toBe('999');
            id = res.body.savedReservation._id;
          
        })
        .end(done);
   
    });
})

describe('Update reservation', () => {
    it('/api/reservation/update/:id should update a reservation information', (done) => {

        const body ={
            storageid: "testiduus",
            rentalstart: "2100-01-01T00:00:00.000+00:00" ,
            rentalend: "2100-03-01T00:00:00.000+00:00" ,
            rentinguseremail: "test@test.com",
            totalprice: 61,
            storageName: 'Teststorage',
            storageNumber: '99999',
            volume: "1m3",
            floorspace: '1m2',
            priceperday: '1'
            
        } 
     
      request
        .put('/api/reservation/update/'+id)
        .send(body)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(200)
        .expect((res) => {
            expect(200)
            expect(res.body).not.toBeNull();
            expect(res.body.updatedReservation.storageid).toBe('testiduus');
            expect(res.body.updatedReservation.rentalend).toBe("2100-03-01T00:00:00.000Z");
            expect(res.body.updatedReservation.storageName).toBe('Teststorage');
            expect(res.body.updatedReservation.storageNumber).toBe('99999');

            


        })
        .end(done);
   
    });
}) 

describe('Get reservation by id', () => {
    it('/api/reservation/byid should return a  reservation information with that id', (done) => {


        const reservationid = id;
        request
        .get('/api/reservation/byid')
        .send({reservationid})
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(200)
        .expect((res) => {
            expect(200)
            expect(res.body).not.toBeNull();
            expect(res.body._id).toBe(id);
            expect(res.body.storageName).toBe('Teststorage');
            expect(res.body.storageNumber).toBe('99999');
            expect(res.body.volume).toBe('1m3');

            


        })
        .end(done);
    
    });
}) 



describe('Get reservations', () => {
    it('/api/reservation should return all reservation data', (done) => {


        
        request
        .get('/api/reservation')
        .set('Accept', 'application/json')
        .expect(200)
        .expect((res) => {
            expect(200)
            expect(res.body).not.toBeNull();
            expect.arrayContaining([
                expect.objectContaining({_id: id}),
            ])
        })
        .end(done);
    
    });
}) 


describe('Get reservation by user', () => {
    it('/api/reservation/byuser should return a all reservations made by that user', (done) => {
        const body ={
            email: "test@test.com"
        }

        request
        .post('/api/reservation/byuser')
        .send(body)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(200)
        .expect((res) => {
            expect(200)
            expect(res.body).not.toBeNull();
            expect.arrayContaining(['testiduus'])
        })
        .end(done);
    
    });
}) 


describe('Get reservations by timeperiod ', () => {
    it('/api/reservation/bydate should return reservation id-s made during set timeperiod ', (done) => {
        const body ={
            startdate: "2099-12-01T00:00:00.000+00:00" ,
            enddate: "2100-04-01T00:00:00.000+00:00" ,
        }

        request
        .post('/api/reservation/bydate')
        .send(body)
        .set('Content-Type', 'application/json')
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

describe('Delete reservation by id', () => {
    it('/api/reservation/delete/:id should delete reservation from database', (done) => {


        
        request
        .delete('/api/reservation/delete/'+id)
        .set('Accept', 'application/json')
        .expect(200)
        .expect((res) => {
            expect(200)
            console.log(res.text)
            expect(res.text).toContain("Successfully deleted the following reservation:")
        })
        .end(done);
    
    });
}) 

describe('Get reservation by id after delete', () => {
    it('/api/reservation/byid should not return a reservation information', (done) => {

        const reservationid = id;

        request
        .get('/api/reservation/byid')
        .send({reservationid})
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(404)
        .expect((res) => {
            
            console.log(res.text)
            expect(res.body).not.toBeNull();
            expect(res.text).toBe("No reservation with that id found")
          

            


        })
        .end(done);
    
    });
}) 


