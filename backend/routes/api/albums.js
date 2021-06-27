const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();

const { restoreUser } = require('../../utils/auth');
// require auth

const { Album } = require('../../db/models');

// get all albums
router.get('/', restoreUser, asyncHandler(async (req, res) => {
  const albums = await Album.findAll();
  // sends album to front end. need to wrap in object if we want to send more

  res.json(albums);

}));

// get all albums for current user.*req.user.id
// router.get('/', restoreUser, asyncHandler(async (req, res) => {
//   const id = req.params.id;
//   const albums = await Album.findAll();
//   // sends album to front end. need to wrap in object if we want to send more
//   res.json(albums);
// }));

// delete albums
router.delete('/:id', asyncHandler(async (req, res) => {
  const albumId = req.params.id;
  const albumToDelete = await Album.findByPk(albumId);
  albumToDelete.destroy();
  return res.json(`'${albumToDelete.title}' has been deleted.`)
}))

// add albums
router.post('/', asyncHandler(async (req, res) => {
  const { userId, title, imageUrl } = req.body;
  const newAlbum = await Album.create({ userId, title, imageUrl });

  return res.json({
    newAlbum,
  });
}),
);

// edit albums - play around
router.put('/:id', restoreUser, asyncHandler(async (req, res) => {
  const albumId = req.params.id;
  const { userId, title, imageUrl } = req.body;
  const albumToEdit = await Album.findByPk(albumId); // grabs the album
  const editedAlbum = await albumToEdit.update({ userId, title, imageUrl }) // updates album

  return res.json({ editedAlbum })
}))




module.exports = router;
