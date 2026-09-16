import type { ConfigCommands } from "../../types/structure/commands";

export default {
    name: "demote",
    alias: ["gdemote", "groupdemote"],
    usage: "[tag|reply]",
    category: "group",
    description: "Quitar administrador a un miembro del grupo",
    isGroup: true,
    isGroupAdmin: true,
    isBotAdmin: true,

    async run({ Chisato, from, message, groupAdmins }) {
        if (message.quoted) {
            const mention = message.quoted.sender;

            const check = groupAdmins
                .map((v) => v.id)
                .includes(mention);

            if (!check) {
                return Chisato.sendText(
                    from,
                    `❌ @${mention.split("@")[0]} no es administrador del grupo.`,
                    message,
                    {
                        mentions: [mention],
                    }
                );
            }

            await Chisato.groupParticipantsUpdate(
                from,
                [mention],
                "demote"
            )
                .then(() =>
                    Chisato.sendText(
                        from,
                        `✅ Se quitó el administrador del grupo a @${mention.split("@")[0]}.`,
                        message,
                        {
                            mentions: [mention],
                        }
                    )
                )
                .catch(() =>
                    Chisato.sendText(
                        from,
                        `❌ No pude quitarle el administrador a @${mention.split("@")[0]}.`,
                        message,
                        {
                            mentions: [mention],
                        }
                    )
                );
        } else if (message.mentions && message.mentions.length > 0) {
            const mentions = message.mentions;

            for (const mention of mentions) {
                const check = groupAdmins
                    .map((v) => v.id)
                    .includes(mention);

                if (!check) {
                    await Chisato.sendText(
                        from,
                        `❌ @${mention.split("@")[0]} no es administrador del grupo.`,
                        message,
                        {
                            mentions: [mention],
                        }
                    );
                    continue;
                }

                await Chisato.groupParticipantsUpdate(
                    from,
                    [mention],
                    "demote"
                )
                    .then(() =>
                        Chisato.sendText(
                            from,
                            `✅ Se quitó el administrador del grupo a @${mention.split("@")[0]}.`,
                            message,
                            {
                                mentions: [mention],
                            }
                        )
                    )
                    .catch(() =>
                        Chisato.sendText(
                            from,
                            `❌ No pude quitarle el administrador a @${mention.split("@")[0]}.`,
                            message,
                            {
                                mentions: [mention],
                            }
                        )
                    );
            }
        } else {
            const caption =
                `*「 DEMOTE 」*\n\n` +
                `Quita el administrador a un miembro del grupo.\n\n` +
                `*Con etiqueta:*\n` +
                `• .demote @usuario\n\n` +
                `*Respondiendo a un mensaje:*\n` +
                `• .demote`;

            await Chisato.sendText(from, caption, message);
        }
    },
} satisfies ConfigCommands;