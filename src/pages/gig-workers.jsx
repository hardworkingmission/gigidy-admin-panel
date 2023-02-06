import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import axios from 'axios';
import authHeader from '../services/auth-header';

const columns = [
    {
      title: 'User Id',
      dataIndex: 'user_id',
      sorter: (a, b) => a.contact_number.length - b.contact_number.length,
      sortDirections: ['descend', 'ascend'],
      responsive: ["sm", "xs"]
    },
    {
      title: 'First Name',
      dataIndex: 'first_name',
      sorter: (a, b) => a.first_name.localeCompare(b.first_name),
      sortDirections: ['descend', 'ascend'],
      responsive: ["sm", "xs"]
    },
    {
      title: 'Last Name',
      dataIndex: 'last_name',
      sorter: (a, b) => a.last_name.localeCompare(b.last_name),
      sortDirections: ['descend', 'ascend'],
      responsive: ["sm", "xs"]
    },
    {
      title: 'Address',
      dataIndex: 'address',
      sorter: (a, b) => a.last_name.localeCompare(b.last_name),
      sortDirections: ['descend', 'ascend'],
      responsive: ["sm", "xs"]
    },
    {
      title: 'Contact Number',
      dataIndex: 'contact_number',
      sorter: (a, b) => a.contact_number.length - b.contact_number.length,
      sortDirections: ['descend', 'ascend'],
      responsive: ["sm", "xs"]
    },
    {
      title: 'Status',
      dataIndex: 'status',
      sorter: true,
      filters: [
        {
          text: 'Approved',
          value: 'approved',
        },
        {
          text: 'Pending',
          value: 'pending',
        },
      ],
      //render: (firstName) => `${firstName}`,
      responsive: ["sm", "xs"]
    }
    // {
    //   title: 'Gender',
    //   dataIndex: 'gender',
    //   filters: [
    //     {
    //       text: 'Male',
    //       value: 'male',
    //     },
    //     {
    //       text: 'Female',
    //       value: 'female',
    //     },
    //   ],
    //   responsive: ["sm","xs"]
    // },
    // {
    //   title: 'Email',
    //   dataIndex: 'email',
    //   responsive: ["sm","xs"]
    // },
  ];
  const getRandomuserParams = (page, params=false) =>{ 
    const queryParams = new URLSearchParams();
    queryParams.append('page', page)
    return queryParams;
};


const GigWorkers = () => {
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
      axios.get(`${process.env.REACT_APP_URL}/gig-workers?${getRandomuserParams(tableParams.pagination.current).toString()}`,{
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
                    //x:'100vw',
                    y:'55vh'
                }}
    
            />
        </>
    );
};

export default GigWorkers;