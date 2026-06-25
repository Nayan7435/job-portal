const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Job title is required'],
            trim: true
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
        },
        company: {
            type: String,
            required: [true, 'Company name is required'],
            trim: true
        },
        location: {
            type: String,
            required: [true, 'Location is required']
        },
        salary: {
            type: Number,
            required: [true, 'Salary is required']
        },
        jobType: {
            type: String,
            enum: ['Full-time', 'Part-time', 'Internship', 'Contract'],
            default: 'Full-time'
        },
        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        applicants: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model('Job', jobSchema);