import React, { Component } from 'react'
import { object, func, array } from 'prop-types'
import HeaderSection from 'components/HeaderSection'
import SectionPortal from 'components/SectionPortal'
import SectionApis from 'components/SectionApis'

class LandingPage extends Component {
  componentDidMount () {
    this.props.fetchApiProducts()
  }

  navigate = route => event => {
    this.props.history.push(route)
  }

  goToSignup = () => {
    this.props.history.push('signup')
  }

  goToApi = (route) => {
    if (route) {
      this.props.history.push(`api-detail${route ? `/${route}` : ''}`)
    }
  }

  render () {
    const { auth, products, brands } = this.props

    // Display active APIs first
    const orderedProducts = products.sort((a, b) => b.version ? 1 : -1)

    return (
      <div className='home-container'>
        <HeaderSection />
        <SectionPortal isLoggedIn={Boolean(auth.user.id)} navigate={this.navigate} />
        <SectionApis
          brands={brands}
          products={orderedProducts} goToSignup={this.goToSignup}
          goToApi={this.goToApi}
        />
      </div>
    )
  }
}

LandingPage.propTypes = {
  history: object,
  auth: object.isRequired,
  theme: object.isRequired,
  fetchApiProducts: func.isRequired,
  products: array.isRequired,
  brands: array.isRequired,
}

export default LandingPage
