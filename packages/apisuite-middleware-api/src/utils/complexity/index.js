exports = module.exports = {}

exports.validate = (pwd, options) => {
	
	let complexity = options || {
		min: 12,
		max: 64,
		lowerCase: 1,
		upperCase: 1,
		symbols: 1,
		numbers: 1,
	}

	const errors = []

	
	const lower = pwd.match(/[a-z]/g)
	const upper = pwd.match(/[A-Z]/g)
	const number = pwd.match(/[0-9]/g)
	const symbol = pwd.match(/[^a-zA-Z0-9]/g)

	if (pwd.length < (complexity.min || 0)) errors.push(`Password must have at least ${complexity.min} characters`)
	if (pwd.length > (complexity.max || 100)) errors.push(`Password must have a maximum of ${complexity.max} characters`)
	if (!lower || lower.length < (complexity.lowerCase || 0)) errors.push(`Password must have at least ${complexity.lowerCase} lower case characters`)
	if (!upper || upper.length < (complexity.upperCase || 0)) errors.push(`Password must have at least ${complexity.upperCase} upper case characters`)
	if (!number || number.length < (complexity.numbers || 0)) errors.push(`Password must have at least ${complexity.numbers} numbers`)
	if (!symbol || symbol.length < (complexity.symbols || 0)) errors.push(`Password must have at least ${complexity.symbols} symbols`)
	

	return errors
}


