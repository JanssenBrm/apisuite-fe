import React from 'react'
import { FormattedMessage } from 'react-intl'

const DataPrivacy = () => (
  <div className='topic-container'>
    <h1 id='introduction'><FormattedMessage id={'privacy.notice.title'} /></h1>

    <p><FormattedMessage id={'privacy.introduction.1'} /></p>
    <p><FormattedMessage id={'privacy.introduction.2'} /></p>
    <p><FormattedMessage id={'privacy.introduction.3'} /></p>
    <p><FormattedMessage id={'privacy.introduction.4'} /></p>

    <h4 id='personaldata'><FormattedMessage id={'privacy.personaldata.title'} /></h4>
    <p><FormattedMessage id={'privacy.personaldata.p1'} /></p>
    <p>
      <FormattedMessage id={'privacy.personaldata.p2'} />
      <ul>
        <li>
          <FormattedMessage id={'privacy.personaldata.p2.li1'} />
          <ul>
            <li><FormattedMessage id={'privacy.personaldata.p2.li1.1'} /></li>
            <li><FormattedMessage id={'privacy.personaldata.p2.li1.2'} /></li>
            <li><FormattedMessage id={'privacy.personaldata.p2.li1.3'} /></li>
            <li><FormattedMessage id={'privacy.personaldata.p2.li1.4'} /></li>
            <li><FormattedMessage id={'privacy.personaldata.p2.li1.5'} /></li>
            <li><FormattedMessage id={'privacy.personaldata.p2.li1.6'} /></li>
          </ul>
        </li>
        <li>
          <FormattedMessage id={'privacy.personaldata.p2.li2'} />
          <ul>
            <li><FormattedMessage id={'privacy.personaldata.p2.li2.1'} /></li>
          </ul>
        </li>
        <li>
          <FormattedMessage id={'privacy.personaldata.p2.li3'} />
          <ul>
            <li><FormattedMessage id={'privacy.personaldata.p2.li3.1'} /></li>
            <li><FormattedMessage id={'privacy.personaldata.p2.li3.2'} /></li>
            <li><FormattedMessage id={'privacy.personaldata.p2.li3.3'} /></li>
            <li><FormattedMessage id={'privacy.personaldata.p2.li3.4'} /></li>
            <li><FormattedMessage id={'privacy.personaldata.p2.li3.5'} /></li>
          </ul>
        </li>
      </ul>
    </p>
    <p><FormattedMessage id={'privacy.personaldata.p3'} /></p>

    <h4 id='basis'><FormattedMessage id={'privacy.basis.title'} /></h4>
    <h5><FormattedMessage id={'privacy.basis.subtitle1'} /></h5>
    <p><FormattedMessage id={'privacy.basis.p1'} /></p>
    <h5><FormattedMessage id={'privacy.basis.subtitle2'} /></h5>
    <p><FormattedMessage id={'privacy.basis.p2'} /></p>
    <ul>
      <li><FormattedMessage id={'privacy.basis.p2.li1'} /></li>
      <li><FormattedMessage id={'privacy.basis.p2.li2'} /></li>
      <li><FormattedMessage id={'privacy.basis.p2.li3'} /></li>
      <li><FormattedMessage id={'privacy.basis.p2.li4'} /></li>
    </ul>
    <h5><FormattedMessage id={'privacy.basis.subtitle3'} /></h5>
    <p><FormattedMessage id={'privacy.basis.p3'} /></p>
    <ul>
      <li><FormattedMessage id={'privacy.basis.p3.li1'} /></li>
    </ul>
    <h5><FormattedMessage id={'privacy.basis.subtitle4'} /></h5>
    <p><FormattedMessage id={'privacy.basis.p4.1'} /></p>
    <ul>
      <li><FormattedMessage id={'privacy.basis.p4.li1'} /></li>
      <li><FormattedMessage id={'privacy.basis.p4.li2'} /></li>
    </ul>
    <p><FormattedMessage id={'privacy.basis.p4.2'} /></p>
    <p><FormattedMessage id={'privacy.basis.p4.3'} /></p>

    <h4 id='share'><FormattedMessage id={'privacy.share.title'} /></h4>
    <p><FormattedMessage id={'privacy.share.p1'} /></p>
    <ul>
      <li><FormattedMessage id={'privacy.share.p1.li1'} /></li>
      <li><FormattedMessage id={'privacy.share.p1.li2'} /></li>
      <li><FormattedMessage id={'privacy.share.p1.li3'} /></li>
      <li><FormattedMessage id={'privacy.share.p1.li4'} /></li>
    </ul>

    <h4 id='transfer'><FormattedMessage id={'privacy.transfer.title'} /></h4>
    <p><FormattedMessage id={'privacy.transfer.p1'} /></p>
    <p><FormattedMessage id={'privacy.transfer.p2'} /></p>
    <ul>
      <li><FormattedMessage id={'privacy.transfer.p2.li1'} /></li>
      <li><FormattedMessage id={'privacy.transfer.p2.li2'} /></li>
    </ul>
    <p><FormattedMessage id={'privacy.transfer.p3'} /></p>

    <h4 id='howlong'><FormattedMessage id={'privacy.howlong.title'} /></h4>
    <p><FormattedMessage id={'privacy.howlong.p1'} /></p>

    <h4 id='rights'><FormattedMessage id={'privacy.rights.title'} /></h4>
    <p><FormattedMessage id={'privacy.rights.p1'} /></p>
    <ul>
      <li><FormattedMessage id={'privacy.rights.p1.li1'} /></li>
      <li><FormattedMessage id={'privacy.rights.p1.li2'} /></li>
      <li><FormattedMessage id={'privacy.rights.p1.li3'} /></li>
      <li><FormattedMessage id={'privacy.rights.p1.li4'} /></li>
      <li><FormattedMessage id={'privacy.rights.p1.li5'} /></li>
      <li><FormattedMessage id={'privacy.rights.p1.li6'} /></li>
      <li><FormattedMessage id={'privacy.rights.p1.li7'} /></li>
    </ul>
    <p><FormattedMessage id={'privacy.rights.p2'} /></p>
    <ul>
      <li><FormattedMessage id={'privacy.rights.p3.li1'} /></li>
      <li><FormattedMessage id={'privacy.rights.p3.li2'} /></li>
    </ul>
    <p><FormattedMessage id={'privacy.rights.p4'} /></p>

    <h4 id='keepupchanges'><FormattedMessage id={'privacy.keepupchanges.title'} /></h4>
    <p><FormattedMessage id={'privacy.keepupchanges.p1'} /></p>
    <p><FormattedMessage id={'privacy.keepupchanges.p2'} /></p>

    <h4 id='contactus'><FormattedMessage id={'privacy.contactus.title'} /></h4>
    <p><FormattedMessage id={'privacy.contactus.p1'} /></p>

    <p><FormattedMessage id={'privacy.lastupdated.p1'} /></p>
  </div>
)

export default DataPrivacy
