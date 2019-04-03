const path = require('path');
const fs = require('fs-extra');
const { PluginNpmScripts } = require('./plugins/plugin-npm-scripts');
const { PluginTerminal } = require('./plugins/plugin-terminal');
const { PluginReadme } = require('./plugins/plugin-readme');
const { PluginCodeCoverage } = require('./plugins/plugin-code-coverage');

const getPluginPathes = async () => {
	const cwd = await fs.realpath(process.cwd());
	const pathPlugins = path.join(cwd, 'plugins');
	const pathes = await fs.readdir(pathPlugins);

	return (await Promise.all(
		pathes.map(async (pathPlugin) =>
			(await fs.stat(path.join(pathPlugins, pathPlugin))).isDirectory() ? pathPlugin : undefined
		)
	)).filter((value) => typeof value === 'string');
};

const pluginTabs = async () => {
	return (await getPluginPathes()).map((pluginName) => ({
		title: pluginName,
		rows: [
			[
				new PluginReadme({
					file: path.join('plugins', pluginName, 'README.md'),
					width: [12, 6, 8],
					height: 400,
				}),
				new PluginNpmScripts({
					scripts: [
						{
							title: 'build',
							cmd: 'npm run build',
							cwd: path.join('plugins', pluginName),
						},
						{
							title: 'run client-side tests',
							cmd: 'npm run test:client',
							cwd: path.join('plugins', pluginName),
						},
						{
							title: 'update client-side snapshots',
							cmd: 'npm run test-update-snapshots:client',
							cwd: path.join('plugins', pluginName),
						},
						{
							title: 'run server-side tests',
							cmd: 'npm run test:server',
							cwd: path.join('plugins', pluginName),
						},
						{
							title: 'analyze-bundle-size',
							cmd: 'npm run analyze-bundle-size',
							cwd: path.join('plugins', pluginName),
						},
					],
					width: [12, 6, 4],
				}),
			],
			[
				new PluginTerminal({
					cmd: 'npm run watch-build',
					cwd: path.join('plugins', pluginName),
					autostart: false,
				}),
				new PluginTerminal({
					cmd: 'npm run watch-dist',
					cwd: path.join('plugins', pluginName),
					autostart: false,
				}),
			],
			[
				new PluginTerminal({
					cmd: 'npm start',
					cwd: path.join('plugins', pluginName),
					autostart: false,
				}),
			],
			[
				new PluginTerminal({
					cmd: 'npm run watch-test-client',
					cwd: path.join('plugins', pluginName),
					autostart: false,
				}),
				new PluginCodeCoverage({
					title: 'Client-side code coverage',
					cwd: path.join('plugins', pluginName),
				}),
			],
			[
				new PluginTerminal({
					cmd: 'npm run watch-test-server',
					cwd: path.join('plugins', pluginName),
					autostart: false,
				}),
				new PluginCodeCoverage({
					title: 'Server-side code coverage',
					cwd: path.join('plugins', pluginName),
					lcovHtmlPath: 'coverage-server/lcov-report/index.html',
				}),
			],
		],
	}));
};

async function getConfig() {
	return {
		tabs: [
			{
				title: 'Root',
				rows: [
					[
						new PluginReadme({
							file: 'README.md',
							width: [12, 6, 8],
							height: 400,
						}),
						new PluginNpmScripts({
							dark: false,
							scripts: [
								{
									title: 'bootstrap',
									cmd: 'npm run bootstrap',
								},
								{
									title: 'test',
									cmd: 'npm run test',
								},
								{
									title: 'lint',
									cmd: 'npm run lint',
								},
								{
									title: 'prettier',
									cmd: 'npm run prettier',
								},
								{
									title: 'sort-package-json',
									cmd: 'npm run sort-package-json',
								},
								{
									title: 'build',
									cmd: 'npm run build',
								},
							],
							width: [12, 6, 4],
						}),
					],
				],
			},
			{
				title: 'client',
				rows: [
					[
						new PluginReadme({
							file: '/packages/client/README.md',
							width: [12, 6, 8],
							height: 400,
						}),
						new PluginNpmScripts({
							scripts: [
								{
									title: 'build',
									cmd: 'npm run build',
									cwd: '/packages/client',
								},
								{
									title: 'analyze-bundle-size',
									cmd: 'npm run analyze-bundle-size',
									cwd: '/packages/client',
								},
							],
							width: [12, 6, 4],
						}),
					],
					[
						new PluginTerminal({
							cmd: 'npm start',
							cwd: '/packages/client',
							autostart: false,
						}),
						new PluginTerminal({
							cmd: 'npm run watch-build',
							cwd: '/packages/client',
							autostart: false,
						}),
						new PluginTerminal({
							cmd: 'npm run watch-dist',
							cwd: '/packages/client',
							autostart: false,
						}),
					],
				],
			},
			{
				title: 'server',
				rows: [
					[
						new PluginReadme({
							file: '/packages/server/README.md',
							width: [12, 6, 8],
							height: 400,
						}),
						new PluginNpmScripts({
							scripts: [
								{
									title: 'build',
									cmd: 'npm run build',
									cwd: '/packages/server',
								},
							],
							width: [12, 6, 4],
						}),
					],
					[
						new PluginTerminal({
							cmd: 'npm run watch-build',
							cwd: '/packages/server',
							autostart: false,
							width: [12, 6, 6],
						}),
					],
				],
			},
			{
				title: 'ui',
				rows: [
					[
						new PluginReadme({
							file: '/packages/ui/README.md',
							width: [12, 6, 8],
							height: 400,
						}),
						new PluginNpmScripts({
							scripts: [
								{
									title: 'test',
									cmd: 'npm run test',
									cwd: '/packages/ui',
								},
								{
									title: 'test-update-snapshots',
									cmd: 'npm run test-update-snapshots',
									cwd: '/packages/ui',
								},
								{
									title: 'build',
									cmd: 'npm run build',
									cwd: '/packages/ui',
								},
								{
									title: 'build storybook',
									cmd: 'npm run build-storybook',
									cwd: '/packages/ui',
								},
								{
									title: 'analyze-bundle-size',
									cmd: 'npm run analyze-bundle-size',
									cwd: '/packages/ui',
								},
							],
							width: [12, 6, 4],
						}),
					],
					[
						new PluginTerminal({
							cmd: 'npm start',
							cwd: '/packages/ui',
							autostart: false,
						}),
						new PluginTerminal({
							cmd: 'npm run watch-build',
							cwd: '/packages/ui',
							autostart: false,
						}),
					],
					[
						new PluginTerminal({
							cmd: 'npm run watch-test',
							cwd: '/packages/ui',
							autostart: false,
						}),
						new PluginCodeCoverage({
							cwd: '/packages/ui',
						}),
					],
				],
			},
		].concat(await pluginTabs()),
	};
}

module.exports = getConfig;
