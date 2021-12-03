import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store";
import {useHistory} from 'react-router-dom'
import { Descriptions, Button, Row, Col, Tabs, Space, List, Card, Popconfirm } from 'antd';
import { updateStorages } from '../store/actions';
import moment from 'moment';
const { TabPane } = Tabs;
let userReservations = "";
let data = "";

function callback(key) {
  console.log(key);
}


function MyProfile() {
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const [state, dispatch] = useContext(Context);

  /* if(state.auth.token === null) {
    history.push('/login')
  } */



  useEffect ( async () => {
    fetch('http://localhost:8081/api/storage').then(res => {
        return res.json();
    }).then(async (fulldata) =>{
        console.log(fulldata);
        const email = state.auth.user.email
        const response =  await fetch('http://localhost:8081/api/reservation/byuser/', {
          method: 'POST',
          body: JSON.stringify({
            email,
                  
          }),
          headers: {
            'Content-Type': 'application/json'
          },
              
        })
        userReservations = await response.json()
        console.log(userReservations)
        const resids =  userReservations.map((singleitem) => {return (singleitem.storageid);} )
        console.log(resids)
        
        data = fulldata.filter(object => resids.includes(object._id))
        console.log(data);
       
        /// data = storages
        // userReservations= reservationinfo


        /* var merged = .merge(.keyBy(a, 'userId'), .keyBy(b, 'userId'));
        var values = .values(merged);
        console.log(values);
 */

        /* var a = [{fname : 'foo'}]
        var b = [{lname : 'bar'}]
        var c = [...a, ...b] // output is [{fname : 'foo'},{lname : 'bar'}]*/
    dispatch(updateStorages(data))
    setIsLoading(false);


    })
    
    },[isLoading]);  




    async function handleRentalEnd(ID){
      console.log(ID)
      const cardresdata = userReservations.filter(object => object.storageid === ID)
      
      console.log(cardresdata);
      let id =  cardresdata.map((singleitem) => {return (singleitem._id);} )
      id= id.toString()
      const rentalstart =  cardresdata.map((singleitem) => {return (singleitem.rentalstart);} )
      const sdate = Date.parse(rentalstart);
      const startdate= (moment(sdate).utc().format('MM/DD/YYYY'))

      let finalPrice =  cardresdata.map((singleitem) => {return (singleitem.totalprice);} )
      finalPrice = finalPrice.toString()
      let rentinguseremail = cardresdata.map((singleitem) => {return (singleitem.rentinguseremail);} )
      rentinguseremail= rentinguseremail.toString()
      
      console.log(id)

      const date= (moment(Date.now()).utc().format('MM/DD/YYYY'))


      const updatedReservation={
        storageid: ID,
        rentalstart: startdate,
        rentalend: date,
        rentinguseremail: rentinguseremail,
        totalprice: finalPrice,

      }
      console.log(updatedReservation)






      const response = await fetch('http://localhost:8081/api/reservation/update/' + id, {
          method: 'PUT',
          body: JSON.stringify(updatedReservation),
          headers: {
              'Content-Type':'application/json',
              'Accept': 'application/json'
          }
      });
      const data = await response.json();
    
        console.log(data);
    
      if(response.ok){
          //dispatch(updateStorages(data));
          setIsLoading("true");
            //history.push('/myprofile');
      }else{
        alert("Saving changes failed!")
      };
        



    }
  
    function getRentalstart(id){
      console.log(id)
      const cardresdata = userReservations.filter(object => object.storageid === id)
      
      console.log(cardresdata);
      const rentalstart =  cardresdata.map((singleitem) => {return (singleitem.rentalstart);} )
      const date = Date.parse(rentalstart);
      const startdate= (moment(date).utc().format('MM/DD/YYYY'))
     
      return startdate ;

      
      
    }

    function getRentalend(id){
      console.log(id)
      const cardresdata = userReservations.filter(object => object.storageid === id)
      
      console.log(cardresdata);
      const rentalend =  cardresdata.map((singleitem) => {return (singleitem.rentalend);} )
      const date = Date.parse(rentalend);
      const enddate= (moment(date).utc().format('MM/DD/YYYY'))
     
      return enddate;
      
    }
    function getTotalPrice(id){
      console.log(id)
      const cardresdata = userReservations.filter(object => object.storageid === id)
      
      console.log(cardresdata);
      const finalPrice =  cardresdata.map((singleitem) => {return (singleitem.totalprice);} )
     
     
      return finalPrice;
    }




  return (
    
    <div>
      <h1>My profile</h1>
      <Tabs onChange={callback} type="card">
        <TabPane tab="User details" key="1">
          <>
            <Row>          
              <Col>
                <Descriptions bordered column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }} >
                  <Descriptions.Item label="Email" >{state.auth.user.email}</Descriptions.Item>
                  <Descriptions.Item label="First name" >{state.auth.user.firstName}</Descriptions.Item>
                  <Descriptions.Item label="Last name" >{state.auth.user.lastName}</Descriptions.Item>
                  <Descriptions.Item label="Phone">{state.auth.user.phone}</Descriptions.Item>
                  <Descriptions.Item label="Actions">
                  
                  <Space>

                  <Button type="primary" block onClick= { () => { history.push('/passwordedit')}}  >
                      Change password
                  </Button>
          
                  <Button type="primary"  block onClick= { () => { history.push('/profileedit')}} >
                      Edit profile
                  </Button>

                  </Space>

                  </Descriptions.Item>
                </Descriptions>,
              </Col>
            </Row>
          </>
        </TabPane>
        
        <TabPane tab="My storages" key="2">
          
            <h1>My Storages</h1>
            {!isLoading ? 
            <>
            <List
              className= "storagelist"
              grid={{
                gutter: 20,
                xs: 1,
                sm: 1,
                md: 2,
                lg: 3,
                xl: 4,
                xxl: 4,
              }}
              dataSource={state.storages.data}
              renderItem={item => (
                <List.Item>
                  <Card
                    style={{width: 230}}
                    cover={
                      <img
                        alt="storageunit"
                        src= "storagedoor.jpg"
                      />  
                    } 
                    
                    description="description"
                  >

                    <h2>{item.name}</h2> 
                    <p>Volume: {item.volume} </p>
                    <p>Floorspace: {item.floorspace} </p>
                    <p>Price per day: {item.priceperday}$ </p>
                    
                    <p>Rental start:{getRentalstart(item._id)} </p>
                    <p>Rental end:{getRentalend(item._id)}</p>
                    
                    <p>Total price: {getTotalPrice(item._id)}$</p>

                    {Date.parse(getRentalend(item._id)) > Date.now() ?
                      <>
                      <Popconfirm title="Sure to end rental?" onConfirm= { () => handleRentalEnd(item._id)}>
                      <Button type="primary" block >End rental</Button>
                        
                      </Popconfirm>
                      </>
                    :
                      <>
                      </>
                    }  
                    
                  </Card>
                    
                </List.Item>
              )}

            />
            </>
            :
            <>
            <h1 className="message" >Loading...</h1>
          
            
            
            </>
            }
          
        </TabPane>
      </Tabs>
    </div>
  )
}


export default MyProfile;
