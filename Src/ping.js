import axios from 'axios'

export default async function({ Client, Interaction }) {
    const startTime = Date.now();
    await axios.get('https://example.com');
    await Interaction.reply('Độ trễ hiện tại: ' + (Date.now() - startTime) + 'ms');

}

export const config = {
    Name: "ping",
    Description: "kiểm tra độ trễ từ server"
}