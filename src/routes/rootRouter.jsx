import {
  createBrowserRouter,
} from "react-router-dom";
import AppSettings from "../pages/app-settings";
import Businesses from "../pages/businesses";
import Dashboard from "../pages/dashboard";
import GigWorkerDetails from "../pages/gig-worker-details";
import GigWorkerEdit from "../pages/gig-worker-edit";
import GigWorkers from "../pages/gig-workers";
import Gigs from "../pages/gigs";
import JobRequests from "../pages/job-requests";
import Login from "../pages/login";
import PageNotFound from "../pages/page-not-found";
import Signup from "../pages/signup";
import Subscriptions from "../pages/subscriptions";
import UserDetails from "../pages/user-details";
import UserEdit from "../pages/user-edit";
import Users from "../pages/users";

import { ProtectedRoute } from "./auth/ProtectedRoute";


export const rootRouter = createBrowserRouter([
  {

    path: "/dashboard",
    element:  <ProtectedRoute >
                <Dashboard />
              </ProtectedRoute>,
    children: [
      {
        path: "/dashboard/users",
        element: <Users />,
      },
      {
        path: "/dashboard/user/:id",
        element: <UserDetails />,
      },
      {
        path: "/dashboard/user/update/:id",
        element: <UserEdit/>
      },
      {
        path: '/dashboard/businesses',
        element: <Businesses />,
      },
      {
        path: '/dashboard/gig-workers',
        element: <GigWorkers />,
      },
      {
        path: "/dashboard/gig-worker/:id",
        element: <GigWorkerDetails />,
      },
      {
        path: "/dashboard/gig-worker/update/:id",
        element: <GigWorkerEdit/>,
      },
      {
        path: '/dashboard/gigs',
        element: <Gigs />,
      },
      {
        path: '/dashboard/job-requests',
        element: <JobRequests />,
      },
      {
        path: '/dashboard/subscriptions',
        element: <Subscriptions />,
      },
      {
        path: '/dashboard/app-settings',
        element: <AppSettings />,
      },
    ],
  },
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <ProtectedRoute >
               <Signup />
             </ProtectedRoute>,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

