import type { ConfigCommands } from "../../types/structure/commands";
import { commands } from "../../libs";
import fs from "fs";

const CATEGORY_ICON: Record<string, string> = {
    general: "🌐",
    downloader: "📥",
    converter: "🔄",
    search: "🔎",
    anime: "🎌",
    news: "📰",
    wallpaper: "🖼️",
    group: "👥",
    groupsetting: "⚙️",
    games: "🎮",
    misc: "🎲",
    lookup: "🔍",
    owner: "👑",
    debugging: "🛠️",
};

const getGreeting = (timezone: string): string => {
    const hour = Number(
        new Intl.DateTimeFormat("en-US", {
            timeZone: timezone,
            hour: "numeric",
            hour12: false,
        }).format(new Date())
    );

    if (hour >= 4 && hour < 11) return "Buenos días";
    if (hour >= 11 && hour < 15) return "Buenas tardes";
    if (hour >= 15 && hour < 18) return "Buenas tardes";
    return "Buenas noches";
};

const getDateTime = (timezone: string): string => {
    return new Intl.DateTimeFormat("es-ES", {
        timeZone: timezone,
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    }).format(new Date());
};

export default {
    name: "menu",
    alias: ["allmenu", "commands", "command", "cmd"],
    category: "general",
    description: "Mostrar todos los comandos del bot",

    async run({
        Chisato,
        from,
        message,
        prefix,
        Database,
        isOwner,
        isTeam,
    }) {
        const config = JSON.parse(
            fs.readFileSync("./config.json", "utf-8")
        );

        const timezone =
            config.timezone ||
            config.timeZone ||
            "Asia/Jakarta";

        const pushName = message.pushName || "Usuario";

        const isMaintenance = (name: string) =>
            config.maintenance?.includes(name);

        /*
         * Xorion Bot
         * Conserva automáticamente TODOS los comandos
         * registrados en el sistema.
         */
        const allCmds = Array.from(commands.values());

        const category: Record<string, ConfigCommands[]> = {};

        for (const cmd of allCmds) {
            const cat = cmd.category || "misc";

            if (!category[cat]) {
                category[cat] = [];
            }

            category[cat].push(cmd);
        }

        const totalUsers = await Database.User.getAll();
        const totalGroups = await Database.Group.getAll();

        const greeting = getGreeting(timezone);
        const dateTime = getDateTime(timezone);

        const catKeys = Object.keys(category).sort((a, b) =>
            a.localeCompare(b)
        );

        let text = "";

        // ══════════════════════════════════════
        // HEADER
        // ══════════════════════════════════════

        text += `╭━━━━━━━━━━━━━━━━━━━━━━╮\n`;
        text += `┃   👻  𝗫𝗢𝗥𝗜𝗢𝗡 𝗕𝗢𝗧  👻\n`;
        text += `╰━━━━━━━━━━━━━━━━━━━━━━╯\n\n`;

        text += `${greeting}, *${pushName}* 👋\n`;
        text += `_${dateTime}_\n\n`;

        // ══════════════════════════════════════
        // ESTADÍSTICAS
        // ══════════════════════════════════════

        text += `╭┤✦ 𝗜𝗡𝗙𝗢𝗥𝗠𝗔𝗖𝗜Ó𝗡\n`;
        text += `┃\n`;
        text += `┃  🤖 Bot      : Xorion Bot\n`;
        text += `┃  🔑 Prefijo  : ${prefix}\n`;
        text += `┃  📦 Comandos : ${allCmds.length}\n`;
        text += `┃  🗂️ Categorías: ${catKeys.length}\n`;
        text += `┃  👥 Usuarios : ${totalUsers.length}\n`;
        text += `┃  🏢 Grupos   : ${totalGroups.length}\n`;
        text += `┃\n`;
        text += `╰━━━━━━━━━━━━━━━━━━━━━━╯\n\n`;

        // ══════════════════════════════════════
        // LEYENDA
        // ══════════════════════════════════════

        text += `╭┤✦ 𝗣𝗘𝗥𝗠𝗜𝗦𝗢𝗦\n`;
        text += `┃\n`;
        text += `┃  ⭐ Owner\n`;
        text += `┃  💎 Admin\n`;
        text += `┃  👑 Admin de grupo\n`;
        text += `┃  ✅ Público\n`;
        text += `┃  〰️ En mantenimiento\n`;
        text += `┃\n`;
        text += `╰━━━━━━━━━━━━━━━━━━━━━━╯\n\n`;

        // ══════════════════════════════════════
        // COMANDOS
        // ══════════════════════════════════════

        const canSeeDebugging = isOwner || isTeam;

        for (const key of catKeys) {
            if (key === "debugging" && !canSeeDebugging) {
                continue;
            }

            const icon = CATEGORY_ICON[key] || "📂";

            const sorted = [...category[key]].sort((a, b) =>
                a.name.localeCompare(b.name)
            );

            text += `╭┤✦ ${icon} 𝗫${key.toUpperCase()}\n`;
            text += `┃\n`;

            for (const command of sorted) {
                const badge = command.isOwner
                    ? "⭐"
                    : command.isTeam
                    ? "💎"
                    : command.isGroupAdmin
                    ? "👑"
                    : "✅";

                const usage = command.usage
                    ? ` _${command.usage}_`
                    : "";

                const inMaintenance =
                    isMaintenance(command.name);

                const commandText = inMaintenance
                    ? `~${prefix}${command.name}~`
                    : `${prefix}${command.name}`;

                text += `┃  ${badge} ${commandText}${usage}\n`;
            }

            text += `┃\n`;
            text += `╰━━━━━━━━━━━━━━━━━━━━━━╯\n\n`;
        }

        // ══════════════════════════════════════
        // FOOTER
        // ══════════════════════════════════════

        text += `╭━━━━━━━━━━━━━━━━━━━━━━╮\n`;
        text += `┃   👻  𝗫𝗢𝗥𝗜𝗢𝗡 𝗕𝗢𝗧  👻\n`;
        text += `┃\n`;
        text += `┃  Usa ${prefix}help <comando>\n`;
        text += `┃  para ver los detalles.\n`;
        text += `┃\n`;
        text += `┃  𝗣𝗼𝘄𝗲𝗿𝗲𝗱 𝗯𝘆 𝗕𝗶𝗹𝗹𝗼𝗻𝗲𝘀\n`;
        text += `╰━━━━━━━━━━━━━━━━━━━━━━╯`;

        await Chisato.sendText(
            from,
            text,
            message
        );
    },
} satisfies ConfigCommands;