const { createSuccessResponse, createErrorResponse } = require('../../response');
const { Fragment } = require('../../model/fragment');

module.exports = async (req, res) => {
  try {
    const fragment = await Fragment.byId(req.user, req.params.id);
    res.set('Content-Type', fragment.type);
    return res.status(200).json(createSuccessResponse({ fragment }));
  // eslint-disable-next-line no-unused-vars
  } catch (error) {
    res.status(404).json(createErrorResponse('Fragment not found'));
  }
};

