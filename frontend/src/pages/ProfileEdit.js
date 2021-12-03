import { useContext, useState} from "react";
import { Context } from "../store";
import { updateUser } from "../store/actions";
import { Form, Input, Button, Row, Col } from 'antd';
import { useHistory } from 'react-router-dom'
import './ProfileEdit.css';

const layout = {
  labelCol: {
      xs: {
      span: 24,
      },
      sm: {
      span: 8,
      },
  },
  wrapperCol: {
      xs: {
      span: 24,
      },
      sm: {
      span: 16,
      },
  },
  };

  const tailFormItemLayout = {
      wrapperCol: {
          xs: {
              span: 24,
              offset: 0,
          },
          sm: {
              span: 16,
              offset: 2,
          },
      },
  };


function ProfileEdit() {
  let history = useHistory();
  const [state, dispatch] = useContext(Context);
  const [form] = Form.useForm();
  
  
  
    
    const [firstName, setFirstName] = useState(state.auth.user.firstName);
    const [lastName, setLastName] = useState(state.auth.user.lastName);
    const [email, setEmail] = useState(state.auth.user.email);
    const [phone, setPhone] = useState(state.auth.user.phone);
    const [password, setPassword] =useState('')
    
    const id = state.auth.user.id;
    
    const handleSave = async (e) => {
        setPassword(e.password)
        const editedUser={
          _id: id,
          firstName: firstName,
          lastName: lastName,
          email: email,
          phone: phone,
          createdAt: Date.now(),
          password: password,
          __v: 0,
        }
        console.log(editedUser);
        const response = await fetch('http://localhost:8081/api/auth/update/' + id, {
            method: 'POST',
            body: JSON.stringify(editedUser),
            headers: {
                'Content-Type':'application/json'
            }
        });
        const data = await response.json();
      
          console.log(data)
          console.log(data.message)
        if(response.ok){
              dispatch(updateUser(data));
              history.push('/myprofile');
        }else{
          alert("Saving changes failed!")
        };
          
          
      

          
        
        form.resetFields();




    // dispatch(addPost(newPost));
    };

    //console.log({ inputRef });

    return (

      <div>
        <h1>Edit User</h1>
        <Row className="row"  justify="center" align="center">
          <Col flex="auto" justify= "center" align="center"> 
            <Form {...layout} className="profileedit-form" name="nest-messages" onFinish={handleSave}>
              <Form.Item
                name= "Firstname"
                label="Firstname"
                //ref={inputRef}
                value={firstName}
                initialValue= {firstName}
                placeholder= "Firstname here"
                onChange={(e) => setFirstName(e.target.value)}
                autoFocus
                rules={[{ required: true, message:"First name is required" }, {min:3, message: "First name must be minimum 3 characters"}]}>
                <Input />
              </Form.Item>
              
              <Form.Item 
                name= "Lastname" 
                label="Lastname"
                //ref={contentRef}
                value={lastName}
                initialValue={lastName}
                placeholder="Content here"
                onChange={(e) => setLastName(e.target.value)}
                autoFocus
                rules={[{ required: true, message:"Lastname is required" }, {min:3, message: "Last name must be minimum 3 characters"}]}>
                
                <Input/>
              </Form.Item>

              <Form.Item 
                name='email' 
                label="Email" 
                value={email}
                initialValue={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
                rules={[{ type: 'email', required: true, message:"Email is required" }]}>
                <Input />
              </Form.Item>
              
              <Form.Item
                name="phone"
                label="Phone Number"
                value={phone}
                initialValue={phone}
                onChange={(e) => setPhone(e.target.value)}
                rules={[
                {
                    required: true,
                    message: 'Please input your phone number!',
                },
                ]}          
              >
                <Input/>
              </Form.Item>

              <Form.Item 
                  name="password" 
                  label="Password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoFocus
                  rules={[
                    {
                        required: true,
                        message: 'Please input your Password!',
                    },
                    ]}
                  hasFeedback>
                  <Input.Password />
              </Form.Item>
    
              <Form.Item {...tailFormItemLayout}>
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

export default ProfileEdit;
