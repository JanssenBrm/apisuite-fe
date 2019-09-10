import React from 'react'
import { FormattedMessage } from 'react-intl'

const DataPrivacy = () => (
  <div className='topic-container'>
    <h1 id='introduction'><FormattedMessage id='cookies.title' /></h1>

    <h3><FormattedMessage id='cookies.introduction.title' /></h3>
    <p><FormattedMessage id='cookies.introduction.p1' /></p>
    <p><FormattedMessage id='cookies.introduction.p2' /></p>
    <p><FormattedMessage id='cookies.introduction.p3' /></p>

    <h3 id='cookie'><FormattedMessage id='cookies.cookie.title' /></h3>
    <p><FormattedMessage id='cookies.cookie.p1' /></p>
    <p><FormattedMessage id='cookies.cookie.p2' /></p>
    <p>
      <FormattedMessage id='cookies.cookie.p3' />
      <ol type='i'>
        <li><FormattedMessage id='cookies.cookie.p3.li1' /></li>
        <li><FormattedMessage id='cookies.cookie.p3.li2' /></li>
        <li><FormattedMessage id='cookies.cookie.p3.li3' /></li>
        <li><FormattedMessage id='cookies.cookie.p3.li4' /></li>
        <li><FormattedMessage id='cookies.cookie.p3.li5' /></li>
      </ol>
    </p>

    <h3 id='cookiesonportal'><FormattedMessage id='cookies.cookiesonportal.title' /></h3>
    <p><FormattedMessage id='cookies.cookiesonportal.p1' /></p>
    <p><FormattedMessage id='cookies.cookiesonportal.p2' /></p>

    <table className='privacy-table'>
      <tr>
        <td>Tool</td>
        <td style={{ width: 120 }}>Purpose of the solution</td>
        <td>Cookie</td>
        <td>Purpose</td>
        <td>Validity</td>
      </tr>
      <tr>
        <td>N/A</td>
        <td>N/A</td>
        <td>a_t</td>
        <td>
          This cookie is the user’s token enabling persistent login. It allows the user to stay logged in on the portal
        </td>
        <td>60 min</td>
      </tr>
    </table>

    <h3 id='responsibility'><FormattedMessage id='cookies.responsibility.title' /></h3>
    <p><FormattedMessage id='cookies.responsibility.p1' /></p>
    <div><FormattedMessage id='cookies.responsibility.address.name' /></div>
    <div><FormattedMessage id='cookies.responsibility.address.street' /></div>
    <div><FormattedMessage id='cookies.responsibility.address.zip' /></div>
    <div><FormattedMessage id='cookies.responsibility.address.mail' /></div>
    <p><FormattedMessage id='cookies.responsibility.p2' /></p>

    <h3 id='rights'><FormattedMessage id='cookies.rights.title' /></h3>
    <p><FormattedMessage id='cookies.rights.p1' /></p>
  </div>
)

export default DataPrivacy
