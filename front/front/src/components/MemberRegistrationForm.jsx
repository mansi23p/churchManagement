import React, { useState } from 'react';
import axios from 'axios';
import './memberRegistrationForm.css';

const MemberRegistration = () => {
    const [activeTab, setActiveTab] = useState('personalDetails');
    const [memberData, setMemberData] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        serialNo: '',
        gender: '',
        maritalStatus: '',
        dateOfBirth: '',
        residence: '',
        telephoneNo: '',
        city: '',
        emailAddress: '',
        occupation: '',
        employer: '',
        spouse: {
            firstName: '',
            middleName: '',
            lastName: '',
            gender: '',
            relationship: '',
            dateOfBirth: '',
        },
        familyMembers: [{ name: '', gender: '', relationship: '' }],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.startsWith('familyMember')) {
            const index = parseInt(name.split('-')[1], 10);
            const field = name.split('-')[2];

            setMemberData(prevData => {
                const newFamilyMembers = [...prevData.familyMembers];
                newFamilyMembers[index] = { ...newFamilyMembers[index], [field]: value };
                return { ...prevData, familyMembers: newFamilyMembers };
            });
        } else {
            setMemberData(prevData => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/members', memberData);
            console.log('Member added successfully', response.data);
        } catch (err) {
            console.error('Error adding member', err.response ? err.response.data : err.message);
        }
    };

    const addFamilyMemberField = () => {
        setMemberData(prevData => ({
            ...prevData,
            familyMembers: [...prevData.familyMembers, { name: '', gender: '', relationship: '' }]
        }));
    };

    return (
        <div className="member-registration">
            <h2>Member Registration</h2>
            <div className="tabs">
                <button
                    className={activeTab === 'personalDetails' ? 'active' : ''}
                    onClick={() => setActiveTab('personalDetails')}
                >
                    Member Details
                </button>
                <button
                    className={activeTab === 'familyDetails' ? 'active' : ''}
                    onClick={() => setActiveTab('familyDetails')}
                >
                    Family Details
                </button>
            </div>

            <form>
                {activeTab === 'personalDetails' && (
                    <div className="personal-details">
                        <h3>Member Details</h3>
                        <div className="row">
                            <input
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                value={memberData.firstName}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="middleName"
                                placeholder="Middle Name"
                                value={memberData.middleName}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                                value={memberData.lastName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="row">
                            <input
                                type="text"
                                name="serialNo"
                                placeholder="Serial No"
                                value={memberData.serialNo}
                                onChange={handleChange}
                            />
                            <select
                                name="gender"
                                value={memberData.gender}
                                onChange={handleChange}
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Transgender">Transgender</option>
                            </select>
                            <input
                                type="text"
                                name="maritalStatus"
                                placeholder="Marital Status"
                                value={memberData.maritalStatus}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="row">
                            <input
                                type="date"
                                name="dateOfBirth"
                                value={memberData.dateOfBirth}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="residence"
                                placeholder="Residence"
                                value={memberData.residence}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="telephoneNo"
                                placeholder="Telephone No"
                                value={memberData.telephoneNo}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="row">
                            <input
                                type="text"
                                name="city"
                                placeholder="City"
                                value={memberData.city}
                                onChange={handleChange}
                            />
                            <input
                                type="email"
                                name="emailAddress"
                                placeholder="Email Address"
                                value={memberData.emailAddress}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="occupation"
                                placeholder="Occupation"
                                value={memberData.occupation}
                                onChange={handleChange}
                            />
                        </div>
                        

                        <div className="actions">
                            <button className="save-button" type="button" onClick={handleSubmit}>
                                Save
                            </button>
                        </div>
                    </div>
                )}

                {activeTab === 'familyDetails' && (
                    <>
                        <div className="family-details">
                            <h3>Family Details</h3>
                            {memberData.familyMembers.map((member, index) => (
                                <div key={index} className="family-member-row">
                                    <input
                                        type="text"
                                        name={`familyMember-${index}-name`}
                                        placeholder="Name"
                                        value={member.name}
                                        onChange={handleChange}
                                    />
                                    <select
                                        name={`familyMember-${index}-gender`}
                                        value={member.gender}
                                        onChange={handleChange}
                                    >
                                        <option value="">Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Transgender">Transgender</option>
                                    </select>
                                    <input
                                        type="text"
                                        name={`familyMember-${index}-relationship`}
                                        placeholder="Relationship"
                                        value={member.relationship}
                                        onChange={handleChange}
                                    />
                                    {index === memberData.familyMembers.length - 1 && (
                                        <button className="add-child-button" type="button" onClick={addFamilyMemberField}>
                                            + 
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="actions">
                            <button className="save-button" type="button" onClick={handleSubmit}>
                                Save
                            </button>
                        </div>
                    </>
                )}
            </form>
        </div>
    );
};

export default MemberRegistration;





// import React, { useState } from 'react';
// import axios from 'axios';
// import './memberRegistrationForm.css'; // Ensure this CSS file is imported

// const MemberRegistration = () => {
//     const [activeTab, setActiveTab] = useState('personalDetails');
//     const [memberData, setMemberData] = useState({
//         firstName: '',
//         middleName: '',
//         lastName: '',
//         serialNo: '',
//         gender: '',
//         maritalStatus: '',
//         dateOfBirth: '',
//         residence: '',
//         telephoneNo: '',
//         city: '',
//         emailAddress: '',
//         occupation: '',
//         employer: '',
//         spouse: {
//             firstName: '',
//             middleName: '',
//             lastName: '',
//             gender: '',
//             relationship: '',
//             dateOfBirth: '',
//         },
//         familyMembers: [{ name: '', gender: '', relationship: '' }],
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;

//         if (name.startsWith('familyMember')) {
//             const index = parseInt(name.split('-')[1], 10);
//             const field = name.split('-')[2];

//             setMemberData(prevData => {
//                 const newFamilyMembers = [...prevData.familyMembers];
//                 newFamilyMembers[index] = { ...newFamilyMembers[index], [field]: value };
//                 return { ...prevData, familyMembers: newFamilyMembers };
//             });
//         } else {
//             setMemberData(prevData => ({
//                 ...prevData,
//                 [name]: value
//             }));
//         }
//     };

    

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post('http://localhost:8080/api/members', memberData);
//             console.log('Member added successfully', response.data);
//         } catch (err) {
//             console.error('Error adding member', err.response ? err.response.data : err.message);
//         }
//     };
    

//     const handleGetData = () => {
//         console.log('Get data:', memberData);
//     };

//     const addFamilyMemberField = () => {
//         setMemberData(prevData => ({
//             ...prevData,
//             familyMembers: [...prevData.familyMembers, { name: '', gender: '', relationship: '' }]
//         }));
//     };

//     return (
//         <div className="member-registration">
//             <h2>Member Registration</h2>
//             <div className="tabs">
//                 <button
//                     className={activeTab === 'personalDetails' ? 'active' : ''}
//                     onClick={() => setActiveTab('personalDetails')}
//                 >
//                     Member Details
//                 </button>
//                 <button
//                     className={activeTab === 'familyDetails' ? 'active' : ''}
//                     onClick={() => setActiveTab('familyDetails')}
//                 >
//                     Family Details
//                 </button>
//             </div>

//             <form>
//                 {activeTab === 'personalDetails' && (
//                     <div className="personal-details">
//                         <h3>Member Details</h3>
//                         <div>
//                             <input
//                                 type="text"
//                                 name="firstName"
//                                 placeholder="First Name"
//                                 value={memberData.firstName}
//                                 onChange={handleChange}
//                             />
//                         </div>
//                         <div>
//                             <input
//                                 type="text"
//                                 name="middleName"
//                                 placeholder="Middle Name"
//                                 value={memberData.middleName}
//                                 onChange={handleChange}
//                             />
//                         </div>
//                         <div>
//                             <input
//                                 type="text"
//                                 name="lastName"
//                                 placeholder="Last Name"
//                                 value={memberData.lastName}
//                                 onChange={handleChange}
//                             />
//                         </div>
//                         <div>
//                             <input
//                                 type="text"
//                                 name="serialNo"
//                                 placeholder="Serial No"
//                                 value={memberData.serialNo}
//                                 onChange={handleChange}
//                             />
//                         </div>
//                         <div>
//                             <select
//                                 name="gender"
//                                 value={memberData.gender}
//                                 onChange={handleChange}
//                             >
//                                 <option value="">Select Gender</option>
//                                 <option value="Male">Male</option>
//                                 <option value="Female">Female</option>
//                                 <option value="Transgender">Transgender</option>
//                             </select>
//                         </div>
//                         <div>
//                             <input
//                                 type="text"
//                                 name="maritalStatus"
//                                 placeholder="Marital Status"
//                                 value={memberData.maritalStatus}
//                                 onChange={handleChange}
//                             />
//                         </div>
//                         <div>
//                             <input
//                                 type="date"
//                                 name="dateOfBirth"
//                                 placeholder="Date of Birth"
//                                 value={memberData.dateOfBirth}
//                                 onChange={handleChange}
//                             />
//                         </div>
//                         <div>
//                             <input
//                                 type="text"
//                                 name="residence"
//                                 placeholder="Residence"
//                                 value={memberData.residence}
//                                 onChange={handleChange}
//                             />
//                         </div>
//                         <div>
//                             <input
//                                 type="text"
//                                 name="telephoneNo"
//                                 placeholder="Telephone No"
//                                 value={memberData.telephoneNo}
//                                 onChange={handleChange}
//                             />
//                         </div>
//                         <div>
//                             <input
//                                 type="text"
//                                 name="city"
//                                 placeholder="City"
//                                 value={memberData.city}
//                                 onChange={handleChange}
//                             />
//                         </div>
//                         <div>
//                             <input
//                                 type="email"
//                                 name="emailAddress"
//                                 placeholder="Email Address"
//                                 value={memberData.emailAddress}
//                                 onChange={handleChange}
//                             />
//                         </div>
//                         <div>
//                             <input
//                                 type="text"
//                                 name="occupation"
//                                 placeholder="Occupation"
//                                 value={memberData.occupation}
//                                 onChange={handleChange}
//                             />
//                         </div>
//                         <div>
//                             <input
//                                 type="text"
//                                 name="employer"
//                                 placeholder="Employer"
//                                 value={memberData.employer}
//                                 onChange={handleChange}
//                             />
//                         </div>

//                         {/* Save and Get Data Buttons */}
//                         <div className="actions">
//                             <button className="save-button" type="button" onClick={handleSubmit}>
//                                 Save
//                             </button>
//                             {/* <button className="get-data-button" type="button" onClick={handleGetData}>
//                                 Get Data
//                             </button> */}
//                         </div>
//                     </div>
//                 )}

//                 {activeTab === 'familyDetails' && (
//                     <>
//                         <div className="family-details">
//                             <h3>Family Details</h3>
//                             {memberData.familyMembers.map((member, index) => (
//                                 <div key={index} className="family-member-row">
//                                     <input
//                                         type="text"
//                                         name={`familyMember-${index}-name`}
//                                         placeholder="Name"
//                                         value={member.name}
//                                         onChange={handleChange}
//                                     />
//                                     <select
//                                         name={`familyMember-${index}-gender`}
//                                         value={member.gender}
//                                         onChange={handleChange}
//                                     >
//                                         <option value="">Gender</option>
//                                         <option value="Male">Male</option>
//                                         <option value="Female">Female</option>
//                                         <option value="Transgender">Transgender</option>
//                                     </select>
//                                     <input
//                                         type="text"
//                                         name={`familyMember-${index}-relationship`}
//                                         placeholder="Relationship"
//                                         value={member.relationship}
//                                         onChange={handleChange}
//                                     />
//                                     {index === memberData.familyMembers.length - 1 && (
//                                         <button className="add-child-button" type="button" onClick={addFamilyMemberField}>
//                                             + Add
//                                         </button>
//                                     )}
//                                 </div>
//                             ))}
//                         </div>

//                         <div className="actions">
//                             <button className="save-button" type="button" onClick={handleSubmit}>
//                                 Save
//                             </button>
//                             {/* <button className="get-data-button" type="button" onClick={handleGetData}>
//                                 Get Data
//                             </button> */}
//                         </div>
//                     </>
//                 )}
//             </form>
//         </div>
//     );
// };

// export default MemberRegistration;


