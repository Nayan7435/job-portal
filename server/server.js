require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes.js');
const aiRoutes = require('./routes/aiRoutes.js');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get('/', (req,res) => {
    res.send('Job Portal API is running...');
});

app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/ai', aiRoutes);

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});