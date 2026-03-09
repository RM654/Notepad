const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { createNote, getNotes, getNote, updateNote, deleteNote, addCollaborator, searchNotes } = require('../controllers/noteController');

router.route('/')
  .get(protect, getNotes)
  .post(protect, createNote);

router.route('/search').get(protect, searchNotes);

router.route('/:id')
  .get(protect, getNote)
  .put(protect, updateNote)
  .delete(protect, deleteNote);

router.route('/:id/collaborators').post(protect, addCollaborator);

module.exports = router;