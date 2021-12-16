import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Input, Button, Row, Col, Layout } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './Login.css';
import { Context } from "../store";
import {loginUser} from "../store/actions";



const AdminLogin = () => {

    const [state, dispatch ] = useContext(Context)
    const [email, setEmail] = useState('')
    const [password, setPassword] =useState('')
    const history = useHistory();


    const onFinish = async (e) => {
        

        setEmail(e.email)
        setPassword(e.password)


       

        const response = await  fetch('http://localhost:8081/api/adminauth/adminlogin/', {
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
            dispatch(loginUser(data));
            history.push("/adminhome") 
        }
        else {
            console.log("Login failed")
            alert("Login failed!")
        }
    }    
        

    return (
        <Layout style={{background:"white"}}>
            <h1>Admin Login</h1>
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
                    <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                    </Button>
                </Form.Item>
                </Form>
            </Col>
        </Row>    
        </Layout>
    );
};

export default AdminLogin;