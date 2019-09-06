const crypto = require('crypto')
const { afterEach, before, describe, it } = exports.lab = require('lab').script()
const { expect } = require('code')
const chance = require('chance').Chance()
const complexity = require('../../../../src/utils/complexity')

const stubs = {}

describe('(UNIT) utils.complexity', async () => {

	afterEach(() => {
		Object.keys(stubs).map(stb => stubs[stb].restore())
	})

	describe('Successful pwd complexity 1 upper, 1 lower, 6 min, 26 max, 1 symbol, 1 number', async ()=> {
		let sut
		const pwd = 'aA$1bb'

		before(async () => {
			
			const complexityOptions = {
				min:1,
				max:26,
				lowerCase: 1,
				upperCase: 1,
				symbols: 1,
				numbers: 1,
			}

			sut = complexity.validate(pwd, complexityOptions)

		})

		it('Should validate complex password', async () => {
			expect(sut.length).to.equal(0)
		})

	})

	describe('Unsuccessful pwd complexity validation minimum length', async ()=> {
		let sut
		const pwd = 'aA$1b'

		before(async () => {
			
			const complexityOptions = {
				min: 6,
				max:26,
				lowerCase: 1,
				upperCase: 1,
				symbols: 1,
				numbers: 1,
			}

			sut = complexity.validate(pwd, complexityOptions)

		})

		it('Should validate complex password', () => {
			expect(sut.length).to.equal(1)
		})

		it('Should indicate that minimum length was violated', ()=> {
			expect(sut.indexOf('Password must have at least 6 characters')).to.be.greaterThan(-1)
		})

	})

	describe('Unsuccessful pwd complexity validation maximum length', async ()=> {
		let sut
		const pwd = 'aA$1baaaaaaaaaa'

		before(async () => {
			
			const complexityOptions = {
				min: 6,
				max: 10,
				lowerCase: 1,
				upperCase: 1,
				symbols: 1,
				numbers: 1,
			}

			sut = complexity.validate(pwd, complexityOptions)

		})

		it('Should validate complex password', () => {
			expect(sut.length).to.equal(1)
		})

		it('Should indicate that maximum length was violated', ()=> {
			expect(sut.indexOf('Password must have a maximum of 10 characters')).to.be.greaterThan(-1)
		})

	})

	describe('Unsuccessful pwd complexity validation at least 1 symbol', async ()=> {
		let sut
		const pwd = 'aA1baa'

		before(async () => {
			
			const complexityOptions = {
				min: 6,
				max: 10,
				lowerCase: 1,
				upperCase: 1,
				symbols: 1,
				numbers: 1,
			}

			sut = complexity.validate(pwd, complexityOptions)

		})

		it('Should validate complex password', () => {
			expect(sut.length).to.equal(1)
		})

		it('Should indicate that at least 1 symbol is required', ()=> {
			expect(sut.indexOf('Password must have at least 1 symbols')).to.be.greaterThan(-1)
		})

	})

	describe('Unsuccessful pwd complexity validation at least 1 upper letter', async ()=> {
		let sut
		const pwd = 'aa$1baa'

		before(async () => {
			
			const complexityOptions = {
				min: 6,
				max: 10,
				lowerCase: 1,
				upperCase: 1,
				symbols: 1,
				numbers: 1,
			}

			sut = complexity.validate(pwd, complexityOptions)

		})

		it('Should validate complex password', () => {
			expect(sut.length).to.equal(1)
		})

		it('Should indicate that at least 1 upper letter is required', ()=> {
			expect(sut.indexOf('Password must have at least 1 upper case characters')).to.be.greaterThan(-1)
		})

	})

	describe('Unsuccessful pwd complexity validation at least 1 lower letter', async ()=> {
		let sut
		const pwd = 'AA$1BAA'

		before(async () => {
			
			const complexityOptions = {
				min: 6,
				max: 10,
				lowerCase: 1,
				upperCase: 1,
				symbols: 1,
				numbers: 1,
			}

			sut = complexity.validate(pwd, complexityOptions)

		})

		it('Should validate complex password', () => {
			expect(sut.length).to.equal(1)
		})

		it('Should indicate that at least 1 upper letter is required', ()=> {
			expect(sut.indexOf('Password must have at least 1 lower case characters')).to.be.greaterThan(-1)
		})

	})

	describe('Unsuccessful pwd complexity validation at least 1 number', async ()=> {
		let sut
		const pwd = 'aA$xBAA'

		before(async () => {
			
			const complexityOptions = {
				min: 6,
				max: 10,
				lowerCase: 1,
				upperCase: 1,
				symbols: 1,
				numbers: 1,
			}

			sut = complexity.validate(pwd, complexityOptions)

		})

		it('Should validate complex password', () => {
			expect(sut.length).to.equal(1)
		})

		it('Should indicate that at least 1 number is required', ()=> {
			expect(sut.indexOf('Password must have at least 1 numbers')).to.be.greaterThan(-1)
		})

	})

	describe('Unsuccessful pwd complexity validation should return 2 errors', async ()=> {
		let sut
		const pwd = 'aAdxBAA'

		before(async () => {
			
			const complexityOptions = {
				min: 6,
				max: 10,
				lowerCase: 1,
				upperCase: 1,
				symbols: 1,
				numbers: 1,
			}

			sut = complexity.validate(pwd, complexityOptions)

		})

		it('Should indicate that at least 2 errors exist', ()=> {
			expect(sut.length).to.equal(2)
		})

	})

	describe('Unsuccessful pwd complexity validation should return 3 errors', async ()=> {
		let sut
		const pwd = 'aadxbaa'

		before(async () => {
			
			const complexityOptions = {
				min: 6,
				max: 10,
				lowerCase: 1,
				upperCase: 1,
				symbols: 1,
				numbers: 1,
			}

			sut = complexity.validate(pwd, complexityOptions)
		})

		it('Should indicate that at least 3 errors exist', ()=> {
			expect(sut.length).to.equal(3)
		})

	})

})
