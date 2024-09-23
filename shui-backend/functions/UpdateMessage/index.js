const { sendResponse, sendError } = require('../../responses/index');
const { db } = require('../../services/index');

exports.handler = async (event) => {
    const { body, pathParameters } = event;

    if (!body) {
        return sendError(400, { message: 'No data sent.' });
    }

    let message;
    try {
        message = JSON.parse(body);

        const allowedFields = ['UserName', 'Text'];
        const invalidFields = Object.keys(message).filter(field => !allowedFields.includes(field));

        if (invalidFields.length > 0) {
            return sendError(400, { message: `Invalid fields: ${invalidFields.join(', ')}` });
        }
    } catch (error) {
        return sendError(400, { message: 'Invalid JSON format.' });
    }

    const { UserName, Text } = message;
    const messageID = pathParameters.id;

    if (!UserName || !Text) {
        return sendError(400, { message: 'Username and Text are required.' });
    }

    try {
        const messageResult = await db.get({
            TableName: 'messages-db',
            Key: { MessageID: messageID },
        });

        const existingMessage = messageResult.Item;

        if (!existingMessage) {
            return sendError(404, { message: 'Message not found, try again with correct id.' });
        }

        const originalCreatedAt = existingMessage.CreatedAt;

        const updatedCreatedAt = `${originalCreatedAt} (edited)`;

        const updatedMessage = {
            ...existingMessage,
            UserName: UserName,
            Text: Text,
            CreatedAt: updatedCreatedAt
        };

        await db.put({
            TableName: 'messages-db',
            Item: updatedMessage,
        });

        return sendResponse(200, { success: true, message: 'Message updated successfully.' });

    } catch (error) {
        return sendError(500, { message: 'Internal server error', error: error.message });
    }
};