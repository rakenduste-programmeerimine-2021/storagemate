import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Input, Button, Checkbox, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './Login.css';
import { Context } from "../store";
import {loginUser} from "../store/actions";



const Login = () => {

    const [state, dispatch ] = useContext(Context)
    const [email, setEmail] = useState('')
    const [password, setPassword] =useState('')
    const history = useHistory();

    

    const onFinish = async (e) => {
        console.log('Received values of form: ', e);

        setEmail(e.email)
        setPassword(e.password)


        console.log(email);
        console.log(password);

        const response = await  fetch('http://localhost:8081/api/auth/login/', {
            method: 'POST',
            body: JSON.stringify({
                email,
                password

            }),
            headers: {
                'Content-Type': 'application/json'
            },
            
        })


        const data = await response.json()
        
        if (data.token) {
            console.log(" RESPONSE OK ");
            console.log(data);
            dispatch(loginUser(data));
            history.push("/") 
        }
        else {
            console.log("Login failed")
            alert("Login failed!")
        }
    }    
        

    return (
        <div>
            <h1>Login</h1>
        <Row className="row"  justify="center" align="center">
            <Col flex="auto" justify= "center" align="center">
            
                <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                >
                <Form.Item
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoFocus
                    rules={[
                    {
                        required: true,
                        message: 'Please input your e-mail!',
                    },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="E-mail" />
                </Form.Item>
                <Form.Item
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoFocus
                    rules={[
                    {
                        required: true,
                        message: 'Please input your Password!',
                    },
                    ]}
                >
                    <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <a className="login-form-forgot" >
                    Forgot password
                    </a>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                    </Button>
                    Or <a href="/register">register now!</a>
                </Form.Item>
                </Form>
            </Col>
        </Row>    
        </div>
    );
};

export default Login;