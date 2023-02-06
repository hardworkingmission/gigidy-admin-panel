import {
  createBrowserRouter,
} from "react-router-dom";
import AppSettings from "../pages/app-settings";
import Businesses from "../pages/businesses";
import Dashboard from "../pages/dashboard";
import GigWorkers from "../pages/gig-workers";
import Gigs from "../pages/gigs";
import JobRequests from "../pages/job-requests";
import Login from "../pages/login";
import PageNotFound from "../pages/page-not-found";
import Signup from "../pages/signup";
import Subscriptions from "../pages/subscriptions";
import Users from "../pages/users";
import { user } from "../services/user";
import AuthService from "../services/auth.service";

import { ProtectedRoute } from "./auth/ProtectedRoute";


export const rootRouter = createBrowserRouter([
  {

    path: "/dashboard",
    element:  <ProtectedRoute user={AuthService.getCurrentUser()}>
                <Dashboard />
              </ProtectedRoute>,
    children: [
      {
        path: "/dashboard/users",
        element: <Users />,
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
    element: <ProtectedRoute user={AuthService.getCurrentUser()}>
               <Signup />
             </ProtectedRoute>,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

