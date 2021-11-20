import { useState } from "react";
import {
    Form,
    Input,
    Row,
    Col,
    Button,
} from 'antd';
import { useHistory } from "react-router-dom";
import './Register.css';


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








function Register() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmpassword, setConfirmPassword] = useState('')
    let history = useHistory();


    const onFinish = async (e) => {
        console.log(e);


        setFirstName(e.firstname);
        setLastName(e.lastname);
        setEmail(e.email);
        setPassword(e.password);
        setConfirmPassword(e.confirmpassword);
    
        
    
     
    
    
    
    
    
        console.log(firstName);
        console.log(lastName);
        console.log(email);
        console.log(password);

        const response = await fetch('http://localhost:8081/api/auth/signup/', {
            method: 'POST',
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                password
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            
        })
    
        const data = await response.json()
    
        console.log(data)
        console.log(data.message)
        if(response.ok){
            history.push('/login');
        };
    };

    


    return (
        <>
            <h1>Register</h1>
            <Row className="row"  justify="center" align="center">
            <Col flex="auto" justify= "center" align="center"> 
            <Form {...layout} className="register-form" name="Register" onFinish={onFinish}>
                <Form.Item 
                    name='firstname' 
                    label="First Name" 
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    autoFocus
                    rules={[{ required: true, message:"First name is required" }, {min:3, message: "First name must be minimum 3 characters"}]}>
                    <Input />
                </Form.Item>

                <Form.Item 
                    name='lastname' 
                    label="Last Name" 
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    autoFocus
                    rules={[{ required: true, message:"Lastname is required" }, {min:3, message: "Last name must be minimum 3 characters"}]}>
                    <Input />
                </Form.Item>

                <Form.Item 
                    name='email' 
                    label="Email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoFocus
                    rules={[{ type: 'email', required: true, message:"Email is required" }]}>
                    <Input />
                </Form.Item>


                <Form.Item 
                    name="password" 
                    label="Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoFocus
                    rules={[{ required: true, message: 'Please input your password!', }, {min: 6, message: "Password must be minimum 6 characters"}]} 
                    hasFeedback>
                    <Input.Password />
                </Form.Item>

                <Form.Item 
                    name="confirm" 
                    label="Confirm Password" 
                    dependencies={['password']} 
                    value={confirmpassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    autoFocus
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }

                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>


                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                </Form.Item>
            </Form>
            </Col>
            </Row>
        </>
    );
}

export default Register;