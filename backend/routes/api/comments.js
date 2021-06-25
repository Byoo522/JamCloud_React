const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();

const { restoreUser } = require('../../utils/auth');
const { Comment } = require('../../db/models');

// get all comments
router.get('/', restoreUser, asyncHandler(async (req, res) => {
  const comments = await Comment.findAll();
  // sends album to front end. need to wrap in object if we want to send more
  res.json(comments);
}));

// delete comments
router.delete('/:id', asyncHandler(async (req, res) => {
  const commentId = req.params.id;
  const commentToDelete = await Comment.findByPk(commentId);
  commentToDelete.destroy();
  return res.json(`Comment has been deleted.`)
}))

// add comments
router.post('/', asyncHandler(async (req, res) => {
  const { userId, songId, body } = req.body;
  const newComment = await Comment.create({ userId, songId, body });

  return res.json({
    newComment,
  });
}),
);

// edit comments - play around
router.put('/:id', restoreUser, asyncHandler(async (req, res) => {
  const commentId = req.params.id;
  const { userId, songId, body } = req.body;
  const commentToEdit = await Comment.findByPk(commentId); // grabs the comment
  const editedComment = await commentToEdit.update({ userId, songId, body }) // updates comment
  // Method 2
  // albumToEdit.update({ userId, title, imageUrl })
  // return res.json({ albumToEdit })
  return res.json({ editedComment })
}))




module.exports = router;
