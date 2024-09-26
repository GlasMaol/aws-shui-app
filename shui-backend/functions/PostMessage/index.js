const { sendResponse, sendError } = require('../../responses/index');
const { db } = require('../../services/index');
const { v4: uuid } = require('uuid');

exports.handler = async (event) => {
    if (!event.body) {
        return sendError(400, { message: 'No data sent.' });
    }

    let body;
    try {
        body = JSON.parse(event.body);
    } catch (error) {
        return sendError(400, { message: 'Invalid JSON format.' });
    }

    if (!body.message) {
        return sendError(400, { message: "'message' field is required." });
    }

    const { UserName, Text } = body.message;

    const allowedFields = ['UserName', 'Text'];
    const invalidFields = Object.keys(body.message).filter(field => !allowedFields.includes(field));
    if (invalidFields.length > 0) {
        return sendError(400, { message: `Invalid field(s): ${invalidFields.join(', ')}` });
    }

    const usernameRegex = /^[a-zA-Z0-9]{4,10}$/;
    if (!usernameRegex.test(UserName)) {
        return sendError(400, { message: 'UserName must be between 4 and 10 characters and can only contain letters and numbers.' });
    }

    if (Text.length < 1 || Text.length > 500) {
        return sendError(400, { message: 'Text must be between 1 and 150 characters.' });
    }
    const messageID = uuid().substring(0, 5);
    const date = new Date();
    const formattedDate = date.toLocaleString('sv-SE', {
        weekday: 'long',
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Europe/Stockholm'
    });

    try {
        await db.put({
            TableName: 'messages-db',
            Item: {
                MessageID: messageID,
                Text,
                UserName,
                CreatedAt: formattedDate
            }
        });

        return sendResponse(200, {
            success: true,
            message: 'Message added successfully!',
            messageDetails: {
                MessageID: messageID,
                Text,
                UserName,
                CreatedAt: formattedDate
            }
        });
    } catch (error) {
        console.error('Error: ', error);
        return sendError(500, { Message: 'An internal server error occurred.' });
    }
};