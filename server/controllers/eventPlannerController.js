const bcrypt = require('bcryptjs');
const User = require('../models/User');
const EventPlannerProfile = require('../models/EventPlannerProfile');
const { uploadProfilePhoto } = require('../utils/supabaseUpload');


// ======================================================
// GET ALL EVENT PLANNERS
// ======================================================

const getEventPlanners = async (req, res) => {
  try {
    const eventPlanners = await User.find({
      role: 'event_planner'
    })
      .select('-password')
      .sort({ createdAt: -1 });

    const plannersWithProfiles = await Promise.all(
      eventPlanners.map(async (planner) => {
        const profile = await EventPlannerProfile.findOne({
          user: planner._id
        });

        return {
          _id: planner._id,
          fullName: planner.fullName,
          email: planner.email,
          profilePhoto: profile?.profilePhoto || null,
          qualifications: profile?.qualifications || [],
          isActive: profile?.isActive ?? true,
          createdAt: planner.createdAt
        };
      })
    );

    return res.status(200).json({
      success: true,
      count: plannersWithProfiles.length,
      eventPlanners: plannersWithProfiles
    });

  } catch (error) {
    console.error('Get event planners error:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to fetch event planners'
    });
  }
};


// ======================================================
// CREATE EVENT PLANNER DIRECTLY BY ADMIN
// ======================================================

const createEventPlanner = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      qualifications
    } = req.body;


    // -----------------------------------------------
    // 1. Validate required fields
    // -----------------------------------------------

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all required fields.'
      });
    }


    // -----------------------------------------------
    // 2. Validate passwords
    // -----------------------------------------------

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Passwords do not match.'
      });
    }


    // -----------------------------------------------
    // 3. Validate profile photo
    // -----------------------------------------------

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Profile photo is required.'
      });
    }


    // -----------------------------------------------
    // 4. Check whether email already exists
    // -----------------------------------------------

    const existingUser = await User.findOne({
      email: email.trim().toLowerCase()
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'A user with this email address already exists.'
      });
    }


    // -----------------------------------------------
    // 5. Hash password
    // -----------------------------------------------

    const hashedPassword = await bcrypt.hash(password, 12);


    // -----------------------------------------------
    // 6. Upload profile photo to Supabase
    // -----------------------------------------------

    const profilePhotoUrl = await uploadProfilePhoto(req.file);


    // -----------------------------------------------
    // 7. Create User
    // -----------------------------------------------

    const user = await User.create({
      fullName: `${firstName.trim()} ${lastName.trim()}`,
      email: email.trim().toLowerCase(),
      password: hashedPassword,
      role: 'event_planner'
    });


    // -----------------------------------------------
    // 8. Create Event Planner Profile
    // -----------------------------------------------

    const qualificationsArray = qualifications
      ? qualifications
          .split(',')
          .map((item) => item.trim())
          .filter(Boolean)
      : [];


    const profile = await EventPlannerProfile.create({
      user: user._id,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      profilePhoto: profilePhotoUrl,
      qualifications: qualificationsArray,
      isActive: true
    });


    // -----------------------------------------------
    // 9. Return success
    // -----------------------------------------------

    return res.status(201).json({
      success: true,
      message: 'Event planner created successfully.',
      eventPlanner: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        profile: {
          firstName: profile.firstName,
          lastName: profile.lastName,
          profilePhoto: profile.profilePhoto,
          qualifications: profile.qualifications,
          isActive: profile.isActive
        }
      }
    });

  } catch (error) {

    console.error('Create event planner error:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to create event planner.'
    });
  }
};


// ======================================================
// DEACTIVATE EVENT PLANNER
// ======================================================

const deactivateEventPlanner = async (req, res) => {
  try {

    // Get planner ID from URL
    const { id } = req.params;


    // -----------------------------------------------
    // 1. Find the Event Planner User
    // -----------------------------------------------

    const planner = await User.findOne({
      _id: id,
      role: 'event_planner'
    });

    if (!planner) {
      return res.status(404).json({
        success: false,
        message: 'Event planner not found.'
      });
    }


    // -----------------------------------------------
    // 2. Find Event Planner Profile
    // -----------------------------------------------

    const profile = await EventPlannerProfile.findOne({
      user: planner._id
    });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Event planner profile not found.'
      });
    }


    // -----------------------------------------------
    // 3. Deactivate Planner
    // -----------------------------------------------

    profile.isActive = false;

    await profile.save();


    // -----------------------------------------------
    // 4. Return Success
    // -----------------------------------------------

    return res.status(200).json({
      success: true,
      message: 'Event planner deactivated successfully.'
    });

  } catch (error) {

    console.error(
      'Deactivate event planner error:',
      error
    );

    return res.status(500).json({
      success: false,
      message: 'Failed to deactivate event planner.'
    });
  }
};


// ======================================================
// EXPORT CONTROLLERS
// ======================================================

module.exports = {
  getEventPlanners,
  createEventPlanner,
  deactivateEventPlanner
};