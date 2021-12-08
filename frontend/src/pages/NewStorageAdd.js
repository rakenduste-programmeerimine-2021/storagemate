import { useContext, useState } from "react";
import { Context } from "../store";
import { addStorage } from "../store/actions";
import { Form, Input, Button, Row, Col } from 'antd';
import { useHistory } from 'react-router-dom'
import './EditStorage.css';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
/* eslint-disable no-template-curly-in-string */

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
/* eslint-enable no-template-curly-in-string */





function NewStorageAdd() {
  const [, dispatch] = useContext(Context);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [volume, setVolume] = useState("");
  const [floorspace, setFloorspace] = useState("");
  const [priceperday, setPricePerDay] = useState("");
  let history = useHistory();


  /*if(state.auth.token === null) {
    history.push('/login')
  }*/                               

  const handleSave = async (e) => {

      const itemSubmitted={
        name: name,
        number: number,
        volume: volume,
        floorspace: floorspace,
        priceperday: priceperday,     
      }
      console.log(itemSubmitted);
      const response = await fetch('http://localhost:8081/api/storage/create/', {
          method: 'POST',
          body: JSON.stringify(itemSubmitted),
          headers: {
              'Content-Type':'application/json'
          }
      });
      const data = await response;
    
        console.log(data)
        console.log(data.message)
      if(response.ok){
            dispatch(addStorage(itemSubmitted));
            history.push('/adminhome');
        };
        
        




   // dispatch(addPost(newPost));
  };

  //console.log({ inputRef });

  return (

    <div>
      <h1>Add new storage</h1>
      <Row className="row"  justify="center" align="center">
        <Col flex="auto" justify= "center" align="center"> 
          <Form {...layout}  className="storageedit-form" name="nest-messages" onFinish={handleSave} validateMessages={validateMessages}>
            <Form.Item
              name= "name"
              label="Name"
              //ref={inputRef}
              value={name}
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
    
    {/*  {state.posts.data.map((e) => (
        <li key={e.id}>
          {e.id} {e.title}
          <span
            style={{ cursor: "pointer" }}
            onClick={() => dispatch(removePost(e.id))}
          >
            &#128540;
          </span>
        </li>
      ))} */}
    </div>
  );
}

export default NewStorageAdd;
