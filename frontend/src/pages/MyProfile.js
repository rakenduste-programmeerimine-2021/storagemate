import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store";
import {useHistory} from 'react-router-dom'
import { Descriptions, Button, Row, Col, Tabs, Space, List, Card, Popconfirm } from 'antd';
import { updateReservations } from '../store/actions';
import moment from 'moment';
import { Steps } from 'antd';

const { Step } = Steps;
const { TabPane } = Tabs;

let data = "";

function callback(key) {
  console.log(key);
}


function MyProfile() {
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const [state, dispatch] = useContext(Context);

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
      data = await response.json()
      
      console.log(data);

      dispatch(updateReservations(data))
      setIsLoading(false);

    })
  },[isLoading]);
    

  async function handleRentalEnd (item){
    console.log(item._id)
    
  

    const date= (moment(Date.now()).utc().format('MM/DD/YYYY'))


    const updatedReservation={
      storageid: item.storageid,
      rentalstart: item.rentalstart,
      rentalend: date,
      rentinguseremail: item.rentinguseremail,
      totalprice: item.totalprice,
      storageName: item.storageName,
      storageNumber: item.storageNumber,
      volume: item.volume,
      floorspace: item.floorspace,
      priceperday: item.priceperday

    }
    






    const response = await fetch('http://localhost:8081/api/reservation/update/' + item._id, {
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
        //dispatch(updateReservations(data));
        setIsLoading("true");
          //history.push('/myprofile');
    }else{
      alert("Saving changes failed!")
    };
      
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
              dataSource={state.reservations.data}
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

                    <h2>{item.storageName}</h2> 
                    <p>Volume: {item.volume} </p>
                    <p>Floorspace: {item.floorspace} </p>
                    <p>Price per day: {item.priceperday}$ </p>
                    
                    <p>Rental start: {moment(item.rentalstart).utc().format('MM/DD/YYYY')} </p>
                    <p>Rental end:{moment(item.rentalend).utc().format('MM/DD/YYYY')}</p>
                    
                    <p>Total price: {item.totalprice}$</p>
                    <Steps direction="vertical" size="small" progressDot current={4} direction="vertical">
                    <Step title="Confirmation" description="Waiting on staff to see your reservation" />
                    <Step title="Payment" description="Your reservation will be confirmed after payment has been confirmed" />
                    <Step title="Confirmed" description="Your reservation has been successfully confirmed." />
                    <Step status="error" title="Canceled" description="Has been canceled." />
                    </Steps>
                    {Date.parse(moment(item.rentalend).utc().format('MM/DD/YYYY')) > Date.now() ?
                      <>
                      <Popconfirm title="Sure to end rental?" 
                        onConfirm= { () => handleRentalEnd( item)}>
                        
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
