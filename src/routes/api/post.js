// src/routes/api/post.js

const {createSuccessResponse, createErrorResponse} = require('../../response');
const {Fragment} = require('../../model/fragment');
const logger = require('../../logger');

const API_URL = process.env.API_URL;

module.exports = async (req, res)=>{
    logger.debug('Post: ' + req.body);

    if(!Buffer.isBuffer(req.body)) {
        return res.status(415).json(createErrorResponse(400, 'The media type is not supported.'));
    }

    try {
        const fragment = new Fragment({ ownerId: req.user, type: req.get('Content-Type') });
        await fragment.save();
        await fragment.setData(req.body);
    
        logger.debug('New fragment created: ' + JSON.stringify(fragment));
    
        res.set('Content-Type', fragment.type);
       // res.set('Location', `${process.env.API_URL}/v1/fragments/${fragment.id}`);
        res.set('Location', API_URL + '/v1/fragments/' + fragment.id);
        res.status(201).json(
          createSuccessResponse({
            fragment: fragment,
          })
        );
      } catch (err) {
        res.status(500).json(createErrorResponse(500, err));
    }
};







