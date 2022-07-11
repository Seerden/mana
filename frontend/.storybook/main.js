const path = require("path");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = {
	stories: [
		"../src/**/**/*.stories.mdx",
		"../src/**/**/*.stories.@(js|jsx|ts|tsx)",
		"../src/**/*.stories.@(js|jsx|ts|tsx)",
	],
	addons: [
		"@storybook/addon-links",
		"@storybook/addon-essentials",
		"@storybook/addon-interactions",
		"storybook-addon-styled-component-theme/dist/preset",
	],
	framework: "@storybook/react",
	core: {
		builder: "webpack5",
	},
	webpackFinal: async (config, { configType }) => {
		// `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
		// You can change the configuration based on that.
		// 'PRODUCTION' is used when building the static version of storybook.

		// Make whatever fine-grained changes you need
		config.module.rules.push({
			test: /\.scss$/,
			use: ["style-loader", "css-loader", "sass-loader"],
			include: path.resolve(__dirname, "../"),
		});

		config.resolve.plugins = [
			...(config.resolve.plugins || []),
			new TsconfigPathsPlugin({
				extensions: config.resolve.extensions,
			}),
		];

		// Return the altered config
		return config;
	},
};
