module.exports = {
	root: true,
	extends: [
		'eslint:recommended',
		'airbnb-base'
	],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	parserOptions: {
		project: './tsconfig.json',
		tsconfigRootDir: process.cwd()
	},
	env: {
		browser: true,
		node: true,
		es2022: true
	},
	rules: {
		"max-len": ["error", { "code": 80 }]
	},
	overrides: [
		{
			files: [
				'*.ts',
				'*.tsx',
			],
			extends: [
				'airbnb-typescript/base',
			],
			rules: {},
		},
	],
};
