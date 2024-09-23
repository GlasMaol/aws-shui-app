const { sendResponse, sendError } = require('../../responses/index');
const { db } = require('../../services/index');

exports.handler = async (event) => {
  try {
    const data = await db.scan({
      TableName: 'messages-db'
    })
    return sendResponse(200, { data: data.Items })
  } catch (error) {
    return sendError(404, { message: error.message });
  }
};
