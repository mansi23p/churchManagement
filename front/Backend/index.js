const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const User = require('./models/user'); // User model
const Member = require('./models/member'); // Member model

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/sample', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// JWT secret key
const secretKey = 'your_secret_key';

function generateToken(userId) {
  const payload = { userId };
  const options = { expiresIn: '1h' };
  return jwt.sign(payload, secretKey, options);
}

// POST route to save member data
app.post('/api/members', async (req, res) => {
  const memberData = req.body;

  try {
    const member = new Member(memberData);
    await member.save();
    res.status(200).send('Member saved successfully');
  } catch (err) {
    console.error('Error saving member:', err);
    res.status(500).send('Error saving member');
  }
});

// ------------------- Existing User CRUD Functionality -------------------

// Create User
app.post('/create', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = new User({ username, email, password });
    await user.save();
    res.send('User added...');
  } catch (err) {
    console.error('Error adding user:', err);
    res.status(500).send('Server error');
  }
});

// User Login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (user) {
      const token = generateToken(user._id);
      res.status(200).json({ token });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Read all Users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).send('Server error');
  }
});

// Read one User
app.get('/user/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).send('User not found');
    }
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).send('Server error');
  }
});

// Update User
app.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { username, email, password } = req.body;
  try {
    await User.findByIdAndUpdate(id, { username, email, password });
    res.send('User updated...');
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).send('Server error');
  }
});

// Delete User
app.delete('/delete/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.send('User deleted...');
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).send('Server error');
  }
});

// Member search route
app.get('/api/members', async (req, res) => {
  const { fromDate, toDate, city } = req.query;

  const query = {};
  if (fromDate) {
    query.dateOfBirth = { $gte: new Date(fromDate) };
  }
  if (toDate) {
    query.dateOfBirth = { ...query.dateOfBirth, $lte: new Date(toDate) };
  }
  if (city) {
    query.city = new RegExp(city, 'i'); // case-insensitive search
  }

  try {
    const members = await Member.find(query); // Correct model reference: Member
    res.json(members);
  } catch (error) {
    console.error('Error fetching members:', error);
    res.status(500).json({ error: 'Error fetching members' });
  }
});

// app.get('/api/members/:memberId/family', (req, res) => {
//   const { memberId } = req.params;
//   // Fetch family members from the database based on the memberId
//   const familyMembers = database.getFamilyMembersByMemberId(memberId);
//   res.json(familyMembers);
// });

app.get('/api/members/:memberId/family', async (req, res) => {
  const { memberId } = req.params;
  try {
    const member = await Member.findById(memberId).populate('familyMembers'); // Assuming familyMembers is a subdocument or related collection
    if (!member) {
      return res.status(404).send('Member not found');
    }
    res.json(member.familyMembers); // Adjust this based on your schema
  } catch (error) {
    console.error('Error fetching family members:', error);
    res.status(500).send('Error fetching family members');
  }
});



app.listen(8080, () => {
  console.log('Server is listening on port 8080');
});

















// const express = require('express');
// const mongoose = require('mongoose');
// const path = require('path');
// const User = require('./models/user');
// const jwt = require('jsonwebtoken');
// //const methodOverride = require('method-override');
// const cors = require('cors');

// const app = express();

// // Middleware
// app.use(express.json());
// app.use(cors());
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.urlencoded({ extended: true }));
// //app.use(methodOverride('_method'));

// // MongoDB connection
// mongoose.connect('mongodb://127.0.0.1:27017/sample')
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error('MongoDB connection error:', err));

// // JWT secret key
// const secretKey = 'your_secret_key';

// function generateToken(userId) {
//   const payload = { userId };
//   const options = { expiresIn: '1h' };
//   return jwt.sign(payload, secretKey, options);
// }

// // Create
// app.post('/create', async (req, res) => {
//   const { username, email, password } = req.body;
//   try {
//     const user = new User({ username, email, password });
//     await user.save();
//     res.send('User added...');
//   } catch (err) {
//     console.error('Error adding user:', err);
//     res.status(500).send('Server error');
//   }
// });

