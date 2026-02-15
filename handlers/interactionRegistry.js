export const commands = {
	// Basic
	help: () => import("../interactions/commands/Basic/help.js"),
	profile: () => import("../interactions/commands/Basic/profile.js"),
	say: () => import("../interactions/commands/Basic/say.js"),

	// Fun
	action: () => import("../interactions/commands/Fun/action.js"),
	coinflip: () => import("../interactions/commands/Fun/coinflip.js"),
	connect4: () => import("../interactions/commands/Fun/connect4.js"),
	genderize: () => import("../interactions/commands/Fun/genderize.js"),
	search: () => import("../interactions/commands/Fun/search.js"),

	// Utilities
	avatar: () => import("../interactions/commands/Utilities/avatar.js"),
	instagram: () => import("../interactions/commands/Utilities/instagram.js"),
	reel: () => import("../interactions/commands/Utilities/reel.js"),
	roblox: () => import("../interactions/commands/Utilities/roblox.js"),
};

export const buttons = {
	action: {
		index: () => import("../interactions/buttons/action/index.js"),
	},

	connect4: {
		index: () => import("../interactions/buttons/connect4/index.js"),
		accept: () => import("../interactions/buttons/connect4/accept.js"),
		play: () => import("../interactions/buttons/connect4/play.js"),
		refuse: () => import("../interactions/buttons/connect4/refuse.js"),
	},
};

export const selectMenus = {
	help: {
		index: () => import("../interactions/selectmenus/help/index.js"),
	},
};

export default {
	commands,
	buttons,
	selectMenus,
};
