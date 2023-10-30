import axios from "axios";
import base64 from 'base-64';

const analyzeEmotion = async (text) => {
    try {
        const response = await axios.post(`${apiUrl}/v1/analyze?version=2019-07-12`, {
            text: text,
            features: {
                emotion: {},
            }
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${base64.encode(`apikey:${apiKey}`)}`,
            },
        });
        return response.data.emotion.document.emotion;
        
    } catch (error) {
        console.log('Error: ', error);
        console.log('Error: ', error.response)
        return null;
    }
};

export default analyzeEmotion;