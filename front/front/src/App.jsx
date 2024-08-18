import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Admin from './components/Admin';
import Dashboard from './components/Dashboard'; // Import Dashboard component
import MemberRegistrationForm from './components/MemberRegistrationForm';
import MemberReport from './components/MemberReport';
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/dashboard" element={<Dashboard />} /> 
          <Route path="/register-member" element={<MemberRegistrationForm />} />{/* Add this line */}
          <Route path="/report" element={<MemberReport />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;





























// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Register from './components/Register';
// import Login from './components/Login';
// import Admin from './components/Admin';

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <Routes>
//           <Route path="/" element={<Register />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/admin" element={<Admin />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;
