import { Alert, Button, Checkbox, Col, Form, Input, Radio, Row, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Loading3QuartersOutlined} from '@ant-design/icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../components/Spinner';
import useUser from '../hooks/useUser';
import axios from 'axios';
import authHeader from '../services/auth-header';

const antIcon = (
    <Loading3QuartersOutlined
      style={{
        fontSize: 24,
        color:'white'
      }}
      spin
    />
  );

const UserEdit = (props) => {
    const {id} = useParams();
    const [user, loading ] = useUser(id);
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [message, setMessage] = useState("");

    console.log({user})
    useEffect(() => {
        form.setFieldsValue(user)
       }, [form, user])

    const onFinish = (values) => {
        const {firstName, lastName, username, email, status, phone, verified,active } = values;
        console.log({values})
        const newValues ={
            firstName,
            lastName,
            username,
            email,
            status,
            active,
            phone,
            verified
        }

        setMessage("");
        axios.put(`${process.env.REACT_APP_URL}/users/update/${user.id}`, newValues,{
            headers: authHeader()})
            .then(res=>{
                if(res.data){
                    navigate('/dashboard/users')
                }
            })
        
    }
    const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    };
    if(!user){
        return <Spinner/>
    }
    return (
        <>
            <Row
                className='user-form'
            >
                <ToastContainer/>
                <Col className='user-form-col' xs={22} sm={16} md={12} lg={10} xl={8} xxl={7} span={6}>
                    <div className='user-form-title'>
                        <p>Update user info</p>
                    </div>
                    <Form
                        name="basic"
                        form={form}
                        
                        initialValues={user}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        layout="vertical"
                    >
                        <Form.Item
                            className='user-form-input-label'
                            label="First Name"
                            name="firstName"
                        >
                            <Input 
                                size='large'
                                placeholder='First name'
                            />
                        </Form.Item>
                        <Form.Item
                            className='user-form-input-label'
                            label="Last Name"
                            name="lastName"
                        >
                            <Input 
                                size='large'
                                placeholder='Last name'
                            />
                        </Form.Item>
                        <Form.Item
                            className='user-form-input-label'
                            label="Username"
                            name="username"
                        >
                            <Input 
                                size='large'
                                placeholder='Username'
                            />
                        </Form.Item>
                        <Form.Item
                            className='user-form-input-label'
                            label="Email"
                            name="email"
                        >
                            <Input 
                                size='large'
                                placeholder='Email'                      
                            />
                        </Form.Item>
                        <Form.Item
                            className='user-form-input-label'
                            label="Phone"
                            name="phone"
                        >
                            <Input 
                                size='large'
                                placeholder='Phone' 
                            />
                        </Form.Item>
                        <Form.Item
                            name="verified"
                            valuePropName="checked"
                        >
                            <Checkbox >
                                Verified
                            </Checkbox>
                        </Form.Item>
                        <Form.Item valuePropName="checked" className='user-form-input-label' name='status' label="Status">
                            <Radio.Group>
                                <Radio value={true}> Active</Radio>
                                <Radio value={false}> Inactive </Radio>
                            </Radio.Group>
                        </Form.Item>
{/* 
                        <Form.Item
                            className='user-form-input-label'
                            label="Password"
                            name="password"
                        >
                        <Input.Password
                            size='large'
                            placeholder='Password'
                         />
                        </Form.Item> */}
                        <Form.Item>
                            <Button
                                htmlType='submit'
                                type='primary'
                                size='large'
                                block>
                                {loading ? <Spin indicator={antIcon}/> : "Update"}
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
            
        </>
    );
};

export default UserEdit;