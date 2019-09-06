
module.exports = {
	plugin: require('hapi-i18n'),
	options: {
		locales: ['en', 'fr', 'de'],
		directory: __dirname + '/locales',
		defaultLocale: 'en',
		languageHeaderField: 'lang',
	},
	name: 'internationalization',
}
