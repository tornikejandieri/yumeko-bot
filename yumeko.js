const { Client, GatewayIntentBits } = require("discord.js");
require("dotenv").config();
const fetch = require("node-fetch");
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.MessageContent,
    ],
});

client.on("ready", () => {
    console.log(`${client.user.tag} is online!`);
});

const TOKEN =
    "MTE0ODY5Nzk1MjI5NTA2NzY3OQ.GdHYHt.dUf8KTjqg-U5cEAuocno7XwHt85fSJb4PGuLhc";
const PREFIX = "y!";
const apiKey = "AIzaSyD41G-yKF8iC6femzskRptkjpVqj_88QB";

const fetchAnimeGif = async (keyword) => {
    try {
        const response = await fetch(
            `https://tenor.googleapis.com/v2/search?q=anime${keyword}&key=${apiKey}Q&client_key=yumeko_bot&contentfilter=off&media_filter=anime`
        );

        if (!response.ok) {
            console.error(`Error: ${response.statusText}`);
            return;
        }
        const data = await response.json();
        let randomIndex = Math.floor(Math.random() * data.results.length);
        return data?.results[randomIndex].url;
    } catch (error) {
        console.error(error);
    }
};

client.on("messageCreate", async (message) => {
    if (message.content.startsWith(PREFIX)) {
        const args = message.content.slice(PREFIX.length).trim().split(/ +/);

        if (args.length > 0) {
            const keyword = args.join(" ");
            const gifUrl = await fetchAnimeGif(keyword);

            if (gifUrl) {
                message.channel.send(gifUrl);
            } else {
                message.channel.send("ごめんなさい I couldn't find the gif 😭");
            }
        }
    }
});

client.login(TOKEN);
