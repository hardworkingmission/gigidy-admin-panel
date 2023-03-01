import { Descriptions} from 'antd';
import React from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import useGigWorker from '../hooks/useGigWorker';



const GigWorkerDetails = () => {
    const {id} =useParams();
    const [gigWorker, loading] = useGigWorker(id);
    console.log({gigWorker})
    if(loading){
        return <Spinner/>
    }

    return (
        <div >
            <div style={{display:'flex', justifyContent:'center'}}>
                <img src={gigWorker.profile_photos[0].url} alt="" srcSet="" style={{height:'100px', width:'100px', borderRadius:'50%'}}/>
            </div>
            
            <Descriptions style={{overflow:"auto", height:'65vh'}} title="Gig Worker Info" layout="horizontally" bordered >
                <Descriptions.Item label="First Name" span={3}>{gigWorker?.first_name}</Descriptions.Item>
                <Descriptions.Item label="Last Name" span={3}>{gigWorker?.last_name}</Descriptions.Item>
                <Descriptions.Item label="Contact Number" span={3}>{gigWorker?.contact_number}</Descriptions.Item>
                <Descriptions.Item label="Status" span={3}>{gigWorker?.status}</Descriptions.Item>
                <Descriptions.Item label="Available Time" span={3}>{gigWorker?.available_time}</Descriptions.Item>
                <Descriptions.Item label="Verified" span={3}>{gigWorker?.verified ? "yes" : "no"}</Descriptions.Item>
                <Descriptions.Item label="Contact Info" span={3}>
                 
                </Descriptions.Item>
                <Descriptions.Item label="Certification" span={3}>{gigWorker?.certification}</Descriptions.Item>
                <Descriptions.Item label="Language" span={3}>{gigWorker?.language}</Descriptions.Item>
                <Descriptions.Item label="License" span={3}>{gigWorker?.license}</Descriptions.Item>
                <Descriptions.Item label="Venue Experience" span={3}>{gigWorker?.venue_experience}</Descriptions.Item>
                <Descriptions.Item label="Work Rights" span={3}>{gigWorker?.work_rights}</Descriptions.Item>
            </Descriptions>
        </div>
    );
};

export default GigWorkerDetails;