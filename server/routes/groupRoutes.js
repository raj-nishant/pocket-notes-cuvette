const express = require('express');
const router = express.Router();
const {
  getGroups,
  createGroup,
  addNoteToGroup,
} = require('../controllers/groupController');

router.get('/', getGroups);
router.post('/', createGroup);
router.post('/:groupId/notes', addNoteToGroup);

module.exports = router;
