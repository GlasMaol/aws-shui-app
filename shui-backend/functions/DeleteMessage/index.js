const { sendResponse, sendError } = require('../../responses/index');
const { db } = require('../../services/index');

exports.handler = async (event) => {
    const { id: MessageID } = event.pathParameters;

    if (!MessageID) {
        return sendError(400, { success: false, message: 'No message ID provided!' });
    }

    try {
        const result = await db.get({
            TableName: 'messages-db',
            Key: { MessageID }
        });

        if (!result.Item) {
            return sendError(404, { success: false, message: `No message found with id: ${MessageID}` });
        }

        await db.delete({
            TableName: 'messages-db',
            Key: { MessageID }
        });

        return sendResponse(200, { success: true, message: `Message with ID ${MessageID} has been deleted successfully.` });

    } catch (error) {
        return sendError(500, { success: false, message: 'Internal server error', error: error.message });
    }
};