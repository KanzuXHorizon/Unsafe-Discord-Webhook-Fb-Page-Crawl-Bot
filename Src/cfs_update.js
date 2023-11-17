import axios from 'axios';
import moment from 'moment';
import { EmbedBuilder, WebhookClient } from 'discord.js';
const webhook = new WebhookClient({
    url: " " //change r webhook url
});

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
    }
    return randomString;
}

export default async function({ Client, Interaction }) {
    if (Interaction.user.username != 'yourusername') return Interaction.reply('Bạn Không Có Quyền Để Sử Dụng Lệnh Này !')
    const access_token = ""; //your fb accesstoken
    const số_lượng_bài = 1;
    const pageID = '';
    const url = 'https://graph.facebook.com/v17.0/' + pageID + '/posts?fields=attachments,message,created_time&limit=' + số_lượng_bài +'&access_token=' + access_token
    const { data } = await axios.get(url, {
        "headers": {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
            "accept-language": "en-US,en;q=0.6",
            "cache-control": "max-age=0",
            "sec-ch-ua": "\"Not/A)Brand\";v=\"99\", \"Brave\";v=\"115\", \"Chromium\";v=\"115\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "document",
            "sec-fetch-mode": "navigate",
            "sec-fetch-site": "none",
            "sec-fetch-user": "?1",
            "sec-gpc": "1",
            "upgrade-insecure-requests": "1",
            "cookie": "your cookie"
        },
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": "GET"
    });

    const json = data;
    await Interaction.reply('Tiến Hành kiểm tra các confession hay bài đăng mới nhất và tự động cập nhật !');
    const Dao_Nguoc = [];
    for (let i = 1; i <= json.data.length; i++) {
        Dao_Nguoc.push(json.data[json.data.length - i])
    }
    for (let i of Dao_Nguoc) {
        const formattedDate = moment(i.created_time).format("hh:mm DD/MM/YYYY");
        
        try {
            const Message_Check = await Client.guilds.cache.get('your guild id').channels.cache.get('your discord channel id').messages.fetch({ limit: 2 })
            const MapToArray = Array.from(Message_Check).map(([key, value]) => ({ key, value }));
            const Message = Message_Check.get(MapToArray[0].key);
            if(Message.embeds[0] == undefined || Message.embeds[0] == "undefined") {
                const Msg = Message_Check.get(MapToArray[1].key);
                if (Msg.embeds[0].data.title == formattedDate) continue;
            }
            else if (Message.embeds[0].data.title == formattedDate) continue;
        }
        catch (e) {
            console.log(e);
            continue;
        }
        const attachment = [];
        const link = [];

//change iff u wwant =))
        const embed = new EmbedBuilder()
            .setTitle(formattedDate)
            .setDescription(i.message)
            .setColor(0x00FFFF)
            .setAuthor({
                name: 'Lê Quý Đôn - QT Confessions',
                iconURL: 'https://scontent.fsgn15-1.fna.fbcdn.net/v/t39.30808-6/358675698_814413716912565_506832808540396795_n.jpg?_nc_cat=101&cb=99be929b-59f725be&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=b-gPRrWybWMAX99l3ka&_nc_ht=scontent.fsgn15-1.fna&oh=00_AfCeBUId7v7bHT50_CJL0v3DI49CwfoxFsukjkxL0TEfNw&oe=64D84710',
                url: 'https://www.facebook.com/lequydonqt.confessions'
            })
            .setTimestamp()
            .setThumbnail('https://scontent.fsgn15-1.fna.fbcdn.net/v/t39.30808-6/361936771_956417132462183_1142208082516383833_n.jpg?_nc_cat=106&cb=99be929b-59f725be&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=2HUB0iKpqNkAX9fyScu&_nc_ht=scontent.fsgn15-1.fna&oh=00_AfA1V8EVt4atK2Au4iE1CXeed16skRzOANlbVN7rNOAmsw&oe=64D7A917')
            .setFooter({
                text: 'Được tạo bởi KanzuWakazaki',
                iconURL: 'https://scontent.fsgn15-1.fna.fbcdn.net/v/t39.30808-6/361936771_956417132462183_1142208082516383833_n.jpg?_nc_cat=106&cb=99be929b-59f725be&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=2HUB0iKpqNkAX9fyScu&_nc_ht=scontent.fsgn15-1.fna&oh=00_AfA1V8EVt4atK2Au4iE1CXeed16skRzOANlbVN7rNOAmsw&oe=64D7A917',
                url: 'https://www.facebook.com/Lazic.Kanzu'
            });

        const obj_send = {
            username: 'LQĐ-CFS',
            avatarURL: 'https://cdn.discordapp.com/app-icons/1130054738029850674/fec22efe9b1aad61b5ca17f44f4eb499.png?size=256',
            embeds: [embed],
        }

        if (i.attachments) {
            for (let j of i.attachments.data) {
                link.push(j.url)
                if (j.type == 'photo') {
                    attachment.push({
                        attachment: j.media.image.src,
                        name: generateRandomString(6) + ".png"
                    });

                } else if (j.type == "video_autoplay") {
                    attachment.push({
                        attachment: j.media.image.src,
                        name: generateRandomString(6) + ".png"
                    })
                    attachment.push({
                        attachment: j.media.source,
                        name: generateRandomString(7) + '.mp4'
                    })

                }
            }   
        }
        const Old_Data = await webhook.send(obj_send);
        try {
            if (attachment.length != 0) {
                await webhook.send({
                    username: 'LQĐ-CFS',
                    avatarURL: 'https://cdn.discordapp.com/app-icons/1130054738029850674/fec22efe9b1aad61b5ca17f44f4eb499.png?size=256',
                    files: attachment
                })
            } else continue;
        } catch (e) {
            embed.setDescription(i.message + "\n\n" + link.join('\n'))
            await webhook.editMessage(Old_Data.id, {
                embeds: [embed]
            });
        }
    }
}

export const config = {
    Name: "cfs",
    Description: "kiểm tra và tự động cập nhật confession từ facebook"
}