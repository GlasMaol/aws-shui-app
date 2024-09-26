const { sendResponse, sendError } = require('../../responses/index');
const { db } = require('../../services/index');

exports.handler = async (event) => {
    const { body, pathParameters } = event;

    if (!body) {
        return sendError(400, { message: 'No data sent.' });
    }

    let message;
    try {
        message = JSON.parse(body).message || JSON.parse(body);


        if (!message) {
            return sendError(400, { message: "'message' field is required." });
    } catch (error) {
        return sendError(400, { message: 'Invalid JSON format.' });
    }

    const { UserName, Text } = message;

    const allowedFields = ['UserName', 'Text'];
    const invalidFields = Object.keys(message).filter(field => !allowedFields.includes(field));
    if (invalidFields.length > 0) {
        return sendError(400, { message: `Invalid field(s): ${invalidFields.join(', ')}` });
    }

    const usernameRegex = /^[a-zA-Z0-9]{4,10}$/;
    if (!usernameRegex.test(UserName)) {
        return sendError(400, { message: 'UserName must be between 4 and 10 characters and can only contain letters and numbers.' });
    }

    if (Text.length < 1 || Text.length > 150) {
        return sendError(400, { message: 'Text must be between 1 and 150 characters.' });
    }

    const messageID = pathParameters.id;

    try {
        const messageResult = await db.get({
            TableName: 'messages-db',
            Key: { MessageID: messageID },
        });
        const existingMessage = messageResult.Item;

        if (!existingMessage) {
            return sendError(404, { message: 'Message not found, try again with correct id.' });
        }

        const updatedMessage = {
            ...existingMessage,
            UserName,
            Text,

            CreatedAt: `${existingMessage.CreatedAt} - edited`
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