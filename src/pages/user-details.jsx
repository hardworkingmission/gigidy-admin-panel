import { Descriptions} from 'antd';
import React from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { roleMapper } from '../helpers/roleMapper';
import useUser from '../hooks/useUser';


const UserDetails = () => {
    const {id} =useParams();
    const [user, loading] = useUser(id);
    if(loading){
        return <Spinner/>
    }
    console.log({user})

    return (
        <div >
            <Descriptions title="User Info" layout="horizontally" bordered >
                <Descriptions.Item label="First Name" span={3}>{user?.firstName}</Descriptions.Item>
                <Descriptions.Item label="Last Name" span={3}>{user?.lastName}</Descriptions.Item>
                <Descriptions.Item label="Username" span={3}>{user?.username}</Descriptions.Item>
                <Descriptions.Item label="Email" span={3}>{user?.email}</Descriptions.Item>
                <Descriptions.Item label="Phone" span={3}>{user?.phone}</Descriptions.Item>
                <Descriptions.Item label="Verified" span={3}>{user?.verified ? "yes" : "no"}</Descriptions.Item>
                <Descriptions.Item label="Role" span={3}>{roleMapper(user?.roleId)}</Descriptions.Item>
                <Descriptions.Item label="User Type" span={3}>{user?.type}</Descriptions.Item>
            </Descriptions>
        </div>
    );
};

export default UserDetails;