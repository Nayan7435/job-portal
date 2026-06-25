const express = require("express");
const router = express.Router();
const { authorize, protect } = require( '../middleware/authMiddleware.js');
const { createJob, getAllJobs, applyToJob, getJobById } = require( '../controllers/jobController.js');
const { jobRoles } = require( '../utils/constant.js');

router.route('/create-job').post( protect, authorize(jobRoles.RECRUITER), createJob );
router.route('/get-all-jobs').get( getAllJobs );
router.route('/get-job-id/:id').get( getJobById );
router.route('/apply-job/:id').post( protect , authorize(jobRoles.JOBSEEKER), applyToJob );


module.exports = router;