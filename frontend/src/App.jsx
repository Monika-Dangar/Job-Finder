import React from "react";
import { store } from "./store/store";
// import { store, persistor } from "./store/store";
import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";
import Layout from "./Layout";
import AuthLayout from "./compoents/authentications/AuthLayout";
import Home from "./pages/Home";
import Job from "./pages/Job";
import PostJob from "./pages/PostJob";
import UserDashboard from "./pages/UserDashboard";
import ResumeBuilder from "./pages/ResumeBuilder";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/job",
        element: <Job />,
      },
      {
        path: "/post-job",
        element: (
          <AuthLayout authentication>
            <PostJob />
          </AuthLayout>
        ),
      },
      {
        path: "/userdashboard",
        element: (
          <AuthLayout authentication>
            <UserDashboard />
          </AuthLayout>
        ),
      },
      {
        path: "/resume-builder",
        element: (
          <AuthLayout authentication>
            <ResumeBuilder />
          </AuthLayout>
        ),
      },
      {
        path: "/login",
        element: (
          // <AuthLayout authentication={false}>
          <Login />
          // </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router}></RouterProvider>
      </Provider>
    </>
  );
}

export default App;
