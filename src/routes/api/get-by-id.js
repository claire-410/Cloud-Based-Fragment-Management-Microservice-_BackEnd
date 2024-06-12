

const {Fragment} = require('../../model/fragment');
const logger = require('../../logger');
const {createErrorResponse} = require('../../response');

module.exports = async (req, res) => {
    logger.debug(`owner id and id: ${req.user}, ${req.params.id}`);
    try {
      const fragment = await Fragment.byId(req.user, req.params.id.split('.')[0]);
      if (!fragment) {
        return res.status(404).json(createErrorResponse(404, 'No fragment with this id'));
      }
      const data = await fragment.getData();
      logger.debug('data: ' + data);
      logger.debug('fragment type in get id: ' + fragment.type);
      
      res.set('Content-Type', fragment.type);
      res.status(200).send(data);
    } catch (e) {
      logger.warn(e.message, 'Error getting fragment by id');
      res.status(500).json(createErrorResponse(500, e.message));
    }
  };