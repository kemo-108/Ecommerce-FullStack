const API = "https://localhost:7005/api/contact";
export const DeleteMessage = async (id) => {
    try {
        const response = await fetch(`https://localhost:7005/api/contact/${id}`, {
            method: "DELETE"
        });
        if (!response.ok) {
            throw new Error("Failed to delete message");
        }
    } catch (error) {
        console.error("Error deleting message:", error);
        throw error;
    }
}
export const SendMessage = async (messageData) => {
    try {
        const response = await fetch(API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(messageData)
        });
        if (!response.ok) {
            throw new Error("Failed to send message");
        }

        return true;
    } catch (error) {
        console.error("Error sending message:", error);
        throw error;
    }
}

export default SendMessage;