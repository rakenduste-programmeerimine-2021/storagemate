import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store";
import {useHistory, useLocation} from 'react-router-dom'
import { Descriptions, Badge } from 'antd';
import { Row, Col } from 'antd';
import { Modal, Button } from 'antd';




function Reservation() {


  const [state, dispatch] = useContext(Context);
  //const history = useHistory();

  console.log(useLocation().state.id);
  console.log(useLocation().state.name);
  console.log(useLocation().state.volume);
  console.log(useLocation().state.floorspace);
  console.log(useLocation().state.status);
  console.log(useLocation().state.startdate);
  console.log(useLocation().state.enddate);
  console.log(useLocation().state.daycount);
  console.log(useLocation().state.priceperday);
  const storageid =  useLocation().state.id;
  const rentalstart = useLocation().state.startdate;
  const rentalend = useLocation().state.enddate;
  const rentinguseremail = state.auth.user.email;
  const totalprice = useLocation().state.priceperday * useLocation().state.daycount;
  /*if(state.auth.token === null) {
    history.push('/login')
  }*/

  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [modalText, setModalText] = React.useState(
      
  <div>
    Your Reservation is<br/>
    Storage name: {useLocation().state.name} <br/>
    Rental start: {useLocation().state.startdate}<br/>
    Rental end: {useLocation().state.enddate}<br/>
    Final price: {totalprice}$<br/>
  </div>
  
  );




  const showModal = () => {
    setVisible(true);
  };




  const handleOk = async() => {

    console.log(storageid)
    console.log(rentalstart)
    console.log(rentalend)
    console.log(rentinguseremail)
    console.log(totalprice)


    const response = await fetch('http://localhost:8081/api/reservation/create/', {
      method: 'POST',
      body: JSON.stringify({
        storageid,  
        rentalstart,
        rentalend,
        rentinguseremail,
        totalprice
      }),
      headers: {
          'Content-Type': 'application/json'
      },
      
  })

    setModalText('Your reservation has been confirmed!');
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };




  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
  };




  

  return (
    <>

  <Row>
    
  <Col flex={2} >
  <Descriptions.Item label="Status" span={3}>
    <Badge color="green" status="processing" text="Available" />
  </Descriptions.Item>
  <Descriptions title= "Storage booking information" bordered column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }} >
  <Descriptions.Item label="Name" >{state.auth.user.firstName} {state.auth.user.lastName}</Descriptions.Item>
    <Descriptions.Item label="Email" >{state.auth.user.email}</Descriptions.Item>
    <Descriptions.Item label="Name of storage">{useLocation().state.name}</Descriptions.Item>
    <Descriptions.Item label="Volume">{useLocation().state.volume}</Descriptions.Item>
    <Descriptions.Item label="Floorspace">{useLocation().state.floorspace}</Descriptions.Item>
    <Descriptions.Item label="Rental start" span={2}>
      {useLocation().state.startdate}
    </Descriptions.Item>
    <Descriptions.Item label="Rental end" span={2}>
      {useLocation().state.enddate}
    </Descriptions.Item>
    <Descriptions.Item label="Price of rental">{totalprice}$</Descriptions.Item>
    <Descriptions.Item label="Confirm purchase">
    <Button type="primary" onClick={showModal}>
        Confirm reservation
    </Button>
    </Descriptions.Item>
  </Descriptions>,
  </Col>
  <Col flex={3} >
  <div style={{display: "flex", justifyContent: "center", paddingTop: 67}}>
  <img style={{width: 500, verticalAlign: "middle"}} alt="storageunit"  src= "storagedoor.jpg" />
  </div>
  </Col>
  </Row>

  <Modal
        title="Confirm your reservation"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <>{modalText}</>
  </Modal>
  
  </>
  )
}

export default Reservation;
