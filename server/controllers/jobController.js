const Job = require("../models/Job.js");

// @desc    Create a new job (Recruiter only)
// @route   POST /api/jobs
exports.createJob = async (req, res) => {
  try {
    const { title, description, company, location, salary, jobType } = req.body;

    const job = await Job.create({
      title,
      description,
      company,
      location,
      salary,
      jobType,
      postedBy: req.user._id,
    });

    res.status(201).json({
      message: "Job Posted Sucessfully",
      job,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

// @desc    Get all jobs (public)
// @route   GET /api/jobs
exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find()
      .populate("postedBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

// @desc    Get single job by ID
// @route   GET /api/jobs/:id
exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate(
      "postedBy",
      "name email",
    );

    if (!job) {
      return res.status(404).json({ message: "Job not Found" });
    }

    res.status(200).json({ job });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// @desc    Apply to a job (Job seeker only)
// @route   POST /api/jobs/:id/apply
exports.applyToJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    if (job.applicants.includes(req.user._id)) {
      return res.status(400).json({
        message: "You already have applied to this job",
      });
    }

    job.applicants.push(req.user._id);
    await job.save();

    res.status(200).json({
      message: "Applied Sucessfully",
      job,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};