// // Login
// app.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email, password });
//     if (user) {
//       const token = generateToken(user._id);
//       res.status(200).json({ token });
//     } else {
//       res.status(401).json({ error: 'Invalid credentials' });
//     }
//   } catch (err) {
//     console.error('Error during login:', err);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// // Read all users
// app.get('/users', async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (err) {
//     console.error('Error fetching users:', err);
//     res.status(500).send('Server error');
//   }
// });

// // Read one user
// app.get('/user/:id', async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (user) {
//       res.json(user);
//     } else {
//       res.status(404).send('User not found');
//     }
//   } catch (err) {
//     console.error('Error fetching user:', err);
//     res.status(500).send('Server error');
//   }
// });

// // Update
// app.put('/update/:id', async (req, res) => {
//   const { id } = req.params;
//   const { username, email, password } = req.body;
//   try {
//     await User.findByIdAndUpdate(id, { username, email, password });
//     res.send('User updated...');
//   } catch (err) {
//     console.error('Error updating user:', err);
//     res.status(500).send('Server error');
//   }
// });

// // Delete
// app.delete('/delete/:id', async (req, res) => {
//   try {
//     await User.findByIdAndDelete(req.params.id);
//     res.send('User deleted...');
//   } catch (err) {
//     console.error('Error deleting user:', err);
//     res.status(500).send('Server error');
//   }
// });

// app.listen(8080, () => {
//   console.log('Server is listening on port 8080');
// });


































/*const express = require('express');
const app = express();
const mysql=require('mysql2');
const jwt = require('jsonwebtoken');
app.use(express.json());
const cors = require('cors');
app.use(cors());



const connection =mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'sample',
    password:'niki123'
  });

  // Create
app.post('/create', (req, res) => {
  const { username, email, password } = req.body;
  const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?,?)';
  connection.query(sql, [username, email, password], (err, result) => {
      if (err) throw err;
      res.send('User added...');
  });
});



// Replace with your actual secret key (keep it secure and do not hardcode it)
const secretKey = 'your_secret_key';

function generateToken(userId) {
  // JWT payload (you can add more data as needed)
  const payload = {
    userId: userId
  };

  // JWT options
  const options = {
    expiresIn: '1h' // Token expiration time
  };

  // Generate JWT token
  const token = jwt.sign(payload, secretKey, options);

  return token;
}



app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
    
    try {
      connection.query(sql, [email, password], (err, results) => {
        if (err) {
          console.error('Error querying database:', err);
          res.status(500).json({ error: 'Database error' });
          return;
        }
        
        if (results.length > 0) {
          // Assuming you have a token generation mechanism, for example using JWT
          const token = generateToken(results[0].id); // Replace with your token generation function
          
          res.status(200).json({ token });
        } else {
          res.status(401).json({ error: 'Invalid credentials' });
        }
      });
    } catch (err) {
      console.error('Exception during login:', err);
      res.status(500).json({ error: 'Server error' });
    }
  });

// Read all
app.get('/users', (req, res) => {
  const sql = 'SELECT * FROM users';
  connection.query(sql, (err, results) => {
      if (err) throw err;
      res.json(results);
  });
});

// Read one
app.get('/user/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM users WHERE id = ?';
  connection.query(sql, [id], (err, result) => {
      if (err) throw err;
      res.json(result);
  });
});

// Update
app.put('/update/:id', (req, res) => {
  const { id } = req.params;
  const { username, email, password } = req.body;
  const sql = 'UPDATE users SET username = ?, email = ? WHERE password = ?';
  connection.query(sql, [username, email, password], (err, result) => {
      if (err) throw err;
      res.send('User updated...');
  });
});

// Delete
app.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM users WHERE id = ?';
  connection.query(sql, [id], (err, result) => {
      if (err) throw err;
      res.send('User deleted...');
  });
});


  

app.listen(8080,()=>{
    console.log("server is listening on port 8080");
    
});*/



