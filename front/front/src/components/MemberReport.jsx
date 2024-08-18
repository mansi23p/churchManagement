import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MemberReport.css';

const MemberReport = () => {
    const [members, setMembers] = useState([]);
    const [showFamily, setShowFamily] = useState({});
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get('http://localhost:8080/api/members'); // Adjust your API endpoint as needed
            setMembers(response.data);
            if (response.data.length === 0) {
                setError('No members found.');
            }
        } catch (error) {
            setError('Error fetching member data. Please try again.');
            console.error('Error fetching member data', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleFamilyDetails = (memberId) => {
        setShowFamily((prevState) => ({
            ...prevState,
            [memberId]: !prevState[memberId]
        }));
    };

    return (
        <div className="member-report-container">
            <div className="report-header">
                <h2>Members Report</h2>
            </div>
            {error && <div className="report-error">{error}</div>}
            <table className="report-table">
                <thead>
                    <tr>
                        <th>Serial No.</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Gender</th>
                        <th>Marital Status</th>
                        <th>DOB</th>
                        <th>City</th>
                        <th>Telephone No.</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {members.length > 0 ? (
                        members.map((member, index) => (
                            <React.Fragment key={index}>
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{member.firstName}</td>
                                    <td>{member.lastName}</td>
                                    <td>{member.gender}</td>
                                    <td>{member.maritalStatus}</td>
                                    <td>{new Date(member.dateOfBirth).toLocaleDateString()}</td>
                                    <td>{member.city}</td>
                                    <td>{member.telephoneNo}</td>
                                    <td>
                                        <button onClick={() => toggleFamilyDetails(member.id)}>
                                            {showFamily[member.id] ? 'Hide Family' : 'Show Family'}
                                        </button>
                                    </td>
                                </tr>
                                {showFamily[member.id] && (
                                    <tr>
                                        <td colSpan="9">
                                            <table className="family-table">
                                                <thead>
                                                    <tr>
                                                        <th>Name</th>
                                                        <th>Gender</th>
                                                        <th>Relationship</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {member.familyMembers.map((familyMember, idx) => (
                                                        <tr key={idx}>
                                                            <td>{familyMember.name}</td>
                                                            <td>{familyMember.gender}</td>
                                                            <td>{familyMember.relationship}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="9">No data available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default MemberReport;


















// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './MemberReport.css';

// const MemberReport = () => {
//   const [fromDate, setFromDate] = useState('');
//   const [toDate, setToDate] = useState('');
//   const [city, setCity] = useState('');
//   const [members, setMembers] = useState([]);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [familyMembers, setFamilyMembers] = useState({});
//   const [showFamily, setShowFamily] = useState({});

//   useEffect(() => {
//     // Fetch initial data when the component mounts
//     fetchMembers();
//   }, []);

//   const fetchMembers = async () => {
//     setLoading(true);
//     setError('');
//     try {
//       const response = await axios.get('http://localhost:8080/api/members', {
//         params: { fromDate, toDate, city }
//       });
//       setMembers(response.data);
//       if (response.data.length === 0) {
//         setError('No members found for the given criteria.');
//       }
//     } catch (error) {
//       setError('Error fetching member data. Please try again.');
//       console.error('Error fetching member data', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchFamilyMembers = async (memberId) => {
//     try {
//       const response = await axios.get(`http://localhost:8080/api/members/${memberId}/family`);
//       setFamilyMembers((prevState) => ({
//         ...prevState,
//         [memberId]: response.data
//       }));
//       setShowFamily((prevState) => ({
//         ...prevState,
//         [memberId]: !prevState[memberId]
//       }));
//     } catch (error) {
//       console.error('Error fetching family member data', error);
//     }
//   };

//   const handleSearch = () => {
//     fetchMembers();
//   };

//   return (
//     <div className="member-report-container">
//       <div className="report-header">
//         <h2>Members Report</h2>
//       </div>
//       <div className="report-filters">
//         <label>Search by City:</label>
//         <input 
//           type="text" 
//           placeholder="City" 
//           value={city} 
//           onChange={(e) => setCity(e.target.value)} 
//         />
//         <button onClick={handleSearch} disabled={loading}>
//           {loading ? 'Searching...' : 'Search'}
//         </button>
//       </div>
//       {error && <div className="report-error">{error}</div>}
//       <table className="report-table">
//         <thead>
//           <tr>
//             <th>Serial No.</th>
//             <th>First Name</th>
//             <th>Surname</th>
//             <th>Gender</th>
//             <th>Marital Status</th>
//             <th>DOB</th>
//             <th>City</th>
//             <th>Telephone No.</th>
//             <th>Family member name</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {members.length > 0 ? (
//             members.map((member, index) => (
//               <React.Fragment key={index}>
//                 <tr>
//                   <td>{index + 1}</td>
//                   <td>{member.firstName}</td>
//                   <td>{member.lastName}</td>
//                   <td>{member.gender}</td>
//                   <td>{member.maritalStatus}</td>
//                   <td>{new Date(member.dateOfBirth).toLocaleDateString()}</td>
//                   <td>{member.city}</td>
//                   <td>{member.telephoneNo}</td>
//                   <td>{familyMembers.name}</td>
//                   <td>
//                     <button onClick={() => fetchFamilyMembers(member.id)}>
//                       {showFamily[member.id] ? 'Hide Family' : 'Show Family'}
//                     </button>
//                   </td>
//                 </tr>
//                 {showFamily[member.id] && familyMembers[member.id] && (
//                   <tr>
//                     <td colSpan="9">
//                       <table className="family-table">
//                         <thead>
//                           <tr>
//                             <th>Name</th>
//                             <th>Gender</th>
//                             <th>Relationship</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {familyMembers[member.id].map((familyMember, idx) => (
//                             <tr key={idx}>
//                               <td>{familyMember.name}</td>
//                               <td>{familyMember.gender}</td>
//                               <td>{familyMember.relationship}</td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>
//                     </td>
//                   </tr>
//                 )}
//               </React.Fragment>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="9">No data available</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default MemberReport;






















// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './MemberReport.css';

// const MemberReport = () => {
//   const [fromDate, setFromDate] = useState('');
//   const [toDate, setToDate] = useState('');
//   const [city, setCity] = useState('');
//   const [members, setMembers] = useState([]);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [familyMembers, setFamilyMembers] = useState({});
// const [showFamily, setShowFamily] = useState({});


//   useEffect(() => {
//     // Fetch initial data when the component mounts
//     fetchMembers();
//   }, []);

//   const fetchMembers = async () => {
//     setLoading(true);
//     setError('');
//     try {
//       const response = await axios.get('http://localhost:8080/api/members', {
//         params: { fromDate, toDate, city }
//       });
//       setMembers(response.data);
//       if (response.data.length === 0) {
//         setError('No members found for the given criteria.');
//       }
//     } catch (error) {
//       setError('Error fetching member data. Please try again.');
//       console.error('Error fetching member data', error);
//     } finally {
//       setLoading(false);
//     }
//   };
//   const fetchFamilyMembers = async (memberId) => {
//     try {
//       const response = await axios.get(`http://localhost:8080/api/members/${memberId}/family`);
//       setFamilyMembers((prevState) => ({
//         ...prevState,
//         [memberId]: response.data
//       }));
//       setShowFamily((prevState) => ({
//         ...prevState,
//         [memberId]: true
//       }));
//     } catch (error) {
//       console.error('Error fetching family member data', error);
//     }
//   };
  

//   const handleSearch = () => {
//     fetchMembers();
//   };

//   return (
//     <div className="member-report-container">
//       <div className="report-header">
//         <h2>Members Report</h2>
//       </div>
//       <div className="report-filters">
//         {/* <label>From:</label>
//         <input 
//           type="date" 
//           value={fromDate} 
//           onChange={(e) => setFromDate(e.target.value)} 
//         />
//         <label>To:</label>
//         <input 
//           type="date" 
//           value={toDate} 
//           onChange={(e) => setToDate(e.target.value)} 
//         /> */}
//         <label>Search by City:</label>
//         <input 
//           type="text" 
//           placeholder="City" 
//           value={city} 
//           onChange={(e) => setCity(e.target.value)} 
//         />
//         <button onClick={handleSearch} disabled={loading}>
//           {loading ? 'Searching...' : 'Search'}
//         </button>
//       </div>
//       {error && <div className="report-error">{error}</div>}
//       <table className="report-table">
//   <thead>
//     <tr>
//       <th>Serial No.</th>
//       <th>First Name</th>
//       <th>Surname</th>
//       <th>Gender</th>
//       <th>Marital Status</th>
//       <th>DOB</th>
//       <th>City</th>
//       <th>Telephone No.</th>
//       <th>Action</th> {/* New Column */}
//     </tr>
//   </thead>
//   <tbody>
//     {members.length > 0 ? (
//       members.map((member, index) => (
//         <React.Fragment key={index}>
//           <tr>
//             <td>{index + 1}</td>
//             <td>{member.firstName}</td>
//             <td>{member.lastName}</td>
//             <td>{member.gender}</td>
//             <td>{member.maritalStatus}</td>
//             <td>{new Date(member.dateOfBirth).toLocaleDateString()}</td>
//             <td>{member.city}</td>
//             <td>{member.telephoneNo}</td>
//             <td>
//               <button onClick={() => fetchFamilyMembers(member.id)}>
//                 {showFamily[member.id] ? 'Hide Family' : 'Show Family'}
//               </button>
//             </td>
//           </tr>
//           {showFamily[member.id] && familyMembers[member.id] && (
//             <tr>
//               <td colSpan="9">
//                 <table className="family-table">
//                   <thead>
//                     <tr>
//                       <th>Name</th>
//                       <th>Gender</th>
//                       <th>Relationship</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {familyMembers[member.id].map((familyMember, idx) => (
//                       <tr key={idx}>
//                         <td>{familyMember.name}</td>
//                         <td>{familyMember.gender}</td>
//                         <td>{familyMember.relationship}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </td>
//             </tr>
//           )}
//         </React.Fragment>
//       ))
//     ) : (
//       <tr>
//         <td colSpan="9">No data available</td>
//       </tr>
//     )}
//   </tbody>
// </table>

//       <div className="report-actions">
//         {/* <button>Generate Report</button> */}
//         <button>Export</button>
//       </div>
//     </div>
//   );
// };

// export default MemberReport;





























// import React, { useState } from 'react';
// import axios from 'axios';
// import './MemberReport.css';

// const MemberReport = () => {
//   const [fromDate, setFromDate] = useState('');
//   const [toDate, setToDate] = useState('');
//   const [city, setCity] = useState('');
//   const [members, setMembers] = useState([]);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSearch = async () => {
//     setLoading(true);
//     setError('');
//     try {
//       const response = await axios.get('/api/members', {
//         params: { fromDate, toDate, city },
//       });
//       setMembers(response.data);
//       if (response.data.length === 0) {
//         setError('No members found for the given criteria.');
//       }
//     } catch (error) {
//       setError('Error fetching member data. Please try again.');
//       console.error('Error fetching member data', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="member-report-container">
//       <div className="report-header">
//         <h2>Members Report</h2>
//       </div>
//       <div className="report-filters">
//         <label>From:</label>
//         <input 
//           type="date" 
//           value={fromDate} 
//           onChange={(e) => setFromDate(e.target.value)} 
//         />
//         <label>To:</label>
//         <input 
//           type="date" 
//           value={toDate} 
//           onChange={(e) => setToDate(e.target.value)} 
//         />
//         <label>Search by City:</label>
//         <input 
//           type="text" 
//           placeholder="City" 
//           value={city} 
//           onChange={(e) => setCity(e.target.value)} 
//         />
//         <button onClick={handleSearch} disabled={loading}>
//           {loading ? 'Searching...' : 'Search'}
//         </button>
//       </div>
//       {error && <div className="report-error">{error}</div>}
//       <table className="report-table">
//         <thead>
//           <tr>
//             <th>Serial No.</th>
//             <th>First Name</th>
//             <th>Surname</th>
//             <th>Gender</th>
//             <th>Marital Status</th>
//             <th>DOB</th>
//             <th>City</th>
//             <th>Telephone No.</th>
//           </tr>
//         </thead>
//         <tbody>
//           {members.length > 0 ? (
//             members.map((member, index) => (
//               <tr key={index}>
//                 <td>{index + 1}</td>
//                 <td>{member.firstName}</td>
//                 <td>{member.lastName}</td>
//                 <td>{member.gender}</td>
//                 <td>{member.maritalStatus}</td>
//                 <td>{new Date(member.dateOfBirth).toLocaleDateString()}</td>
//                 <td>{member.city}</td>
//                 <td>{member.telephoneNo}</td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="8">No data available</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//       <div className="report-actions">
//         <button>Generate Report</button>
//         <button>Export</button>
//       </div>
//     </div>
//   );
// };

// export default MemberReport;
