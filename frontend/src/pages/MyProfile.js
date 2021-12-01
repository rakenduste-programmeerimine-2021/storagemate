import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store";
import {useHistory, useLocation} from 'react-router-dom'
import { Descriptions, Button, Row, Col, Tabs, Space } from 'antd';

const { TabPane } = Tabs;


function callback(key) {
  console.log(key);
}


function MyProfile() {
  const history = useHistory();
  const [state, dispatch] = useContext(Context);
  console.log(state.auth.user.email);
  console.log(state.auth.user.firstName);
  console.log(state.auth.user.lastName);
  console.log(state.auth.user.phone);
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
          <p>Content of Tab Pane 2</p>
          <p>Content of Tab Pane 2</p>
          <p>Content of Tab Pane 2</p>
        </TabPane>
      </Tabs>
    </div>
  )
}

export default MyProfile;
