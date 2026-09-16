import type { ConfigCommands } from "../../types/structure/commands";

export default {
    name: "n",
    alias: ["hidetag", "htag"],
    usage: "[texto]",
    category: "group",
    description: "Mencionar a todos sin mostrar las etiquetas",
    isGroup: true,
    isGroupAdmin: true,
    example: `{prefix}{command.name} Aviso importante`,

    async run({ Chisato, args, from }) {
        try {
            const groupMetadata = await Chisato.groupMetadata(from);
            const groupParticipants = groupMetadata.participants || [];

            const participants = groupParticipants.map(
                (participant) => participant.id
            );

            const text = args.length > 0
                ? args.join(" ")
                : "@everyone";

            await Chisato.sendText(from, text, null, {
                mentions: participants,
            });
        } catch (error) {
            Chisato.logger.error(error);

            await Chisato.sendText(
                from,
                "❌ No pude mencionar a todos los miembros.",
                null
            );
        }
    },
} satisfies ConfigCommands;