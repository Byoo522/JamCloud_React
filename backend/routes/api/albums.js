const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();

const { restoreUser } = require('../../utils/auth');
const { Album } = require('../../db/models');

// get all albums
router.get('/', asyncHandler(async (req, res) => {
  const albums = await Album.findAll();
  // sends album to front end. need to wrap in object if we want to send more
  res.json(albums);
}));

// delete albums
router.delete('/:id', asyncHandler(async (req, res) => {
  const albumId = req.params.id;
  const albumToDelete = await Album.findByPk(albumId);
  albumToDelete.destroy();
  return res.json('Your album has been deleted.')
}))

// add albums
router.post('/', asyncHandler(async (req, res) => {
  const { userId, title, imageUrl } = req.body;
  const newAlbum = await Album.create({ userId, title, imageUrl });

  return res.json({
    album,
  });
}),
);

// edit albums
router.put('/')




module.exports = router;
