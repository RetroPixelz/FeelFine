import axios from "axios";
import base64 from 'base-64';

const apiKey = '3SnyRi52xVsFv3r1DX0gOA7TIQBhh1E-SbjK1fKj7tD9';
const apiUrl = 'https://api.eu-de.natural-language-understanding.watson.cloud.ibm.com/instances/f209c9ce-9326-49c5-b72e-09a47daa39e7';


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