const job = require("../models/Job");

// @desc    Create a new job (Recruiter only)
// @route   POST /api/jobs
exports.creatJob = async (req, res) => {
  try {
    const { title, description, company, location, salary, jobType } = req.body;

    const job = await Job.create({
      title,
      description,
      company,
      location,
      salary,
      jobType,
      postedBy: req.body._id,
    });

    res.status(201).json({
      message: "Job Posted Sucessfully",
      job,
    });

  } catch (error) {
    res.json(500).json({
        message: 'Server Error', error: error.message
    });
  }
};

// @desc    Get all jobs (public)
// @route   GET /api/jobs
exports.getAllJobs = async (req,res) => {
    try {
        const jobs = await Job.find()
        .populate('postedBy', 'name email')
        .sort({ createdAt: -1 });

        res.status(200).json({
            count: jobs.length,
            jobs,
        });

    } catch (error) {
        res.status(500).json({
            message: 'Sever Error', error: error.message
        });
    }
};

// @desc    Get single job by ID
// @route   GET /api/jobs/:id
exports.getJobById = async (req,res) => {
    try {
        const job = await Job.findById(req.params.id).populate('postedBy', 'nanme email');

        if(!job){
            return res.status(404).json({ message: 'Job not Found' });
        }

        res.status(200).json({ job });

    } catch (error) {
        res.status(500).json({
            message: 'Server error', error: error.message
        });
    }
}