import type { ConfigCommands } from "../../types/structure/commands";
import { configService } from "../../core/config/config.service";

export default {
    name: "deladmin",
    alias: ["delteam", "deleteteam"],
    usage: "[tag]",
    category: "owner",
    description: "Eliminar usuario como Admin",
    isOwner: true,
    async run({ Chisato, args, from, message }) {
        const config = configService.getConfig();

        if (message.quoted) {
            const num = message.quoted.sender.split("@")[0];

            if (config.teamNumber.includes(num)) {
                configService.updateConfig({
                    teamNumber: config.teamNumber.filter(n => n !== num),
                });

                Chisato.sendText(
                    from,
                    `@${num} ha sido eliminado de los Admins`,
                    message,
                    {
                        mentions: [message.quoted.sender],
                    }
                );
            } else {
                Chisato.sendText(
                    from,
                    `@${num} no es Admin`,
                    message,
                    {
                        mentions: [message.quoted.sender],
                    }
                );
            }
        } else if (message.mentions && message.mentions.length > 0) {
            let caption = `Admins eliminados correctamente: `;
            let updated = [...config.teamNumber];

            for (const mention of message.mentions) {
                const num = mention.split("@")[0];

                updated = updated.filter(n => n !== num);
                caption += `@${num} `;
            }

            configService.updateConfig({
                teamNumber: updated,
            });

            await Chisato.sendText(from, caption, message, {
                mentions: message.mentions,
            });
        } else if (args[0]) {
            const num = args[0];

            if (config.teamNumber.includes(num)) {
                configService.updateConfig({
                    teamNumber: config.teamNumber.filter(n => n !== num),
                });

                Chisato.sendText(
                    from,
                    `@${num} ha sido eliminado de los Admins`,
                    message,
                    {
                        mentions: [num + "@s.whatsapp.net"],
                    }
                );
            } else {
                Chisato.sendText(
                    from,
                    `@${num} no es Admin`,
                    message,
                    {
                        mentions: [num + "@s.whatsapp.net"],
                    }
                );
            }
        } else {
            Chisato.sendText(
                from,
                "Por favor, etiqueta al usuario o responde a su mensaje.",
                message
            );
        }
    },
} satisfies ConfigCommands;