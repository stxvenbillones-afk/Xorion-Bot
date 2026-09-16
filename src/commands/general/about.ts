import type { ConfigCommands } from "../../types/structure/commands";

export default {
    name: "about",
    alias: ["infobot", "sc", "base"],
    category: "general",
    description: "Ver información del bot",

    async run({ Chisato, from, message }) {
        const caption =
            "╭━━━━━━━━━━━━━━━━━━━━━━╮\n" +
            "┃   👻  𝗫𝗢𝗥𝗜𝗢𝗡 𝗕𝗢𝗧  👻\n" +
            "╰━━━━━━━━━━━━━━━━━━━━━━╯\n\n" +
            "• Nombre : Xorion Bot\n" +
            "• Powered by : Billones\n" +
            "• Creador de la base : Tobz\n" +
            "• Team de la base : 𓆩 𝚮ɪᴅᴅᴇɴ 𝐅ɪɴᴅᴇʀ 𓆪\n\n" +
            "• Github :\n" +
            "https://github.com/stxvenbillones-afk\n\n" +
            "• Repositorio Xorion :\n" +
            "https://github.com/stxvenbillones-afk/xerion-bot\n\n" +
            "• Instagram del creador de la base :\n" +
            "https://instagram.com/ini.tobz\n\n" +
            "╭┤✦ 𝗖𝗥É𝗗𝗜𝗧𝗢𝗦\n" +
            "┃\n" +
            "┃  • Arugaz\n" +
            "┃  • Nugraizy\n" +
            "┃  • ctOS\n" +
            "┃\n" +
            "╰━━━━━━━━━━━━━━━━━━━━━━╯\n\n" +
            "        𝗣𝗼𝘄𝗲𝗿𝗲𝗱 𝗯𝘆 𝗕𝗶𝗹𝗹𝗼𝗻𝗲𝘀";

        await Chisato.sendText(from, caption, message);
    },
} satisfies ConfigCommands;