import React, { Component } from 'react'
import { string, func, array, object, oneOfType } from 'prop-types'
import { FormattedMessage } from 'react-intl'

class Pagination extends Component {
  goToPage = page => event => {
    const { query } = this.props
    this.props.onChangePage(page, query)
  }

  render () {
    const { pager } = this.props

    // render pagination if pageCount is bigger than 1
    if (pager.pageCount <= 1) return null

    return (
      <div className='pagination'>
        <div className={`pagination-btn ${pager.page === 1 && 'disabled'}`} onClick={this.goToPage(pager.page - 1)}>
          <FormattedMessage id='pagination.prev' />
        </div>
        {Array.from(Array(pager.pageCount).keys()).map((page, idx) =>
          <div key={idx} className={`pagination-btn ${pager.page - 1 === page && 'active'}`} onClick={this.goToPage(page + 1)}>
            <span>{page + 1}</span>
          </div>
        )}
        <div className={`pagination-btn ${pager.page === pager.pageCount && 'disabled'}`} onClick={this.goToPage(pager.page + 1)}>
          <FormattedMessage id='pagination.next' />
        </div>
      </div>
    )
  }
}

Pagination.defaultProps = {
  initialPage: 1,
}

Pagination.propTypes = {
  items: array.isRequired,
  pager: object.isRequired,
  onChangePage: func.isRequired,
  query: oneOfType([string]),
}

export default Pagination
