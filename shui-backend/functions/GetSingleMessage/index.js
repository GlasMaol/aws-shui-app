const { sendResponse, sendError } = require('../../responses/index');
const { db } = require('../../services/index');

exports.handler = async (event) => {
    const { pathParameters } = event;

    const MessageID = pathParameters.id;

    if (!MessageID || typeof MessageID !== 'string') {
        return sendError(400, { message: 'Invalid MessageID provided. Please ensure it is a valid string.' });
    }

    try {

        const messageResult = await db.get({
            TableName: 'messages-db',
            Key: {
                'MessageID': MessageID
            }
        });

        const message = messageResult.Item;

        if (!message) {
            return sendError(404, { message: 'Message not found. Please check the ID and try again.' });
        }
        const allowedFields = ['MessageID', 'Text', 'UserName', 'CreatedAt'];
        const invalidFields = Object.keys(message).filter(field => !allowedFields.includes(field));

        if (invalidFields.length > 0) {
            return sendError(400, { message: `Invalid fields detected: ${invalidFields.join(', ')}` });
        }

        return sendResponse(200, { success: true, message: 'Message fetched successfully!', messageDetails: message });

    } catch (error) {
        console.log("Error accessing DynamoDB:", error)
        return sendError(500, { message: 'Internal server error', error: error.message });
    }
};