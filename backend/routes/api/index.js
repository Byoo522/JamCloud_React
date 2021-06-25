const express = require('express');
// import the routers that you create in here.
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const albumsRouter = require('./albums.js');
const songsRouter = require('./songs.js');
const commentsRouter = require('./comments.js')

// Use your router
router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/albums', albumsRouter);

router.use('/songs', songsRouter);

router.use('/comments', commentsRouter);

module.exports = router;
