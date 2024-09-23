const { sendResponse, sendError } = require('../../responses/index');
const { db } = require('../../services/index');
const { v4: uuid } = require('uuid');

exports.handler = async (event) => {
    if (!event.body) {
        return sendError(400, { message: 'No data sent.' })
    }

    const body = JSON.parse(event.body);
    const message = body.message || body;

    if (!message.Text || !message.UserName) {
        return sendError(400, { message: 'Missing Required Fields!' });
    }

    const allowedFields = ['Text', 'UserName'];
    const invalidFields = Object.keys(message).filter(field => !allowedFields.includes(field));

    if (invalidFields.length > 0) {
        return sendError(400, { message: `Invalid fields: ${invalidFields.join(', ')}` });
    }

    const messageID = uuid().substring(0, 5);
    const date = new Date();

    const createdAtIsoString = "2024-09-20T13:33:49.887Z";

    /*const date = new Date(createdAtIsoString);*/

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
                Text: message.Text,
                UserName: message.UserName,
                CreatedAt: formattedDate
            }
        });

        return sendResponse(200, {
            success: true,
            message: 'Message added successfully!',
            messageDetails: {
                MessageID: messageID,
                Text: message.Text,
                UserName: message.UserName,
                CreatedAt: formattedDate
            }
        });
    } catch (error) {
        console.error('Error: ', error);
        return sendError(500, { Message: 'An internal server error occurred.' })
    }
}