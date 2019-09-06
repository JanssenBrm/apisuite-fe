// const crypto = require('crypto')
const { afterEach, before, describe, it } = exports.lab = require('lab').script()
const { expect } = require('code')
const chance = require('chance').Chance()
const cryptoUtils = require('../../../../src/utils/crypto')

const TOTP_KEY = 'd41d8cd98f00b204e9800998ecf8427e'
const user_secret = 'I5LTGKSXIAYUKY3OMJIDAQTBEY7WOVJYJFCEC3BYHNSEUVZ4INNQ'

const stubs = {}

describe('(UNIT) utils.crypto.encrypt/decrypt', async () => {

	afterEach(() => {
		Object.keys(stubs).map(stb => stubs[stb].restore())
	})

	describe('Successful Encryption', async ()=> {
		let sut
		before(async () => {
			sut = await cryptoUtils.encrypt(TOTP_KEY, user_secret )
		})

		it('Should encrypt given text using aes-256-ctr', async () => {
			expect(sut).not.to.be.undefined()
		})
	})

	describe('Unsucessful Encryption', async () => {

		describe('Undefined encryption key', async () => {
			let error, sut

			before(async ()=>{
				const input = user_secret

				try {
					sut = cryptoUtils.encrypt(undefined, input)
				} catch (err) {
					error = err
				}
			})

			it('should not return an encrypted value', async ()=>{
				expect(sut).to.be.undefined()
			})

			it('Should throw an error', async () => {
				expect(error.message).to.be.equal('key is mandatory')
			})
		})

		describe('Null encryption key', async () => {
			let error, sut

			before(async ()=>{
				const input = user_secret

				try {
					sut = cryptoUtils.encrypt(null, input)
				} catch (err) {
					error = err
				}
			})

			it('should not return an encrypted value', async ()=>{
				expect(sut).to.be.undefined()
			})

			it('Should throw an error', async () => {
				expect(error.message).to.be.equal('key is mandatory')
			})
		})

		describe('less than 32 characters encryption key', async () => {
			let error, sut
			before(async ()=>{
				const input = user_secret
				const key = chance.string({length: 31})
				try {
					sut = cryptoUtils.encrypt(key, input)
				} catch (err) {
					error = err
				}
			})

			it('should not return an encrypted value', async ()=>{
				expect(sut).to.be.undefined()
			})

			it('Should throw an error', async () => {
				expect(error.message).to.be.equal('Invalid key length')
			})
		})

		describe('Encryption key is an array', async () => {
			let error, sut

			before(async ()=>{
				const input = user_secret
				const key = [chance.string({length:32})]

				try {
					sut = cryptoUtils.encrypt(key, input)
				} catch (err) {
					error = err
				}
			})

			it('should not return an encrypted value', async ()=>{
				expect(sut).to.be.undefined()
			})

			it('Should throw an error', async () => {
				expect(error.message).to.be.equal('key should be a string')
			})
		})

		describe('Encryption key is an object', async () => {
			let error, sut

			before(async ()=>{
				const input = user_secret
				const key = { }

				try {
					sut = cryptoUtils.encrypt(key, input)
				} catch (err) {
					error = err
				}
			})

			it('should not return an encrypted value', async ()=>{
				expect(sut).to.be.undefined()
			})

			it('Should throw an error', async () => {
				expect(error.message).to.be.equal('key should be a string')
			})
		})

		describe('Encryption key is a number', async () => {
			let error, sut

			before(async ()=>{
				const input = user_secret
				const key = chance.integer()

				try {
					sut = cryptoUtils.encrypt(key, input)
				} catch (err) {
					error = err
				}
			})

			it('should not return an encrypted value', async ()=>{
				expect(sut).to.be.undefined()
			})

			it('Should throw an error', async () => {
				expect(error.message).to.be.equal('key should be a string')
			})
		})

		describe('Text is an array', async () => {
			let error, sut

			before(async ()=>{
				const input = [user_secret]
				const key = chance.string({length:32})

				try {
					sut = cryptoUtils.encrypt(key, input)
				} catch (err) {
					error = err
				}
			})

			it('should not return an encrypted value', async ()=>{
				expect(sut).to.be.undefined()
			})

			it('Should throw an error', async () => {
				expect(error.message).to.be.equal('text should be a string')
			})
		})

		describe('Text is an object', async () => {
			let error, sut

			before(async ()=>{
				const input = {prop: user_secret}
				const key = chance.string({length:32})

				try {
					sut = cryptoUtils.encrypt(key, input)
				} catch (err) {
					error = err
				}
			})

			it('should not return an encrypted value', async ()=>{
				expect(sut).to.be.undefined()
			})

			it('Should throw an error', async () => {
				expect(error.message).to.be.equal('text should be a string')
			})
		})

		describe('Text is a number', async () => {
			let error, sut

			before(async ()=>{
				const input = chance.integer()
				const key = chance.string({length:32})

				try {
					sut = cryptoUtils.encrypt(key, input)
				} catch (err) {
					error = err
				}
			})

			it('should not return an encrypted value', async ()=>{
				expect(sut).to.be.undefined()
			})

			it('Should throw an error', async () => {
				expect(error.message).to.be.equal('text should be a string')
			})
		})

		describe('Text is undefined', async () => {
			let error, sut

			before(async ()=>{
				const input = undefined
				const key = chance.string({length:32})

				try {
					sut = cryptoUtils.encrypt(key, input)
				} catch (err) {
					error = err
				}
			})

			it('should not return an encrypted value', async ()=>{
				expect(sut).to.be.undefined()
			})

			it('Should throw an error', async () => {
				expect(error.message).to.be.equal('text is mandatory')
			})
		})

		describe('Text is null', async () => {
			let error, sut

			before(async ()=>{
				const input = null
				const key = chance.string({length:32})

				try {
					sut = cryptoUtils.encrypt(key, input)
				} catch (err) {
					error = err
				}
			})

			it('should not return an encrypted value', async ()=>{
				expect(sut).to.be.undefined()
			})

			it('Should throw an error', async () => {
				expect(error.message).to.be.equal('text is mandatory')
			})
		})

		describe('Successful Decryption', async () => {

			let sut, expected
			before(async () => {
				expected = user_secret
				const enc = cryptoUtils.encrypt(TOTP_KEY, user_secret)
				sut = cryptoUtils.decrypt(TOTP_KEY, enc)
			})

			it('should be equal to decrypted secret', async () => {
				expect(sut).to.be.equal(expected)
			})
		})

		describe('Unsucessful Decryption', async () => {
			let sut, expected

			before(async () => {
				expected = user_secret
				const enc = cryptoUtils.encrypt(TOTP_KEY, user_secret)
				sut = cryptoUtils.decrypt(chance.string({length:32}), enc)
			})

			it('should be equal to decrypted secret', async () => {
				expect(sut).not.to.be.equal(expected)
			})
		})
	})


})
