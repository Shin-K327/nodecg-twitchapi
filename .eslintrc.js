module.exports = {
	'env': {
		'browser': true,
		'es2021': true,
		'node': true
	},
	'extends': [
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'airbnb',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier'
	],
	'parser': '@typescript-eslint/parser',
	'parserOptions': {
		'ecmaFeatures': {
			'jsx': true
		},
		'ecmaVersion': 13,
		'sourceType': 'module'
	},
	'plugins': [
		'react',
		'react-hooks',
		'@typescript-eslint',
		'prettier'
	],
	'rules': {
		'react/prop-types': 'off',
		'prettier/prettier': [
			'error'
		]
	}
};
