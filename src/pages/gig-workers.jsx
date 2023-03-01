import React, { useEffect, useState } from 'react';
import { Col, Input, Row, Table } from 'antd';
import axios from 'axios';
import authHeader from '../services/auth-header';
import { Link } from 'react-router-dom';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { TbListDetails } from 'react-icons/tb';
import CustomModal from '../components/CustomModal';

const tableColumns = (deleteWorker)=>{
	return  [
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
		},
		{
		  title: 'Address',
		  dataIndex: 'address',
		  sorter: (a, b) => a.last_name.localeCompare(b.last_name),
		  sortDirections: ['descend', 'ascend'],
		  responsive: ["sm", "xs"]
		},
		{
		  title: 'Actions',
		  render:(record)=>{
			return(
			  <div>
				<ul style={{listStyleType: 'none', display:'flex', justifyContent:'space-between', padding:0, margin:0}}>
				  <li><Link to={`/dashboard/gig-worker/${record.id}`}><TbListDetails color='blue' size={'20px'}/></Link></li>
				  <li><Link to={`/dashboard/gig-worker/update/${record.id}`}><AiOutlineEdit color='green' size={'20px'}/></Link></li>
				  <li onClick={()=>deleteWorker(record.id)}><AiOutlineDelete color='red' size={'20px'}/></li>
				</ul>
			  </div>
			)
		  },
		  responsive: ["sm", "xs"]
		},
		
	
	  ];
}
  const getRandomuserParams = (page, params=false) =>{ 
    const queryParams = new URLSearchParams();
    queryParams.append('page', page)
    return queryParams;
};


const GigWorkers = () => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(false);
	const [agree, setAgree] = useState(false);
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
     //search
     const onSearch = (value) => console.log(value);
	 const handleOk = () => {
		setAgree(true);
		setLoading(true);
		setTimeout(() => {
		  setLoading(false);
		  setOpen(false);
		}, 3000);
	  };
  
	  const handleCancel = () => {
		setOpen(false);
	  };
	const deleteWorker = (id)=>{
		setOpen(true)
		if(agree){
			axios.delete(`${process.env.REACT_APP_URL}/gig-workers?${id}`,{
				headers: authHeader()
			  })
			  .then(res=>{
				if(res){
					
				}
			  })


		}

	}
    return (
        <>
			<CustomModal title={'Delete a Worker'} open={open} handleOk={handleOk} handleCancel={handleCancel}>
				<p>Do you want to delete this gig work</p>
				
			</CustomModal>
            <Row style={{display:'flex', justifyContent:'end', marginBottom:'20px'}}>
				<Col  xs={22} sm={16} md={12} lg={10} xl={8} xxl={7}>
					<Input.Search placeholder="Search user info" onSearch={onSearch} enterButton />
				</Col>
            </Row>
            <Row>
				<Table
					columns={tableColumns(deleteWorker)}
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
            </Row>
        </>
    );
};

export default GigWorkers;