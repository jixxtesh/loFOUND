import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/auth-context";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const responseData = await response.json();

      if (response.ok) {
        localStorage.setItem("token", responseData.token);
        auth.login(responseData.userId, responseData.email, responseData.token);
        setError(null);
        navigate("/");
      } else {
        setError(responseData.message);
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  if (auth.isLoggedIn) {
    navigate("/");
  }

  return (
    <div className="m-auto p-4 grid md:grid-cols-2 items-center justify-items-center h-[calc(100vh-74px)] bg-back">
      <div className="lg:w-1/2 p-4 hidden lg:block text-center">
        <h2 className="text-4xl font-bold mb-4 text-sky">Welcome to loFOUND</h2>
        <p className="text-lg mb-2 text-navy">
          Report lost items or find what you've lost.
        </p>
        <p className="text-lg mb-2 text-navy">Please login to access your account.</p>
      </div>
      <div className="md:w-1/2 max-w-sm bg-white text-navy font-bold rounded-2xl drop-shadow-2xl p-4">
        <h2 className="text-2xl mb-4 text-center">Login</h2>
        <form onSubmit={handleLogin}>
          <label className="block text-md font-semibold">Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-9 rounded-lg my-2 p-2 border font-medium mb-4 outline-none text-gray-700 bg-green-50 focus:bg-green-50"
          />
          <label className="block text-md font-semibold">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-9 my-2 p-2 border font-medium rounded-lg mb-4 outline-none text-gray-700 bg-green-50 focus:bg-green-50"
          />
          <button
            type="submit"
            className="w-full font-medium bg-sky hover:bg-navy text-white p-2 my-4 rounded-lg"
          >
            Login
          </button>
          <p className="text-center text-sm font-light mt-4">Don't have an account yet?</p>
          <Link to="/register">
            <button className="w-full font-medium outline outline-navy outline-1 text-navy hover:outline-none hover:bg-navy hover:text-white p-2 mt-2 mb-6 rounded-lg">
              Sign Up
            </button>
          </Link>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default Login;

























// OLD CODE
// import React, { useState, useContext } from "react";
// import { AuthContext } from "../../context/auth-context";
// import { Link, useNavigate } from "react-router-dom";
// //import React from 'react';
// import { login } from '../api/api';

// export default function Login() {
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     const email = e.target.email.value;
//     const password = e.target.password.value;

//     const data = await login({ email, password });
//     console.log('Login response:', data);
//   };

//   return (
//     <form onSubmit={handleLogin}>
//       <h2>Login</h2>
//       <input type="email" name="email" placeholder="Email" required />
//       <input type="password" name="password" placeholder="Password" required />
//       <button type="submit">Login</button>
//     </form>
//   );
// }


// const Login = () => {
//   const auth = useContext(AuthContext);
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     const response = await fetch(`${process.env.REACT_APP_BASE_URL}login`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ email, password }),
//     });
    
//     if (response.ok) {
//   const responseData = await response.json();
//   localStorage.setItem("token", responseData.token); // ✅ Save token in browser
//   auth.login(responseData.userId, responseData.email, responseData.token); // ✅ Call context
//   setError(null);
//   navigate("/"); // ✅ Redirect to homepage
// }

    
//     else {
//       const responseData = await response.json();
//       setError(responseData.message);
//     }
//   };

//   if (auth.isLoggedIn) {
//     navigate("/");
//   }

//   return (
//     <div className="m-auto p-4 grid md:grid-cols-2 items-center justify-items-center h-[calc(100vh-74px)] bg-back">
//       <div className="lg:w-1/2 p-4 hidden lg:block text-center">
//         <h2 className="text-4xl font-bold mb-4 text-sky">
//           Welcome to loFOUND
//         </h2>
//         <p className="text-lg mb-2 text-navy">
//           Report lost items or find what you've lost.
//         </p>
//         <p className="text-lg mb-2 text-navy">Please login to access your account.</p>
//       </div>
//       <div className="md:w-1/2 max-w-sm bg-white text-navy font-bold rounded-2xl drop-shadow-2xl p-4">
//         <h2 className="text-2xl mb-4 text-center">Login</h2>
//         <form onSubmit={handleLogin}>
//           <label className="block text-md font-semibold">Email</label>
//           <input
//             type="text"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full h-9 rounded-lg my-2 p-2 border font-medium mb-4 outline-none text-gray-700 bg-green-50 focus:bg-green-50"
//           />

//           <label className="block text-md font-semibold">Password</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full h-9 my-2 p-2 border font-medium rounded-lg mb-4 outline-none text-gray-700 bg-green-50 focus:bg-green-50"
//           />
//           <button
//             type="submit"
//             className="w-full font-medium bg-sky hover:bg-navy text-white p-2 my-4 rounded-lg"
//           >
//             Login
//           </button>
//           <p className="text-center text-sm font-light mt-4">Don't have an account yet?</p>
//           <Link to="/register"><button
//             className="w-full font-medium outline outline-navy outline-1 text-navy hover:outline-none hover:bg-navy hover:text-white p-2 mt-2 mb-6 rounded-lg"
//           >
//             Sign Up
//           </button></Link>
//         </form>
//         {error && <p className="text-red-500 mt-4">{error}</p>}
//       </div>
//     </div>
//   );
// };

// export default Login;
