import React, { useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../const';
import { useNavigate } from 'react-router-dom';
import './login.css'; // Assuming the CSS is in the same folder

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();
  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post(`${baseUrl}/login`, formData);
      console.log(res.data);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard'); // Navigate to the next page after successful login
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="image-container">
          <img src="src/church1.jpeg" alt="Church" className="church-image" />
        </div>
        <div className="form-container">
          <h2 className="login-title">Welcome!</h2>
          <form onSubmit={onSubmit}>
            <div className="input-group">
              <label htmlFor="email" className="sr-only">Email address</label>
              <input 
                type="email" 
                name="email" 
                value={email}
                onChange={onChange}
                required 
                className="input-field" 
                placeholder="Email address" 
              />
            </div>
            <div className="input-group">
              <label htmlFor="password" className="sr-only">Password</label>
              <input 
                type="password" 
                name="password" 
                value={password}
                onChange={onChange}
                required 
                className="input-field" 
                placeholder="Password" 
              />
            </div>
            <div className="login-actions">
              <label className="remember-me">
                <input type="checkbox" /> Remember Me
              </label>
              {/* <a href="#" className="forgot-password">Forgot Password?</a> */}
            </div>
            <button 
              type="submit" 
              className="login-button"
            >
              Login
            </button>
            <p>Don't have an account? <a className='text-blue-600 cursor-pointer' onClick={() => navigate('/')}>Register</a></p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;






























// import React, { useState } from 'react';
// import axios from 'axios';
// import { baseUrl } from '../const';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });

//   const navigate = useNavigate()
//   const { email, password } = formData;

//   const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

//   const onSubmit = async e => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(`${baseUrl}/login`, formData);
//       console.log(res.data);
//       localStorage.setItem('token', res.data.token);
//     } catch (err) {
//       console.error(err.response.data);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <div>
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Login</h2>
//         </div>
//         <form className="mt-8 space-y-6" onSubmit={onSubmit}>
//           <div className="rounded-md shadow-sm -space-y-px">
//             <div>
//               <label htmlFor="email" className="sr-only">Email address</label>
//               <input 
//                 type="email" 
//                 name="email" 
//                 value={email}
//                 onChange={onChange}
//                 required 
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
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
//               Login
//             </button>
//             <p>Don't have an account ? <a className='text-blue-600 cursor-pointer '  onClick={()=>navigate('/')} >Register</a> </p>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;
