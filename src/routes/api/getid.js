const { createErrorResponse } = require('../../response');
const { Fragment } = require('../../model/fragment');
var md = require('markdown-it')();
var path = require('path');

module.exports = async (req, res) => {
  let fragment;
  let data;
  try {
    switch (path.extname(req.params.id)) {
      case '.html':
        try {
          const fragment = await Fragment.byId(
            req.user,
            path.basename(req.params.id, path.extname(req.params.id))
          );
          data = await fragment.getData();
          data = md.render(data.toString());
          res.setHeader('Content-Type', 'text/html');
        // eslint-disable-next-line no-unused-vars
        } catch (error) {
          res.status(415).json(createErrorResponse('Unsupported type or conversion'));
        }
        break;
      case '':
        fragment = new Fragment(await Fragment.byId(req.user, req.params.id));
        data = await fragment.getData();
        res.setHeader('Content-Type', fragment.type);
        break;
      default:
        res.status(415).json(createErrorResponse('Unsupported type'));
    }
    return res.status(200).send(data);
  // eslint-disable-next-line no-unused-vars
  } catch (error) {
    return res.status(404).json(createErrorResponse('Fragment not found'));
  }
};