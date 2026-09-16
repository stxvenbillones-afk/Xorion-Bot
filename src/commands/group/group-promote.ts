import type { ConfigCommands } from "../../types/structure/commands";

export default {
    name: "promote",
    alias: ["gpromote", "grouppromote"],
    usage: "[tag]",
    category: "group",
    description: "Dar administrador a un miembro del grupo",
    isGroup: true,
    isGroupAdmin: true,
    isBotAdmin: true,

    async run({ Chisato, from, message, groupAdmins }) {
        if (message.quoted) {
            const mention = message.quoted.sender;

            const check = groupAdmins
                .map((v) => v.id)
                .includes(mention);

            if (check) {
                return Chisato.sendText(
                    from,
                    `❌ @${mention.split("@")[0]} ya es administrador del grupo.`,
                    message,
                    {
                        mentions: [mention],
                    }
                );
            }

            await Chisato.groupParticipantsUpdate(
                from,
                [mention],
                "promote"
            )
                .then(() =>
                    Chisato.sendText(
                        from,
                        `✅ @${mention.split("@")[0]} ahora es administrador del grupo.`,
                        message,
                        {
                            mentions: [mention],
                        }
                    )
                )
                .catch(() =>
                    Chisato.sendText(
                        from,
                        `❌ No pude hacer administrador a @${mention.split("@")[0]}.`,
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

                if (check) {
                    await Chisato.sendText(
                        from,
                        `❌ @${mention.split("@")[0]} ya es administrador del grupo.`,
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
                    "promote"
                )
                    .then(() =>
                        Chisato.sendText(
                            from,
                            `✅ @${mention.split("@")[0]} ahora es administrador del grupo.`,
                            message,
                            {
                                mentions: [mention],
                            }
                        )
                    )
                    .catch(() =>
                        Chisato.sendText(
                            from,
                            `❌ No pude hacer administrador a @${mention.split("@")[0]}.`,
                            message,
                            {
                                mentions: [mention],
                            }
                        )
                    );
            }
        } else {
            const caption =
                `*「 PROMOTE 」*\n\n` +
                `Da administrador a un miembro del grupo.\n\n` +
                `*Con etiqueta:*\n` +
                `• .promote @usuario\n\n` +
                `*Respondiendo a un mensaje:*\n` +
                `• .promote`;

            await Chisato.sendText(from, caption, message);
        }
    },
} satisfies ConfigCommands;