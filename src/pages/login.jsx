import React, { useEffect, useState } from 'react';
import {  Button, Checkbox, Form, Input, Row, Col, Spin, Alert  } from "antd";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AuthService from '../services/auth.service';
import { Loading3QuartersOutlined} from '@ant-design/icons';

const antIcon = (
    <Loading3QuartersOutlined
      style={{
        fontSize: 24,
        color:'white'
      }}
      spin
    />
  );


const Login = () => {
    const navigate = useNavigate()
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");


     //redirecct to the destination
    //  let location = useLocation();
    //  let from = location.state?.from?.pathname || "/";
    //  const token = JSON.parse(localStorage.getItem('token'))
    //  useEffect(()=>{
    //      if(token){
    //          navigate(from, { replace: true });
    //      }
 
    //  },[from, navigate,token])
    const onFinish = (values) => {

        setMessage("");
        setLoading(true);
        const userCredential = {
            authType: "email",
            username: values.username,
            password: values.password
        }
        AuthService.login(userCredential).then(
            () => {
              navigate("/dashboard");
              window.location.reload();
            },
            (error) => {
                const resMessage =
                  (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                  error.message ||
                  error.toString();
      
                setLoading(false);
                setMessage(resMessage);
              }
        );
    }
    const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    };
    return (
        <>
           <Row
            className='login'
           >
                <Col className='login-col' xs={22} sm={16} md={12} lg={10} xl={8} xxl={7} span={6}>
                    <div className='login-title'>
                        <p>Gigidy</p>
                        <div>
                            <h2>Log In to Dashboard</h2>
                        </div>
                    </div>
                    <Form
                        name="basic"
                        form={form}
                        
                        initialValues={{
                        remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        layout="vertical"
                    >
                        <Form.Item
                            className='input-label'
                            label="Username"
                            name="username"
                            rules={[
                                {
                                required: true,
                                message: 'Please input your username!',
                                },
                                {
                                    pattern:/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                                    message: 'Invalid Email address'
                                }
                            ]}
                        >
                        <Input 
                            size='large'
                            placeholder='Username'
                        />
                        </Form.Item>

                        <Form.Item
                            className='input-label'
                            label="Password"
                            name="password"
                            rules={[
                                {
                                required: true,
                                message: 'Please input your password!',
                                },
                                {
                                    pattern:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                                    message: 'Password must contain at least 8 characters, at least 1 number, lowercase, uppercase, and 1 special characters',
                                },
                            ]}
                        >
                        <Input.Password
                            size='large'
                            placeholder='Password'
                         />
                        </Form.Item>

                        {
                            message &&
                                <Alert message={message} type="error" showIcon closable />
                        }
                        <Form.Item>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>
                            <span>
                                <Link to={"/"}> Forgot password </Link>
                            </span>
                        </Form.Item>
                        <Form.Item>
                            <Button
                                htmlType='submit'
                                type='primary'
                                size='large'
                                block>
                                {loading ? <Spin indicator={antIcon}/> : "Log In"}
                            </Button>
                        </Form.Item>
                        <Form.Item>
                        Do not have an account?
                        <a href="#">register now!</a>
                        </Form.Item>
                    </Form>
                </Col>
           </Row>
        </>
    );
};

export default Login;