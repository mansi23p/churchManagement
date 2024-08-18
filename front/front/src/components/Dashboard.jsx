import React from 'react';
import { useNavigate } from 'react-router-dom';
import './dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleRegistrationClick = () => {
    navigate('/register-member');
  };

  const handleReportClick = () => {
    navigate('/report');
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="user-info">
          <img src="src/church3.jpeg" alt="User" className="user-avatar" />
          <span className="user-name">Church Name</span>
        </div>
        
        <nav className="menu">
          <ul>
            <li onClick={handleRegistrationClick}><i className="fas fa-user-plus"></i> Member Registration</li>
            <li><i className="fas fa-bell"></i> Inform</li>
            <li onClick={handleReportClick}><i className="fas fa-chart-pie"></i> Report</li>
            <li><i className="fas fa-file-invoice"></i> Statement</li>
          </ul>
        </nav>
      </aside>
      <main className="main-content">
        <header className="header">
          <div className="header-title">Church</div>
          <div className="header-date">Monday, 05 Jan</div>
        </header>
        <div className="content">
          <div className="card" onClick={handleRegistrationClick}>
            <i className="fas fa-user-plus"></i>
            <span>Member Registration</span>
          </div>
          <div className="card">
            <i className="fas fa-bell"></i>
            <span>Inform</span>
          </div>
          <div className="card" onClick={handleReportClick}>
            <i className="fas fa-chart-pie"></i>
            <span>Report</span>
          </div>
          <div className="card">
            <i className="fas fa-file-invoice"></i>
            <span>Statement</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;


























// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import './dashboard.css';

// const Dashboard = () => {
//   const navigate = useNavigate();

//   const handleRegistrationClick = () => {
//     navigate('/register-member');
//   };

//   return (
//     <div className="dashboard-container">
//       <aside className="sidebar">
//         <div className="user-info">
//           <img src="src/church3.jpeg" alt="User" className="user-avatar" />
//           <span className="user-name">Church Name</span>
//         </div>
        
//         <nav className="menu">
//           <ul>
//             <li onClick={handleRegistrationClick}><i className="fas fa-user-plus"></i> Member Registration</li>
//             <li><i className="fas fa-bell"></i> Inform</li>
//             <li><i className="fas fa-chart-pie"></i> Report</li>
//             <li><i className="fas fa-file-invoice"></i> Statement</li>
//           </ul>
//         </nav>
//       </aside>
//       <main className="main-content">
//         <header className="header">
//           <div className="header-title">Church</div>
//           <div className="header-date">Monday, 05 Jan</div>
//         </header>
//         <div className="content">
//           <div className="card" onClick={handleRegistrationClick}>
//             <i className="fas fa-user-plus"></i>
//             <span>Member Registration</span>
//           </div>
//           <div className="card">
//             <i className="fas fa-bell"></i>
//             <span>Inform</span>
//           </div>
//           <div className="card">
//             <i className="fas fa-chart-pie"></i>
//             <span>Report</span>
//           </div>
//           <div className="card">
//             <i className="fas fa-file-invoice"></i>
//             <span>Statement</span>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Dashboard;







// import React from 'react';
// import './dashboard.css';

// const Dashboard = () => {
//   return (
//     <div className="dashboard-container">
//       <aside className="sidebar">
//         <div className="user-info">
//           {/* <img src="https://via.placeholder.com/150" alt="User" className="user-avatar" /> */}
//           <img src="src/church3.jpeg" alt="User" className="user-avatar" />

//           <span className="user-name">Church Name</span>
//         </div>
        
//         <nav className="menu">
//           <ul>
//             <li><i className="fas fa-users"></i> Members</li>
//             <li><i className="fas fa-dollar-sign"></i> Financials</li>
//             <li><i className="fas fa-file-alt"></i> Records</li>
//             <li><i className="fas fa-chart-bar"></i> Reports</li>
//             <li><i className="fas fa-pray"></i> Thanks Giving</li>
//             <li><i className="fas fa-church"></i> Find Church</li>
//             <li><i className="fas fa-question-circle"></i> Help & Support</li>
//             <li><i className="fas fa-cog"></i> Setting</li>
//             <li><i className="fas fa-sign-out-alt"></i> Logout</li>
//           </ul>
//         </nav>
//       </aside>
//       <main className="main-content">
//         <header className="header">
//           <div className="header-title">Church</div>
//           <div className="header-date">Monday, 05 Jan</div>
//         </header>
//         <div className="content">
//           <div className="card">
//             <i className="fas fa-user-plus"></i>
//             <span>Member Registration</span>
//           </div>
//           <div className="card">
//             <i className="fas fa-bell"></i>
//             <span>Inform</span>
//           </div>
//           <div className="card">
//             <i className="fas fa-chart-pie"></i>
//             <span>Report</span>
//           </div>
//           <div className="card">
//             <i className="fas fa-file-invoice"></i>
//             <span>Statement</span>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Dashboard;
