import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
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
    return (
        <>
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
        </>
    );
};

export default Users;