import { compose } from 'recompose'
import { connect } from 'react-redux'
import withTheme from 'components/ThemeContext/withTheme'
import LandingPage from './LandingPage'
import { fetchApiProducts } from './ducks'

const mapStateToProps = ({ auth, products }) => ({
  auth, products: products.products, brands: products.brands,
})

const mapDispatchToProps = (dispatch) => ({
  fetchApiProducts: () => dispatch(fetchApiProducts()),
})

const Enhanced = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTheme
)(LandingPage)

export default Enhanced
