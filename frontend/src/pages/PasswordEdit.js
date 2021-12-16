import React , { useContext, useState } from "react";
import { Context } from "../store";
import { Form, Input, Button, Row, Col } from 'antd';
import {useHistory} from 'react-router-dom'
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
    
    
    
    
    
    
    
    
    function PasswordEdit() {
        const history = useHistory();
        const [state, ] = useContext(Context);

        if(state.auth.token === null) {
            history.push('/login')
        }


        const [oldpassword, setOldpassword] = useState('')
        const [password, setPassword] = useState('')
        const [confirmpassword, setConfirmpassword] = useState('')
        const firstName = state.auth.user.firstName
        const lastName = state.auth.user.lastName
        const email = state.auth.user.email
        const phone = state.auth.user.phone

        
    
        const onFinish = async (e) => {
        
    
    
            setOldpassword(e.oldpassword);
            setPassword(e.password);
            setConfirmpassword(e.confirmpassword);
        
        
    
            const response = await fetch('http://localhost:8081/api/auth/changepw/', {
                method: 'POST',
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    phone,
                    password,
                    oldpassword
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
                
            })
        
            const data = await response.json()
        
            
            if(response.ok){
                history.push('/myprofile');
            };
        };
    

        return (
            <>
            <h1>Chnage your password</h1>
            <Row className="row"  justify="center" align="center">
            <Col flex="auto" justify= "center" align="center"> 
            <Form {...layout} className="register-form" name="Register" onFinish={onFinish}>


                <Form.Item 
                    name="Old password" 
                    label="Old password" 
                    value={oldpassword}
                    onChange={(e) => setOldpassword(e.target.value)}
                    autoFocus
                    rules={[{ required: true, message: 'Please input your password!', }, {min: 6, message: "Password must be minimum 6 characters"}]} 
                    hasFeedback>
                    <Input.Password />
                </Form.Item>


                <Form.Item 
                    name="New password" 
                    label="New password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoFocus
                    rules={[{ required: true, message: 'Please input your password!', }, {min: 6, message: "Password must be minimum 6 characters"}]} 
                    hasFeedback>
                    <Input.Password />
                </Form.Item>

                <Form.Item 
                    name="confirm new password" 
                    label="Confirm new password" 
                    dependencies={['New password']} 
                    value={confirmpassword}
                    onChange={(e) => setConfirmpassword(e.target.value)}
                    autoFocus
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your  new password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('New password') === value) {
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
                        Change password
                    </Button>
                </Form.Item>
            </Form>
            </Col>
            </Row>
        </>
        )
    }

export default PasswordEdit;