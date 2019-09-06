const App = require('@octokit/app')
const Octokit = require('@octokit/rest')
const boom = require('boom')
const externalResourceService = require('../../services/externalResource')
const log = require('../../utils/logger')

exports = module.exports = {}

/**
 * Get the installation id
 * @returns {Number|null} - The installation ID
 */
const getInstallationId = async () => {
	const githubApp = await externalResourceService.getGitHubApp()
	if (!githubApp) {
		throw boom.serverUnavailable()
	}
	const app = new App({ id: githubApp.app_id, privateKey: githubApp.private_key })
	const jwt = app.getSignedJsonWebToken()
	const octokit = new Octokit({
		auth: `Bearer ${jwt}`,
	})

	let installations = await octokit.apps.listInstallations()

	if (!installations || (installations && installations.data.length === 0)) {
		return null
	}
	let installation = installations.data.filter((inst) => {
		return inst.account.login === githubApp.account
	})

	if(installation.length === 0) {
		return null
	}

	return installation[0].id
}

/**
 * Get the octokit client with the access token
 * @returns {Object|null} - The octokit client
 */
const getOctokitWithToken = async () => {
	const githubApp = await externalResourceService.getGitHubApp()
	if (!githubApp) {
		throw boom.serverUnavailable()
	}
	const app = new App({ id: githubApp.app_id, privateKey: githubApp.private_key })
	const installationId =  await getInstallationId()
	if (!installationId) {
		return null
	}
	return new Octokit({
	/**
	 * returns token
	 * @returns {String} - token
	 */
		async auth () {
			const installationAccessToken = await app.getInstallationAccessToken({ 
				installationId,
			})
			return `token ${installationAccessToken}`
		},
	})
}

/**
 * 
 * @param {Object} octokit - The octokit for github calls
 * @returns {Object[]} - The commits list
 */
const getLatestCommits = async (octokit) => {
	const githubApp = await externalResourceService.getGitHubApp()
	const repos = await octokit.repos.listForUser({
		username: githubApp.account,
		sort: 'pushed',
	})
  
	return await Promise.all(repos.data.map(async (repo) => {
		const branches = await octokit.repos.listBranches({
			owner: githubApp.account,
			repo: repo.name,
		})

		const branch = branches.data.filter((b) => {
			return b.name === 'master'
		})

		const commit = await octokit.repos.getCommit({
			owner: githubApp.account,
			repo: repo.name,
			commit_sha: branch[0].commit.sha,
		})

		return {
			repo_id: repo.id,
			name: repo.name,
			description: repo.description,
			url: repo.html_url,
			commit_sha: commit.data.sha.slice(0, 7),
			commit_url: commit.data.html_url,
		}
	}))
}

/**
 * Sync the external resources data
 * @returns {void}
 */
const syncExternalResources = async () => {
	const octokit = await getOctokitWithToken()

	if (!octokit) {
		throw boom.serverUnavailable()
	}

	const commits = await getLatestCommits(octokit)
	await Promise.all(commits.map(async(resource) => await externalResourceService.upsertExternalResources(resource)))

	const commitIds = commits.map((com) => com.repo_id)
	const deletedExtResources = await externalResourceService.listDeletedExternalResources(commitIds)
	const deleted = deletedExtResources.serialize()
	if (deleted.length) {
		try {
			await Promise.all(deleted.map(async (er) => await externalResourceService.deleteExternalResource(er.id)))
		} catch (e) {
			log.warn(e, 'Failed to delete external resource')
		}
	}

	log.info('External resources synced')
}

exports.getOctokitWithToken = getOctokitWithToken
exports.getLatestCommits = getLatestCommits
exports.syncExternalResources = syncExternalResources
