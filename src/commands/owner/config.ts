import type { ConfigCommands } from "../../types/structure/commands";
import fs from "fs";

export default {
    name: "config",
    alias: ["botconfig"],
    category: "owner",
    description: "Ver configuración del bot",
    isOwner: true,
    async run({ Chisato, from, message, botName }) {
        const config: Config = JSON.parse(
            fs.readFileSync("./config.json", "utf-8")
        );

        const { version } = JSON.parse(
            fs.readFileSync("./package.json", "utf-8")
        );

        let caption = `*「 CONFIGURACIÓN 」*\n\n`;

        caption += `★ Números de Owner: [`;
        for (const owner of config.ownerNumber) {
            caption += ` ${owner} `;
        }

        caption += `]\n★ Números de Admin: [`;

        for (const admin of config.teamNumber) {
            caption += ` ${admin} `;
        }

        caption += `]\n`;
        caption += `★ Nombre del Bot: ${botName}\n`;
        caption += `└「 ${version} 」 Versión\n`;
        caption += `└「 ${config.prefix} 」 Prefijo\n`;

        caption += `★ Stickers:\n`;
        caption += `└★ Packname: ${config.stickers.packname}\n`;
        caption += `└★ Autor: ${config.stickers.author}\n`;

        caption += `★ Configuración:\n`;
        caption += `└「 ${config.settings.ownerNotifyOnline ? "✅" : "❌"} 」 Notificación de Owner conectado\n`;
        caption += `└「 ${config.settings.useLimit ? "✅" : "❌"} 」 Usar límites\n`;
        caption += `└「 ${config.settings.useCooldown ? "✅" : "❌"} 」 Usar cooldown\n`;
        caption += `└「 ${config.settings.autoReadMessage ? "✅" : "❌"} 」 Lectura automática de mensajes\n`;
        caption += `└「 ${config.settings.autoReadStatus ? "✅" : "❌"} 」 Lectura automática de estados\n`;
        caption += `└「 ${config.settings.autoCorrect ? "✅" : "❌"} 」 Corrección automática\n`;
        caption += `└「 ${config.settings.selfbot ? "✅" : "❌"} 」 Selfbot\n`;

        caption += `★ Llamadas:\n`;
        caption += `└「 ${config.call.status} 」 Anti llamadas\n`;

        caption += `★ Límite:\n`;
        caption += `└「 ${config.limit.command} 」 Comandos\n`;

        await Chisato.sendText(from, caption, message);
    },
} satisfies ConfigCommands;