const { sendResponse, sendError } = require('../../responses/index');
const { db } = require('../../services/index');

exports.handler = async (event) => {
    const { userName } = event.pathParameters;

    if (!userName) {
        return sendError(400, { success: false, message: 'No username provided!' });
    }

    try {

        const result = await db.scan({
            TableName: 'messages-db',
            FilterExpression: 'UserName = :userName',
            ExpressionAttributeValues: {
                ':userName': userName
            }
        });

        const messages = result.Items;

        return sendResponse(200, { success: true, messages: messages });
        
    } catch (error) {
        return sendError(500, { success: false, message: 'Internal server error', error: error.message });
    }
};