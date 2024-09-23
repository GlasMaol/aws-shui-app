const { sendResponse, sendError } = require('../../responses/index');
const { db } = require('../../services/index');

exports.handler = async (event) => {
    try {
        const result = await db.scan({ TableName: 'messages-db' });
        const messages = result.Items;

        if (messages.length === 0) {
            return sendResponse(200, { success: true, message: 'No messages.' });
        }

        return sendResponse(200, { success: true, messages: messages });
    } catch (error) {
        return sendError(500, { message: 'Internal server error', error: error.message });
    }
};
