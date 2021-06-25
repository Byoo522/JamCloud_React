const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();

const { restoreUser } = require('../../utils/auth');
const { Song } = require('../../db/models');

// get all songs
router.get('/', restoreUser, asyncHandler(async (req, res) => {
  const songs = await Song.findAll();
  // sends album to front end. need to wrap in object if we want to send more
  res.json(songs);
}));

// delete songs
router.delete('/:id', asyncHandler(async (req, res) => {
  const songId = req.params.id;
  const songToDelete = await Song.findByPk(songId);
  songToDelete.destroy();
  return res.json(`'${songToDelete.title}' has been deleted.`)
}))

// add song
router.post('/', asyncHandler(async (req, res) => {
  const { userId, albumId, url, title } = req.body;
  const newSong = await Song.create({ userId, albumId, url, title });

  return res.json({
    newSong,
  });
}),
);

// edit songs - play around
router.put('/:id', restoreUser, asyncHandler(async (req, res) => {
  const songId = req.params.id;
  const { userId, albumId, url, title } = req.body;
  const songToEdit = await Song.findByPk(songId); // grabs the album
  const editedSong = await songToEdit.update({ userId, albumId, url, title }) // updates album
  // Method 2
  // albumToEdit.update({ userId, title, imageUrl })
  // return res.json({ albumToEdit })
  return res.json({ editedSong })
}))




module.exports = router;
