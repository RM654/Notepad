const Note = require('../models/Note');
const User = require('../models/User');

// Create note
const createNote = async (req, res) => {
  const { title, content } = req.body;
  const note = await Note.create({ title, content, owner: req.user._id });
  res.status(201).json(note);
};

// Get all notes (owned + collaborated)
const getNotes = async (req, res) => {
  const notes = await Note.find({
    $or: [{ owner: req.user._id }, { collaborators: req.user._id }]
  }).populate('owner', 'name email').populate('collaborators', 'name email');
  res.json(notes);
};

// Get single note
const getNote = async (req, res) => {
  const note = await Note.findById(req.params.id).populate('owner', 'name email').populate('collaborators', 'name email');
  if (!note) return res.status(404).json({ message: 'Note not found' });
  if (!note.owner._id.equals(req.user._id) && !note.collaborators.some(c => c._id.equals(req.user._id))) {
    return res.status(403).json({ message: 'Not authorized' });
  }
  res.json(note);
};

// Update note
const updateNote = async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (!note) return res.status(404).json({ message: 'Note not found' });
  if (!note.owner.equals(req.user._id) && !note.collaborators.includes(req.user._id)) {
    return res.status(403).json({ message: 'Not authorized' });
  }
  note.title = req.body.title || note.title;
  note.content = req.body.content || note.content;
  await note.save();
  res.json(note);
};

// Delete note
const deleteNote = async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (!note) return res.status(404).json({ message: 'Note not found' });
  if (!note.owner.equals(req.user._id)) return res.status(403).json({ message: 'Not authorized' });
  await note.deleteOne();
  res.json({ message: 'Note removed' });
};

// Add collaborator
const addCollaborator = async (req, res) => {
  const { email } = req.body;
  const note = await Note.findById(req.params.id);
  if (!note) return res.status(404).json({ message: 'Note not found' });
  if (!note.owner.equals(req.user._id)) return res.status(403).json({ message: 'Only owner can add collaborators' });

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'User not found' });
  if (!note.collaborators.includes(user._id)) note.collaborators.push(user._id);

  await note.save();
  await note.populate('collaborators', 'name email');
  res.json(note);
};

// Search notes
const searchNotes = async (req, res) => {
  const { query } = req.query;
  const notes = await Note.find({
    $text: { $search: query },
    $or: [{ owner: req.user._id }, { collaborators: req.user._id }]
  }).populate('owner', 'name email').populate('collaborators', 'name email');
  res.json(notes);
};

module.exports = { createNote, getNotes, getNote, updateNote, deleteNote, addCollaborator, searchNotes };