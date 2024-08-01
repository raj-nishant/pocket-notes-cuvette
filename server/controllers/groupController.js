const Group = require('../models/groupModel');

const getGroups = async (req, res) => {
  try {
    const groups = await Group.find();
    res.json(groups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createGroup = async (req, res) => {
  const group = new Group({
    groupName: req.body.groupName,
    color: req.body.color,
  });

  try {
    const newGroup = await group.save();
    res.status(201).json(newGroup);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const addNoteToGroup = async (req, res) => {
  try {
    const group = await Group.findById(req.params.groupId);
    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    const { date, time, note } = req.body;
    group.notes.push({ date, time, note });

    const updatedGroup = await group.save();
    res.json(updatedGroup);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getGroups,
  createGroup,
  addNoteToGroup,
};
