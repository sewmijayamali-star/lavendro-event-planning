const User = require('../models/User');
const EventPlannerProfile = require('../models/EventPlannerProfile');

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

module.exports = {
  getEventPlanners
};