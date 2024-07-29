// src/routes/api/post.js

const { createSuccessResponse, createErrorResponse } = require('../../response');
// const express = require('express');
const { Fragment } = require('../../model/fragment');
// const contentType = require('content-type');
const API_URL = process.env.API_URL;

// const logger = require('../../logger');

module.exports = async (req, res) => {
  if (!Buffer.isBuffer(req.body)) {
    res.status(415).json(createErrorResponse(415, 'Type error'));
  } else {
    try {
      const frag = new Fragment({ ownerId: req.user, type: req.get('Content-Type') });
      await frag.save();
      await frag.setData(req.body);
      res.set('Location', API_URL + '/v1/fragments/' + frag.id);
      res.set('Content-Type', frag.type);

      res.status(201).json(
        createSuccessResponse({
          fragment: frag,
        })
      );
    } catch (error) {
      res.status(400).json(createErrorResponse(400, error));
    }
  }
};