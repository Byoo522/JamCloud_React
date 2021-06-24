const express = require('express');
// import the routers that you create in here.
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');

// Use your router
router.use('/session', sessionRouter);

router.use('/users', usersRouter);

module.exports = router;
