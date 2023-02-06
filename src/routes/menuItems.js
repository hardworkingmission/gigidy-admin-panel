import { AiOutlineHome, AiOutlineUsergroupAdd } from "react-icons/ai";
import { HiOutlineUsers } from "react-icons/hi";
import { IoBusinessOutline, IoSettingsOutline } from "react-icons/io5";
import { MdOutlineHomeRepairService, MdOutlineSubscriptions } from "react-icons/md";
import { VscRequestChanges } from "react-icons/vsc";
import { Link } from "react-router-dom";

export const menuItems =[
    {
        key: '1',
        icon: <AiOutlineHome />,
        label: <Link to={'/dashboard'}>Home</Link>
    },
    {
      key: '2',
      icon: <HiOutlineUsers />,
      label: <Link to={'/dashboard/users'}>Users</Link>
    },
    {
      key: '3',
      icon: <IoBusinessOutline/>,
      label: <Link to={'/dashboard/businesses'}>Businesses</Link>
    },
    {
      key: '4',
      icon: <AiOutlineUsergroupAdd />,
      label: <Link to={'/dashboard/gig-workers'}>Gig Workers</Link>
    },
    {
        key: '5',
        icon: <MdOutlineHomeRepairService />,
        label: <Link to={'/dashboard/gigs'}>Gigs</Link>
    },
    {
        key: '6',
        icon: <VscRequestChanges />,
        label: <Link to={'/dashboard/job-requests'}>Job Requests</Link>
    },
    {
        key: '7',
        icon: <MdOutlineSubscriptions />,
        label: <Link to={'/dashboard/subscriptions'}>Subscriptions</Link>
    },
    {
        key: '8',
        icon: <IoSettingsOutline />,
        label: <Link to={'/dashboard/app-settings'}>App Settings</Link>
    },
  ]