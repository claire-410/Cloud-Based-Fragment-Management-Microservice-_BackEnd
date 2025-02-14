// src/routes/api/delete.js


const { createSuccessResponse, createErrorResponse } = require('../../response');

const { Fragment } = require('../../model/fragment');

module.exports = async (req, res) => {
  try {
    await Fragment.delete(req.user, req.params.id);
  // eslint-disable-next-line no-unused-vars
  } catch (error) {
    return res.status(404).json(createErrorResponse('Fragments not found'));
  }
  return res.status(200).json(createSuccessResponse());
};

