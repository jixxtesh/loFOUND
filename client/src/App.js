import React from "react";
import LostItems from "./pages/LostItems/LostItems";
import HomePage from "./pages/Home/HomePage";
import Navbar from "./UI/Navbar";
import FoundItems from "./pages/FoundItems/FoundItems";
import Login from "./pages/Auth/Login";
import { AuthContext } from "./context/auth-context";
import { useAuth } from "./hooks/auth-hook";
import Signup from "./pages/Auth/Signup";
import ReportNewItem from "./pages/NewItem/ReportNewItem";
import MyItems from "./utils/MyItems";
import Item from "./utils/Item";
import UpdateItem from "./utils/UpdateItem";
import UserProfile from "./pages/Profile/UserProfile";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword";
import About from "./pages/About/About";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoute";

import Footer from "./UI/Footer";






/*const NavbarWrapper = () => {
  return (
    <div className="bg-back min-h-screen">
      <Navbar />
      <Outlet />
    </div>
  );
};*/


const NavbarWrapper = () => {
  return (
    <div className="bg-back min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />   {'Made by Jitesh'}
    </div>
  );
};




const router = createBrowserRouter([
  {
    path: "/",
    element: <NavbarWrapper />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Signup />,
      },
      {
        path: "profile",
        element: <UserProfile />,
      },
      {
        path: "about",
        element: <About />,
      },

{
  path: "items",
  children: [
    {
      path: "lost",
      element: (
        <ProtectedRoute>
          <LostItems />
        </ProtectedRoute>
      ),
    },
    {
      path: "found",
      element: (
        <ProtectedRoute>
          <FoundItems />
        </ProtectedRoute>
      ),
    },
    {
      path: "me",
      element: (
        <ProtectedRoute>
          <MyItems />
        </ProtectedRoute>
      ),
    },
  ],
},



      /*{
        path: "items",
        children: [
          {
            path: "lost",
            element: <LostItems />,
          },
          {
            path: "found",
            element: <FoundItems />,
          },
          {
            path: "me",
            element: <MyItems />,
          },
        ],
      },*/





      {
        path: "about",
        // element: <About/>
      },

{
  path: "item",
  children: [
    {
      path: "new",
      element: (
        <ProtectedRoute>
          <ReportNewItem />
        </ProtectedRoute>
      ),
    },
    {
      path: ":id",
      element: <Item />,
    },
    {
      path: "update/:id",
      element: <UpdateItem />,
    },
  ],
},






      /*{
        path: "item",
        children: [
          {
            path: "new",
            element: <ReportNewItem />,
          },
          {
            path: ":id",
            element: <Item />,
          },
          {
            path: "update/:id",
            element: <UpdateItem />,
          },
        ],
      },*/






      {
        path: "/password",
        children: [
          {
            path: "forgot",
            element: <ForgotPassword />,
          },
          {
            path: "reset/:token",
            element: <ResetPassword />,
          },
        ],
      },
    ],
  },
]);

function App() {
  const { token, login, logout, userId } = useAuth();

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <RouterProvider router={router} /> {/* or <Routes> if using react-router-dom v6 */}
    </AuthContext.Provider>
  );
}

export default App;
