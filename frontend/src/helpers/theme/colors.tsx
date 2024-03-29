const blue = {
	main: "deepskyblue",
} as const;

const light = {
	white: "white",
	tint: "azure",
	faded: "#ccc",
} as const;

const grey = {
	darker: "#333",
	dark: "#444",
	regular: "#555",
	light: "#666",
} as const;

const dark = {
	black: "black",
	darker: "#111",
	dark: "#222",
	darkish: "#282828",
	grey,
} as const;

export const colors = {
	blue,
	light,
	dark,
} as const;
