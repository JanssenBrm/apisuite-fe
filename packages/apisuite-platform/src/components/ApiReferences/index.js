import { compose } from 'recompose'
import { connect } from 'react-redux'
import withTheme from '../ThemeContext/withTheme'
import ApiReferences from './ApiReferences'
import { fetchApiProducts } from '../../containers/LandingPage/ducks'

const mapStateToProps = ({ products }) => ({ products: products.products, brands: products.brands, ui: products.ui })

const mapDispatchToProps = (dispatch) => ({
  fetchApiProducts: () => dispatch(fetchApiProducts()),
})

const Enhanced = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTheme
)(ApiReferences)

export default Enhanced
