import React, { useEffect, useState } from 'react';
import { Table, Input, Space, Row, Col, Modal } from 'antd';
import {
  TbListDetails
} from 'react-icons/tb';
import axios from 'axios';
import authHeader from '../services/auth-header';
import { roleMapper } from '../helpers/roleMapper';
import { Link } from 'react-router-dom';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';

const columns = [
    {
      title: 'First Name',
      dataIndex: 'firstName',
      sorter: (a, b) => a.firstName.localeCompare(b.firstName),
      sortDirections: ['descend', 'ascend'],
      responsive: ["sm", "xs"]
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      sorter: (a, b) => a.lastName.localeCompare(b.lastName),
      sortDirections: ['descend', 'ascend'],
      responsive: ["sm", "xs"]
    },
    {
      title: 'Username',
      dataIndex: 'email',
      sorter: (a, b) => a.email.localeCompare(b.email),
      sortDirections: ['descend', 'ascend'],
      responsive: ["sm", "xs"]
    },
    {
      title: 'State',
      dataIndex: 'status',
      render:(status)=>`${status ? 'active' : 'inactive'}`,
      responsive: ["sm", "xs"]
    },
    {
      title: 'Verified',
      dataIndex: 'verified',
      render:(verified)=>`${verified ? 'yes' : 'no'}`,
      responsive: ["sm", "xs"]
    },
    {
      title: 'Role',
      dataIndex: 'roleId',
      render:(roleId)=>`${roleMapper(roleId)}`,
      responsive: ["sm", "xs"]
    },
    {
      title: 'Type',
      dataIndex: 'type',
      responsive: ["sm", "xs"]
    },
    {
      title: 'Actions',
      dataIndex: 'type',
      render:()=>{
        return(
          <div>
            <ul style={{listStyleType: 'none', display:'flex', justifyContent:'space-between', padding:0, margin:0}}>
              <li><Link to = {'#'}><TbListDetails size={'20px'}/></Link></li>
              <li><Link to = {'#'}><AiOutlineEdit color='green' size={'20px'}/></Link></li>
              <li><Link to = {'#'}><AiOutlineDelete color='red' size={'20px'}/></Link></li>
            </ul>
          </div>
        )
      },
      responsive: ["sm", "xs"]
    },

   
  ];
  const getRandomuserParams = (page, params=false) =>{ 
    const queryParams = new URLSearchParams();
    queryParams.append('page', page)
    return queryParams;
};


const Users = () => {
    const [data, setData] = useState();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState({
      pagination: {
        current: 1,
        pageSize: 10,
      },
    });
    const fetchData = () => {
      setLoading(true);
      axios.get(`${process.env.REACT_APP_URL}/users?${getRandomuserParams(tableParams.pagination.current).toString()}`,{
        headers: authHeader()
      })
         .then(res=>{
            const {rows, count} = res.data.result;
            console.log({count})
            setData(rows);
            setLoading(false);
            setTableParams({
                ...tableParams,
                pagination: {
                ...tableParams.pagination,
                total: count,
                },
            });
            })
        
    };
  
    useEffect(() => {
      fetchData();
    }, [JSON.stringify(tableParams)]);
   
    const handleTableChange = (pagination, filters, sorter) => {
      setTableParams({
        pagination,
        filters,
        ...sorter,
      });
  
      // `dataSource` is useless since `pageSize` changed
      if (pagination.pageSize !== tableParams.pagination?.pageSize) {
        setData([]);
      }
    };

    //search
    const onSearch = (value) => console.log(value);

    //Modal for User Details
    const showModal = () => {
      setOpen(true);
    };
    const handleOk = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setOpen(false);
      }, 3000);
    };
    const handleCancel = () => {
      setOpen(false);
    };
    return (
        <>
          <Row>
            <Modal
              open={open}
              title="Title"
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <p>Some contents...</p>
              <p>Some contents...</p>
              <p>Some contents...</p>
              <p>Some contents...</p>
              <p>Some contents...</p>
            </Modal>
          </Row>

          <Row style={{display:'flex', justifyContent:'end', marginBottom:'20px'}}>
            <Col  xs={22} sm={16} md={12} lg={10} xl={8} xxl={7}>
              <Input.Search placeholder="Search user info" onSearch={onSearch} enterButton />
            </Col>
          </Row>
          
          <Row>
            <Table
                  columns={columns}
                  rowKey={(record)=>record.id}
                  dataSource={data}
                  pagination={tableParams.pagination}
                  loading={loading}
                  onChange={handleTableChange}
                  scroll={{
                      x:'100vw',
                      y:'55vh'
                  }}
      
              />
          </Row>
           
        </>
    );
};

export default Users;