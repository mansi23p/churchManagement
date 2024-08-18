import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router
import { baseUrl } from '../const';
import './register.css'; // Import the CSS file

const Register = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const { username, email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post(`${baseUrl}/create`, formData);
      console.log(res.data);
      // Navigate to login page upon successful registration
      navigate('/login');
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h1>Church Name</h1>
        <h2 className="register-title">Register</h2>
        <form className="register-form" onSubmit={onSubmit}>
          <div className="input-group">
            <label htmlFor="username" className="input-label">Username</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={onChange}
              required
              className="input-field"
              placeholder="Enter your username"
            />
          </div>
          <div className="input-group">
            <label htmlFor="email" className="input-label">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              required
              className="input-field"
              placeholder="Enter your email"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password" className="input-label">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              required
              className="input-field"
              placeholder="Enter your password"
            />
          </div>
          <div className="button-container">
            <button type="submit" className="register-button">
              Register
            </button>
            <p>Already registered? 
              <span className="login-link" onClick={() => navigate('/login')}> Login</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;


























// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router
// import { baseUrl } from '../const';

// const Register = () => {
//   const navigate = useNavigate(); // Initialize useNavigate hook
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: ''
//   });

//   const { username, email, password } = formData;

//   const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

//   const onSubmit = async e => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(`${baseUrl}/create`, formData);
//       console.log(res.data);
//       // Navigate to login page upon successful registration
//       navigate('/login');
//     } catch (err) {
//       console.error(err.response.data);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <div>
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Register</h2>
//         </div>
//         <form className="mt-8 space-y-6" onSubmit={onSubmit}>
//           <div className="rounded-md shadow-sm -space-y-px">
//             <div>
//               <label htmlFor="username" className="sr-only">Username</label>
//               <input 
//                 type="text" 
//                 name="username" 
//                 value={username}
//                 onChange={onChange}
//                 required 
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
//                 placeholder="Username" 
//               />
//             </div>
//             <div>
//               <label htmlFor="email" className="sr-only">Email address</label>
//               <input 
//                 type="email" 
//                 name="email" 
//                 value={email}
//                 onChange={onChange}
//                 required 
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
//                 placeholder="Email address" 
//               />
//             </div>
//             <div>
//               <label htmlFor="password" className="sr-only">Password</label>
//               <input 
//                 type="password" 
//                 name="password" 
//                 value={password}
//                 onChange={onChange}
//                 required 
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
//                 placeholder="Password" 
//               />
//             </div>
//           </div>
//           <div>
//             <button 
//               type="submit" 
//               className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//             >
//               Register
//             </button>
//             <p>Already register ? <a className='text-blue-600 cursor-pointer '  onClick={()=>navigate('/login')} >Login</a> </p>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Register;
