import { useContext, useState, useRef } from "react";
import { Context } from "../store";
import { updateStorages } from "../store/actions";
import { Form, Input, Button, Row, Col } from 'antd';
import {useHistory, useLocation} from 'react-router-dom'
import './EditStorage.css';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};


const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};






function EditStorage() {

  const [form] = Form.useForm();
  const [name, setName] = useState(useLocation().state.name);
  const [number, setNumber] = useState(useLocation().state.number);
  const [volume, setVolume] = useState(useLocation().state.volume);
  const [floorspace, setFloorspace] = useState(useLocation().state.floorspace);
  const [priceperday, setPricePerDay] = useState(useLocation().state.priceperday);
  let history = useHistory();

  const [state, dispatch] = useContext(Context);
  const inputRef = useRef(null);
  const contentRef = useRef(null);
  
  
  const id = useLocation().state.id;




  const handleSave = async (e) => {

      const itemSubmitted={
        id: id,
        name: name,
        number: number,
        volume: volume,
        floorspace: floorspace,
        priceperday: priceperday,     
      }
      console.log(itemSubmitted);
      const response = await fetch('http://localhost:8081/api/storage/update/' + id, {
          method: 'PUT',
          body: JSON.stringify(itemSubmitted),
          headers: {
              'Content-Type':'application/json'
          }
      });
      const data = await response;
    
        console.log(data)
        console.log(data.message)
      if(response.ok){
            dispatch(updateStorages(itemSubmitted));
            history.push('/adminhome');
        };
        
      
      form.resetFields();
  };

 

  return (

    <div>
      <h1>Edit storage</h1>
      <Row className="row"  justify="center" align="center">
        <Col flex="auto" justify= "center" align="center"> 
          <Form form = {form} {...layout}  className="storageedit-form" name="nest-messages" onFinish={handleSave} validateMessages={validateMessages}>
            <Form.Item
              name= "name"
              label="Name"
              //ref={inputRef}
              value={name}
              initialValue= {name}
              placeholder= "Name here"
              onChange={(e) => setName(e.target.value)}
              autoFocus
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            
            <Form.Item 
              name= "number" 
              label="Number"
              //ref={contentRef}
              value={number}
              initialValue={number}
              placeholder="Number here"
              onChange={(e) => setNumber(e.target.value)}
              autoFocus
              rules={[
                {
                  required: true,
                },
              ]}
              
              >
              <Input />
            </Form.Item>

            <Form.Item 
              name= "volume" 
              label="Volume"
              //ref={contentRef}
              value={volume}
              initialValue={volume}
              placeholder="Volume here(m3)"
              onChange={(e) => setVolume(e.target.value)}
              autoFocus
              rules={[
                {
                  required: true,
                },
              ]}
              
              >
              <Input />
            </Form.Item>


            <Form.Item 
              name= "floorspace" 
              label="Floorspace"
              //ref={contentRef}
              value={floorspace}
              initialValue={floorspace}
              placeholder="Floorspace here(m2)"
              onChange={(e) => setFloorspace(e.target.value)}
              autoFocus
              rules={[
                {
                  required: true,
                },
              ]}
              
              >
              <Input />
            </Form.Item>

            <Form.Item 
              name= "priceperday" 
              label="Price per day"
              //ref={contentRef}
              value={priceperday}
              initialValue={priceperday}
              placeholder="Daily price here"
              onChange={(e) => setPricePerDay(e.target.value)}
              autoFocus
              rules={[
                {
                  required: true,
                },
              ]}
              
              >
              <Input />
            </Form.Item>
  
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 2 }}>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>
          </Form>
          </Col>
        </Row>
    </div>
  );
}

export default EditStorage;
