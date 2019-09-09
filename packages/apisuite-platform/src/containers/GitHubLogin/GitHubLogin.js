import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import qs from 'qs'

class GitHubLogin extends Component {
  UNSAFE_componentWillMount () {
    const query = qs.parse(this.props.location.search, { ignoreQueryPrefix: true })
    const { access_token } = query

    if (!this.props.auth.isAuthorizing && !this.props.auth.authToken) {
      this.props.ghLogin(access_token)
    }
  }

  render () {
    return (
      <div style={styles.container}>
        <FormattedMessage id='login.github.loading' />
      </div>
    )
  }
}

const styles = {
  container: {
    textAlign: 'center',
    padding: '200px 0',
  },
}

GitHubLogin.propTypes = {
  location: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  ghLogin: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
}

export default GitHubLogin
