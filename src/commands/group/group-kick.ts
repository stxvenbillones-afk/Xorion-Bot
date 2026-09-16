import type { ConfigCommands } from "../../types/structure/commands";

export default {
    name: "kick",
    alias: ["gkick", "groupkick"],
    usage: "[tag|reply]",
    category: "group",
    description: "Expulsar a un miembro del grupo",
    isGroup: true,
    isGroupAdmin: true,
    isBotAdmin: true,

    async run({ Chisato, from, botNumber, message }) {
        if (message.quoted) {
            const mention = message.quoted.sender;

            if (mention === botNumber) {
                return Chisato.sendText(
                    from,
                    "❌ No puedo expulsarme a mí mismo.",
                    message
                );
            }

            await Chisato.groupParticipantsUpdate(
                from,
                [mention],
                "remove"
            )
                .then(() =>
                    Chisato.sendText(
                        from,
                        `✅ @${mention.split("@")[0]} ha sido expulsado del grupo.`,
                        message,
                        {
                            mentions: [mention],
                        }
                    )
                )
                .catch(() =>
                    Chisato.sendText(
                        from,
                        `❌ No pude expulsar a @${mention.split("@")[0]}.`,
                        message,
                        {
                            mentions: [mention],
                        }
                    )
                );
        } else if (message.mentions && message.mentions.length > 0) {
            const mentions = message.mentions;

            for (const mention of mentions) {
                if (mention === botNumber) {
                    await Chisato.sendText(
                        from,
                        "❌ No puedo expulsarme a mí mismo.",
                        message
                    );
                    continue;
                }

                await Chisato.groupParticipantsUpdate(
                    from,
                    [mention],
                    "remove"
                )
                    .then(() =>
                        Chisato.sendText(
                            from,
                            `✅ @${mention.split("@")[0]} ha sido expulsado del grupo.`,
                            message,
                            {
                                mentions: [mention],
                            }
                        )
                    )
                    .catch(() =>
                        Chisato.sendText(
                            from,
                            `❌ No pude expulsar a @${mention.split("@")[0]}.`,
                            message,
                            {
                                mentions: [mention],
                            }
                        )
                    );
            }
        } else {
            const caption =
                `*「 KICK 」*\n\n` +
                `Expulsa a un miembro del grupo.\n\n` +
                `*Con etiqueta:*\n` +
                `• .kick @usuario\n\n` +
                `*Respondiendo a un mensaje:*\n` +
                `• .kick`;

            await Chisato.sendText(from, caption, message);
        }
    },
} satisfies ConfigCommands;