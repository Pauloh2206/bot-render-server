async function menuDono(prefix, botName = "MeuBot", userName = "Usuário", {
    header = `╭┈⊰ 🌸 『 *${botName}* 』\n┊Olá, #user#!\n╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯`,
    menuTopBorder = "╭┈",
    bottomBorder = "╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯",
    menuTitleIcon = "🍧ฺꕸ▸",
    menuItemIcon = "•.̇𖥨֗🍓⭟",
    separatorIcon = "❁",
    middleBorder = "┊",
    botConfigMenuTitle = "🤖 CONFIGURAÇÕES DO BOT",
    menuDesignMenuTitle = "🎨 DESIGN & APARÊNCIA",
    automationMenuTitle = "⚙️ SISTEMA & AUTOMAÇÃO",
    commandCustomMenuTitle = "🛠️ PERSONALIZAÇÃO DE COMANDOS",
    commandLimitingMenuTitle = "🚫 LIMITAÇÃO DE COMANDOS",
    userManagementMenuTitle = "👥 GERENCIAMENTO DE USUÁRIOS",
    rentalSystemMenuTitle = "💰 SISTEMA DE ALUGUEL",
    subBotsMenuTitle = "🤖 GERENCIAMENTO DE SUB-BOTS",
    vipSystemMenuTitle = "💎 SISTEMA VIP/PREMIUM",
    botControlMenuTitle = "⚡ CONTROLE & MANUTENÇÃO",
    monitoringMenuTitle = "📊 MONITORAMENTO & ANÁLISE"
} = {}) {
    const formattedHeader = header.replace(/#user#/g, userName);
    return `‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎
${formattedHeader}

${menuTopBorder}${separatorIcon} *${botConfigMenuTitle}*
${middleBorder}
	${middleBorder}${menuItemIcon}${prefix}addalias
	${middleBorder}${menuItemIcon}${prefix}addaluguel
	${middleBorder}${menuItemIcon}${prefix}addauto
	${middleBorder}${menuItemIcon}${prefix}addautoadm
	${middleBorder}${menuItemIcon}${prefix}addautoadmidia
	${middleBorder}${menuItemIcon}${prefix}addautoadmin
	${middleBorder}${menuItemIcon}${prefix}addautoadmmidia
	${middleBorder}${menuItemIcon}${prefix}addautomedia
	${middleBorder}${menuItemIcon}${prefix}addautomidia
	${middleBorder}${menuItemIcon}${prefix}addautoresponse
	${middleBorder}${menuItemIcon}${prefix}addcmd
	${middleBorder}${menuItemIcon}${prefix}addcmdmedia
	${middleBorder}${menuItemIcon}${prefix}addcmdmidia
	${middleBorder}${menuItemIcon}${prefix}addcmdvip
	${middleBorder}${menuItemIcon}${prefix}addindica
	${middleBorder}${menuItemIcon}${prefix}addindicacao
	${middleBorder}${menuItemIcon}${prefix}addindicar
	${middleBorder}${menuItemIcon}${prefix}addnopref
	${middleBorder}${menuItemIcon}${prefix}addnoprefix
	${middleBorder}${menuItemIcon}${prefix}addpremium
	${middleBorder}${menuItemIcon}${prefix}addpremiumgp
	${middleBorder}${menuItemIcon}${prefix}addreact
	${middleBorder}${menuItemIcon}${prefix}addsubbot
	${middleBorder}${menuItemIcon}${prefix}addsubdono
	${middleBorder}${menuItemIcon}${prefix}addvip
	${middleBorder}${menuItemIcon}${prefix}addvipcommand
	${middleBorder}${menuItemIcon}${prefix}addvipgp
	${middleBorder}${menuItemIcon}${prefix}addwhitelist
	${middleBorder}${menuItemIcon}${prefix}addxp
	${middleBorder}${menuItemIcon}${prefix}adicionarcmd
	${middleBorder}${menuItemIcon}${prefix}adicionarcmdvip
	${middleBorder}${menuItemIcon}${prefix}aluguelist
	${middleBorder}${menuItemIcon}${prefix}antipv
	${middleBorder}${menuItemIcon}${prefix}antipv2
	${middleBorder}${menuItemIcon}${prefix}antipv3
	${middleBorder}${menuItemIcon}${prefix}antipv4
	${middleBorder}${menuItemIcon}${prefix}antipvmessage
	${middleBorder}${menuItemIcon}${prefix}antipvmsg
	${middleBorder}${menuItemIcon}${prefix}ativarcmdvip
	${middleBorder}${menuItemIcon}${prefix}atualizar
	${middleBorder}${menuItemIcon}${prefix}atualizarbot
	${middleBorder}${menuItemIcon}${prefix}autohorarios
	${middleBorder}${menuItemIcon}${prefix}autoresponses
	${middleBorder}${menuItemIcon}${prefix}blockuserg
	${middleBorder}${menuItemIcon}${prefix}botname
	${middleBorder}${menuItemIcon}${prefix}botoff
	${middleBorder}${menuItemIcon}${prefix}boton
	${middleBorder}${menuItemIcon}${prefix}cases
	${middleBorder}${menuItemIcon}${prefix}cmddeslimitar
	${middleBorder}${menuItemIcon}${prefix}cmdlimit
	${middleBorder}${menuItemIcon}${prefix}cmdlimitar
	${middleBorder}${menuItemIcon}${prefix}cmdlimites
	${middleBorder}${menuItemIcon}${prefix}cmdlimits
	${middleBorder}${menuItemIcon}${prefix}cmdremovelimit
	${middleBorder}${menuItemIcon}${prefix}codigosubbot
	${middleBorder}${menuItemIcon}${prefix}comandospersonalizados
	${middleBorder}${menuItemIcon}${prefix}comandosvip
	${middleBorder}${menuItemIcon}${prefix}conectarsubbot
	${middleBorder}${menuItemIcon}${prefix}configcmdnotfound
	${middleBorder}${menuItemIcon}${prefix}configmenu
	${middleBorder}${menuItemIcon}${prefix}dayfree
	${middleBorder}${menuItemIcon}${prefix}delalias
	${middleBorder}${menuItemIcon}${prefix}delauto
	${middleBorder}${menuItemIcon}${prefix}delautoadm
	${middleBorder}${menuItemIcon}${prefix}delautoadmin
	${middleBorder}${menuItemIcon}${prefix}delautoresponse
	${middleBorder}${menuItemIcon}${prefix}delcmd
	${middleBorder}${menuItemIcon}${prefix}delcmdvip
	${middleBorder}${menuItemIcon}${prefix}delindicacao
	${middleBorder}${menuItemIcon}${prefix}delnopref
	${middleBorder}${menuItemIcon}${prefix}delnoprefix
	${middleBorder}${menuItemIcon}${prefix}delpremium
	${middleBorder}${menuItemIcon}${prefix}delpremiumgp
	${middleBorder}${menuItemIcon}${prefix}delreact
	${middleBorder}${menuItemIcon}${prefix}delsubbot
	${middleBorder}${menuItemIcon}${prefix}delvip
	${middleBorder}${menuItemIcon}${prefix}delvipgp
	${middleBorder}${menuItemIcon}${prefix}delxp
	${middleBorder}${menuItemIcon}${prefix}desativarcmdvip
	${middleBorder}${menuItemIcon}${prefix}designmenu
	${middleBorder}${menuItemIcon}${prefix}edcmd
	${middleBorder}${menuItemIcon}${prefix}edcmdmidia
	${middleBorder}${menuItemIcon}${prefix}editcmd
	${middleBorder}${menuItemIcon}${prefix}editcmdmidia
	${middleBorder}${menuItemIcon}${prefix}entrar
	${middleBorder}${menuItemIcon}${prefix}estatisticasvip
	${middleBorder}${menuItemIcon}${prefix}fotomenu
	${middleBorder}${menuItemIcon}${prefix}freetemu
	${middleBorder}${menuItemIcon}${prefix}gerarcod
	${middleBorder}${menuItemIcon}${prefix}gerarcodigo
	${middleBorder}${menuItemIcon}${prefix}getcase
	${middleBorder}${menuItemIcon}${prefix}horariopagante
	${middleBorder}${menuItemIcon}${prefix}horarios
	${middleBorder}${menuItemIcon}${prefix}leveling
	${middleBorder}${menuItemIcon}${prefix}limitarcmd
	${middleBorder}${menuItemIcon}${prefix}listaaluguel
	${middleBorder}${menuItemIcon}${prefix}listagp
	${middleBorder}${menuItemIcon}${prefix}listalias
	${middleBorder}${menuItemIcon}${prefix}listaluguel
	${middleBorder}${menuItemIcon}${prefix}listapremium
	${middleBorder}${menuItemIcon}${prefix}listasubdonos
	${middleBorder}${menuItemIcon}${prefix}listauto
	${middleBorder}${menuItemIcon}${prefix}listautoadm
	${middleBorder}${menuItemIcon}${prefix}listautoadmin
	${middleBorder}${menuItemIcon}${prefix}listautoresponses
	${middleBorder}${menuItemIcon}${prefix}listavip
	${middleBorder}${menuItemIcon}${prefix}listawhitelist
	${middleBorder}${menuItemIcon}${prefix}listblocks
	${middleBorder}${menuItemIcon}${prefix}listblocksgp
	${middleBorder}${menuItemIcon}${prefix}listcmd
	${middleBorder}${menuItemIcon}${prefix}listcmdlimites
	${middleBorder}${menuItemIcon}${prefix}listcmdvip
	${middleBorder}${menuItemIcon}${prefix}listgp
	${middleBorder}${menuItemIcon}${prefix}listnopref
	${middleBorder}${menuItemIcon}${prefix}listnoprefix
	${middleBorder}${menuItemIcon}${prefix}listpremium
	${middleBorder}${menuItemIcon}${prefix}listreact
	${middleBorder}${menuItemIcon}${prefix}listsubbots
	${middleBorder}${menuItemIcon}${prefix}listsubdonos
	${middleBorder}${menuItemIcon}${prefix}listvipcommands
	${middleBorder}${menuItemIcon}${prefix}mediamenu
	${middleBorder}${menuItemIcon}${prefix}midiamenu
	${middleBorder}${menuItemIcon}${prefix}minmessage
	${middleBorder}${menuItemIcon}${prefix}modoaluguel
	${middleBorder}${menuItemIcon}${prefix}msgboton
	${middleBorder}${menuItemIcon}${prefix}msgprefix
	${middleBorder}${menuItemIcon}${prefix}nome-bot
	${middleBorder}${menuItemIcon}${prefix}nome-dono
	${middleBorder}${menuItemIcon}${prefix}nomebot
	${middleBorder}${menuItemIcon}${prefix}nomedono
	${middleBorder}${menuItemIcon}${prefix}numero-dono
	${middleBorder}${menuItemIcon}${prefix}numerodono
	${middleBorder}${menuItemIcon}${prefix}pairingcode
	${middleBorder}${menuItemIcon}${prefix}prefix
	${middleBorder}${menuItemIcon}${prefix}prefixo
	${middleBorder}${menuItemIcon}${prefix}premiumlist
	${middleBorder}${menuItemIcon}${prefix}reboot
	${middleBorder}${menuItemIcon}${prefix}reconnectsubbot
	${middleBorder}${menuItemIcon}${prefix}removecmdvip
	${middleBorder}${menuItemIcon}${prefix}removercmd
	${middleBorder}${menuItemIcon}${prefix}removerindicacao
	${middleBorder}${menuItemIcon}${prefix}removesubbot
	${middleBorder}${menuItemIcon}${prefix}removevipcommand
	${middleBorder}${menuItemIcon}${prefix}removewhitelist
	${middleBorder}${menuItemIcon}${prefix}remsubdono
	${middleBorder}${menuItemIcon}${prefix}rentalconfig
	${middleBorder}${menuItemIcon}${prefix}rentalstats
	${middleBorder}${menuItemIcon}${prefix}rentaltest
	${middleBorder}${menuItemIcon}${prefix}resetarmenu
	${middleBorder}${menuItemIcon}${prefix}resetdesign
	${middleBorder}${menuItemIcon}${prefix}resetdesignmenu
	${middleBorder}${menuItemIcon}${prefix}restart
	${middleBorder}${menuItemIcon}${prefix}reviverqr
	${middleBorder}${menuItemIcon}${prefix}rmcmdlimit
	${middleBorder}${menuItemIcon}${prefix}rmcmdvip
	${middleBorder}${menuItemIcon}${prefix}rmindicacao
	${middleBorder}${menuItemIcon}${prefix}rmpremium
	${middleBorder}${menuItemIcon}${prefix}rmpremiumgp
	${middleBorder}${menuItemIcon}${prefix}rmsubbot
	${middleBorder}${menuItemIcon}${prefix}rmsubdono
	${middleBorder}${menuItemIcon}${prefix}rmvip
	${middleBorder}${menuItemIcon}${prefix}rmvipgp
	${middleBorder}${menuItemIcon}${prefix}seradm
	${middleBorder}${menuItemIcon}${prefix}sermembro
	${middleBorder}${menuItemIcon}${prefix}setborda
	${middleBorder}${menuItemIcon}${prefix}setbordabaixo
	${middleBorder}${menuItemIcon}${prefix}setbordafim
	${middleBorder}${menuItemIcon}${prefix}setbordameio
	${middleBorder}${menuItemIcon}${prefix}setbordamiddle
	${middleBorder}${menuItemIcon}${prefix}setbordatopo
	${middleBorder}${menuItemIcon}${prefix}setbottomborder
	${middleBorder}${menuItemIcon}${prefix}setcabecalho
	${middleBorder}${menuItemIcon}${prefix}setcmdmsg
	${middleBorder}${menuItemIcon}${prefix}setheader
	${middleBorder}${menuItemIcon}${prefix}setheadermenu
	${middleBorder}${menuItemIcon}${prefix}seticoneitem
	${middleBorder}${menuItemIcon}${prefix}seticoneseparador
	${middleBorder}${menuItemIcon}${prefix}seticonetitulo
	${middleBorder}${menuItemIcon}${prefix}setitem
	${middleBorder}${menuItemIcon}${prefix}setitemicon
	${middleBorder}${menuItemIcon}${prefix}setmiddleborder
	${middleBorder}${menuItemIcon}${prefix}setprefix
	${middleBorder}${menuItemIcon}${prefix}setseparador
	${middleBorder}${menuItemIcon}${prefix}settitleicon
	${middleBorder}${menuItemIcon}${prefix}settitulo
	${middleBorder}${menuItemIcon}${prefix}settopborder
	${middleBorder}${menuItemIcon}${prefix}sinais
	${middleBorder}${menuItemIcon}${prefix}statsvip
	${middleBorder}${menuItemIcon}${prefix}subbots
	${middleBorder}${menuItemIcon}${prefix}testarcmd
	${middleBorder}${menuItemIcon}${prefix}testcmd
	${middleBorder}${menuItemIcon}${prefix}tm
	${middleBorder}${menuItemIcon}${prefix}togglecmdvip
	${middleBorder}${menuItemIcon}${prefix}topindica
	${middleBorder}${menuItemIcon}${prefix}topindicacao
	${middleBorder}${menuItemIcon}${prefix}unblockuserg
	${middleBorder}${menuItemIcon}${prefix}update
	${middleBorder}${menuItemIcon}${prefix}updates
	${middleBorder}${menuItemIcon}${prefix}verdesign
	${middleBorder}${menuItemIcon}${prefix}videomenu
	${middleBorder}${menuItemIcon}${prefix}viewmsg
	${middleBorder}${menuItemIcon}${prefix}vipstats
	${middleBorder}${menuItemIcon}${prefix}whitelistlista
	${middleBorder}${menuItemIcon}${prefix}wl.add
	${middleBorder}${menuItemIcon}${prefix}wl.lista
	${middleBorder}${menuItemIcon}${prefix}wl.remove
	${middleBorder}${menuItemIcon}${prefix}wladd
	${middleBorder}${menuItemIcon}${prefix}wllist
	${middleBorder}${menuItemIcon}${prefix}wlremove
${bottomBorder}
`;
}
export default menuDono;