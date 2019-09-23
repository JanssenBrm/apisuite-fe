import { compose } from 'recompose'
import { connect } from 'react-redux'
import ApiDetail from './ApiDetail'
import withTheme from 'components/ThemeContext/withTheme'
import { getApiProduct } from '../../containers/LandingPage/ducks'

const mapStateToProps = ({ products }) => ({ product: products.product, ui: products.ui })

const mapDispatchToProps = (dispatch) => ({
  getApiProduct: (id) => dispatch(getApiProduct(id)),
})

const Enhanced = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTheme
)(ApiDetail)

export default Enhanced
