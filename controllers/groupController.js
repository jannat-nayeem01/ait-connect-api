// group.controller.js
const Group = require('../models/Group');
const Membership = require('../models/membership');

console.log('Executing groupController.js');


exports.getGroups = async (req, res) => {
  try {
    const groups = await Group.find();
    res.status(200).json(groups);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.createGroup = async (req, res) => {

  const { name, description } = req.body;
  //console.log('Hi from creategroup', name, description);


  try {
    const newGroup = await Group.create({ name, description });
    res.status(201).json(newGroup);
  } catch (error) {
    res.status(400).json({ error: 'Bad Request' });
  }
};

exports.updateGroup = async (req, res) => {
  console.log('Hi from controller');
  const groupId = req.params.id;
  const { name, description } = req.body;

  try {
    const updatedGroup = await Group.findByIdAndUpdate(
      groupId,
      { name, description },
      { new: true } // Return the updated document
    );

    if (!updatedGroup) {
      return res.status(404).json({ error: 'Group not found' });
    }

    res.status(200).json(updatedGroup);
  } catch (error) {
    console.error('Error updating group:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteGroup = async (req, res) => {
  const groupId = req.params.id;
  console.log('Received delete request for group ID:', groupId);

  try {
    const deletedGroup = await Group.findByIdAndDelete(groupId);

    if (!deletedGroup) {
      console.log('Group not found for deletion:', groupId);
      return res.status(404).json({ error: 'Group not found' });
    }

    console.log('Deleted group:', deletedGroup);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting group:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// 

exports.joinGroup = async (req, res) => {
  const groupId = req.params.groupId;
  const userId = req.body.userId; // Read userId from the request body

  try {
    const group = await Group.findById(groupId);

    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }

    // Ensure the 'members' property exists and is an array
    if (!group.members || !Array.isArray(group.members)) {
      return res.status(500).json({ error: 'Invalid group structure' });
    }

    // Check if the user is already a member
    if (group.members.includes(userId)) {
      return res.status(400).json({ error: 'User is already a member of the group' });
    }

    // Add the user to the group members
    group.members.push(userId);
    await group.save();

    // Create a membership record
    await Membership.create({ user: userId, group: groupId });

    res.status(200).json({ message: 'Joined group successfully' });
  } catch (error) {
    console.error('Error joining group:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



exports.leaveGroup = async (req, res) => {
  const groupId = req.params.groupId;
  //const userId = req.user._id;
  const userId = this.authService.getUserId();


  try {
    const group = await Group.findById(groupId);

    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }

    if (!group.members.includes(userId)) {
      return res.status(400).json({ error: 'User is not a member of the group' });
    }

    group.members = group.members.filter(memberId => memberId.toString() !== userId.toString());
    await group.save();

    await Membership.deleteOne({ user: userId, group: groupId });

    res.status(200).json({ message: 'Left group successfully' });
  } catch (error) {
    console.error('Error leaving group:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};




