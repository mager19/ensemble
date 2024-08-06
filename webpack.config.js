// Import the original config from the @wordpress/scripts package.
const defaultConfig = require('@wordpress/scripts/config/webpack.config');

// Import the helper to find and generate the entry points in the src directory
const { getWebpackEntryPoints } = require('@wordpress/scripts/utils/config');

const CopyPlugin = require('copy-webpack-plugin');

// Add any a new entry point by extending the webpack config.
module.exports = {
	...defaultConfig,
	entry: {
		...getWebpackEntryPoints(),
		// Add your new entry point here
		'index': './src/index.js',
	},
	plugins: [
		...defaultConfig.plugins,
		new CopyPlugin({
			patterns: [
				{ from: 'src/blocks/mansoryBlock/assets', to: 'blocks/mansoryBlock/assets' },
				{ from: 'src/blocks/mansoryBlock/partials', to: 'blocks/mansoryBlock/partials' },
			],
		}),
	],
};
