import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/auth-context";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("phone", phone);

    try {
      // const response = await fetch(`${process.env.REACT_APP_BASE_URL}/register`, {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/register`, {

        method: "POST",
        body: formData,
      });

      const responseData = await response.json();

      if (response.ok) {
        auth.login(responseData.userId, responseData.token);
        setSuccessMessage("Registration successful!");
        setError(null);
        setTimeout(() => navigate("/"), 1500);
      } else {
        setError(responseData.message);
        setSuccessMessage("");
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError("Something went wrong. Please try again.");
      setSuccessMessage("");
    }
  };

  if (auth.isLoggedIn) {
    navigate("/");
  }

  return (
    <div className="m-auto p-4 grid md:grid-cols-2 items-center justify-items-center h-[calc(100vh-74px)]">
      <div className="lg:w-1/2 p-4 hidden lg:block text-center">
        <h2 className="text-4xl font-bold mb-4 text-sky">Welcome to loFOUND</h2>
        <p className="text-lg mb-2 text-navy">Report lost items or find what you've lost.</p>
        <p className="text-lg mb-2 text-navy">Please signup to create a new account.</p>
      </div>
      <div className="md:w-3/4 max-w-3xl bg-white text-navy font-bold rounded-2xl drop-shadow-2xl py-4 px-8">
        <h2 className="text-2xl mb-4 text-center">Sign Up</h2>
        <form onSubmit={handleSignup}>
          <label className="block text-md font-semibold">Name</label>
          <input
            type="text"
            className="h-9 rounded-xl w-full my-2 p-2 border font-medium mb-4 outline-none text-gray-700 bg-green-50"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label className="block text-md font-semibold">Email</label>
          <input
            type="text"
            className="h-9 rounded-xl w-full my-2 p-2 border font-medium mb-4 outline-none text-gray-700 bg-green-50"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="block text-md font-semibold">Password</label>
          <input
            type="password"
            className="h-9 rounded-xl w-full my-2 p-2 border font-medium mb-4 outline-none text-gray-700 bg-green-50"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className="block text-md font-semibold">Phone</label>
          <input
            type="text"
            className="h-9 rounded-xl w-full my-2 p-2 border font-medium mb-4 outline-none text-gray-700 bg-green-50"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <button
            type="submit"
            className="w-full font-medium bg-sky hover:bg-navy text-white p-2 my-4 rounded-lg"
          >
            Sign Up
          </button>
          <p className="text-center text-sm font-light mt-4">Already have an account?</p>
          <Link to="/login">
            <button className="w-full font-medium outline outline-navy outline-1 text-navy hover:outline-none hover:bg-navy hover:text-white p-2 mt-2 mb-6 rounded-lg">
              Login
            </button>
          </Link>
        </form>
        {successMessage && <p className="text-green-600 font-medium text-center mt-2">{successMessage}</p>}
        {error && <p className="text-red-500 font-medium text-center mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default Signup;








































// OLD Code
// // import React, { useState, useContext } from "react";
// import { AuthContext } from "../../context/auth-context";
// import { Link, useNavigate } from "react-router-dom";
// //import React from 'react';
// import { signup } from '../api/api';

// export default function Signup() {
//   const handleSignup = async (e) => {
//     e.preventDefault();
//     const name = e.target.name.value;
//     const email = e.target.email.value;
//     const password = e.target.password.value;

//     const data = await signup({ name, email, password });
//     console.log('Signup response:', data);
//   };

//   return (
//     <form onSubmit={handleSignup}>
//       <h2>Signup</h2>
//       <input type="text" name="name" placeholder="Name" required />
//       <input type="email" name="email" placeholder="Email" required />
//       <input type="password" name="password" placeholder="Password" required />
//       <button type="submit">Signup</button>
//     </form>
//   );
// }


// const Signup = () => {
//   const auth = useContext(AuthContext);
//   const navigate = useNavigate();

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [phone, setphone] = useState("");
//   //const [avatar, setAvatar] = useState(null);
//   const [error, setError] = useState(null);
//   const [successMessage, setSuccessMessage] = useState(""); // ✅ Added success state

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("email", email);
//     formData.append("password", password);
//     formData.append("phone", phone);
//     //formData.append("avatar", avatar);

//     try {
//       const response = await fetch(
//         `${process.env.REACT_APP_BASE_URL}register`,
//         {
//           method: "POST",
//           body: formData,
//         }
//       );

//       if (response.ok) {
//         const responseData = await response.json();
//         auth.login(responseData.userId, responseData.token);

//         setSuccessMessage("Registration successful!"); // ✅ Show success
//         setError(null); // clear previous errors
//         setTimeout(() => navigate("/"), 1500); // redirect after 1.5s
//       } else {
//         const responseData = await response.json();
//         setError(responseData.message);
//         setSuccessMessage(""); // clear success if failed
//       }
//     } catch (err) {
//       console.error("Signup error:", err);
//       setError("Something went wrong. Please try again.");
//       setSuccessMessage(""); // clear success if failed
//     }
//   };

//   if (auth.isLoggedIn) {
//     navigate("/");
//   }

//   return (
//     <div className="m-auto p-4 grid md:grid-cols-2 items-center justify-items-center h-[calc(100vh-74px)]">
//       <div className="lg:w-1/2 p-4 hidden lg:block text-center">
//         <h2 className="text-4xl font-bold mb-4 text-sky">
//           Welcome to loFOUND
//         </h2>
//         <p className="text-lg mb-2 text-navy">
//           Report lost items or find what you've lost.
//         </p>
//         <p className="text-lg mb-2 text-navy">
//           Please signup to create a new account.
//         </p>
//       </div>
//       <div className="md:w-3/4 max-w-3xl bg-white text-navy font-bold rounded-2xl drop-shadow-2xl py-4 px-8">
//         <h2 className="text-2xl mb-4 text-center">Sign Up</h2>
//         <form onSubmit={handleSignup}>
//           <label className="block text-md font-semibold">Name</label>
//           <input
//             type="text"
//             className="h-9 rounded-xl w-full my-2 p-2 border font-medium rounded mb-4 outline-none text-gray-700 bg-green-50"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//           <label className="block text-md font-semibold">Email</label>
//           <input
//             type="text"
//             className="h-9 rounded-xl w-full my-2 p-2 border font-medium rounded mb-4 outline-none text-gray-700 bg-green-50"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <label className="block text-md font-semibold">Password</label>
//           <input
//             type="password"
//             className="h-9 rounded-xl w-full my-2 p-2 border font-medium rounded mb-4 outline-none text-gray-700 bg-green-50"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <label className="block text-md font-semibold">phone</label>
//           <input
//             type="text"
//             className="h-9 rounded-xl w-full my-2 p-2 border font-medium rounded mb-4 outline-none text-gray-700 bg-green-50"
//             value={phone}
//             onChange={(e) => setphone(e.target.value)}
//           />
         
         
         
// {/*<label className="block text-md font-semibold">Avatar</label>
//           <input
//             type="file"
//             className="h-9 rounded-xl w-full my-2 p-2 text-sm border font-medium rounded mb-4 outline-none text-gray-700 bg-green-50"
//             accept="image/*"
//             onChange={(e) => setAvatar(e.target.files[0])}
//           />*/}





//           <button
//             type="submit"
//             className="w-full font-medium bg-sky hover:bg-navy text-white p-2 my-4 rounded-lg"
//           >
//             Sign Up
//           </button>
//           <p className="text-center text-sm font-light mt-4">
//             Already have an account?
//           </p>
//           <Link to="/login">
//             <button
//               className="w-full font-medium outline outline-navy outline-1 text-navy hover:outline-none hover:bg-navy hover:text-white p-2 mt-2 mb-6 rounded-lg"
//             >
//               Login
//             </button>
//           </Link>
//         </form>

//         {/* ✅ SUCCESS MESSAGE */}
//         {successMessage && (
//           <p className="text-green-600 font-medium text-center mt-2">
//             {successMessage}
//           </p>
//         )}

//         {/* 🔴 ERROR MESSAGE */}
//         {error && (
//           <p className="text-red-500 font-medium text-center mt-2">{error}</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Signup;
