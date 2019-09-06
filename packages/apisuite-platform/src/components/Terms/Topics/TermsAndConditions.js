import React from 'react'
import { FormattedMessage } from 'react-intl'

const TermsAndConditions = () => (
  <div className='topic-container'>
    <h1 id='introduction'><FormattedMessage id={'terms.title'} /></h1>
    <p className='small'><FormattedMessage id={'terms.disclaimer'} /></p>
    <p style={{textTransform: 'uppercase'}}>
      <FormattedMessage id={'terms.disclaimercaps'} />
    </p>
    <h3 id='provisions'><FormattedMessage id={'terms.topic1.title'} /></h3>
    <p><FormattedMessage id={'terms.topic1.p1'} /></p>
    <p><FormattedMessage id={'terms.topic1.p2'} /></p>
    <p><FormattedMessage id={'terms.topic1.p3'} /></p>
    <p><FormattedMessage id={'terms.topic1.p4'} /></p>

    <h3 id='registration'><FormattedMessage id={'terms.topic2.title'} /></h3>
    <p><FormattedMessage id={'terms.topic2.p1'} /></p>
    <p>
      <FormattedMessage id={'terms.topic2.p2'} />
      <ol type='i'>
        <li><FormattedMessage id={'terms.topic2.p2.li1'} /></li>
        <li><FormattedMessage id={'terms.topic2.p2.li2'} /></li>
        <li><FormattedMessage id={'terms.topic2.p2.li3'} /></li>
      </ol>
    </p>

    <p><FormattedMessage id={'terms.topic2.p3'} /></p>
    <p><FormattedMessage id={'terms.topic2.p4'} /></p>
    <p><FormattedMessage id={'terms.topic2.p5'} /></p>
    <p><FormattedMessage id={'terms.topic2.p6'} /></p>
    <p><FormattedMessage id={'terms.topic2.p7'} /></p>
    <p><FormattedMessage id={'terms.topic2.p8'} /></p>
    <p><FormattedMessage id={'terms.topic2.p9'} /></p>

    <h3 id='visit'><FormattedMessage id={'terms.topic3.title'} /></h3>
    <p><FormattedMessage id={'terms.topic3.p1'} /></p>
    <p><FormattedMessage id={'terms.topic3.p2'} /></p>

    <p>
      <FormattedMessage id={'terms.topic3.p3'} />
      <ul>
        <li><FormattedMessage id={'terms.topic3.p3.li1'} /></li>
        <li><FormattedMessage id={'terms.topic3.p3.li2'} /></li>
        <li><FormattedMessage id={'terms.topic3.p3.li3'} /></li>
        <li><FormattedMessage id={'terms.topic3.p3.li4'} /></li>
        <li><FormattedMessage id={'terms.topic3.p3.li5'} /></li>
        <li><FormattedMessage id={'terms.topic3.p3.li6'} /></li>
        <li><FormattedMessage id={'terms.topic3.p3.li7'} /></li>
        <li><FormattedMessage id={'terms.topic3.p3.li8'} /></li>
      </ul>
    </p>

    <h3 id='editor'><FormattedMessage id={'terms.topic4.title'} /></h3>
    <p><FormattedMessage id={'terms.topic4.p1'} /></p>
    <div><FormattedMessage id={'terms.topic4.address1.name'} /></div>
    <div><FormattedMessage id={'terms.topic4.address1.street'} /></div>
    <div><FormattedMessage id={'terms.topic4.address1.street2'} /></div>
    <div><FormattedMessage id={'terms.topic4.address1.extra'} /></div>

    <p><FormattedMessage id={'terms.topic4.p2'} /></p>

    <p><FormattedMessage id={'terms.topic4.p3'} /></p>
    <div><FormattedMessage id={'terms.topic4.address3.name'} /></div>
    <div><FormattedMessage id={'terms.topic4.address3.street'} /></div>
    <div><FormattedMessage id={'terms.topic4.address3.street2'} /></div>
    <div><FormattedMessage id={'terms.topic4.address3.extra'} /></div>
    <br />
    <div><FormattedMessage id={'terms.topic4.address4.name'} /></div>
    <div><FormattedMessage id={'terms.topic4.address4.street'} /></div>
    <div><FormattedMessage id={'terms.topic4.address4.street2'} /></div>
    <div><FormattedMessage id={'terms.topic4.address4.extra'} /></div>
    <div><FormattedMessage id={'terms.topic4.address4.extra2'} /></div>

    <h3 id='content'><FormattedMessage id={'terms.topic5.title'} /></h3>
    <h5>{'\u0081'}<FormattedMessage id={'terms.topic5.subtitle'} /></h5>
    <p><FormattedMessage id={'terms.topic5.p1'} /></p>
    <p><FormattedMessage id={'terms.topic5.p2'} /></p>

    <h5>{'\u0081'}<FormattedMessage id={'terms.topic5.subtitle2'} /></h5>
    <p><FormattedMessage id={'terms.topic5.p4'} /></p>
    <p><FormattedMessage id={'terms.topic5.p5'} /></p>
    <p><FormattedMessage id={'terms.topic5.p6'} /></p>

    <h5>{'\u0081'}<FormattedMessage id={'terms.topic5.subtitle3'} /></h5>
    <p><FormattedMessage id={'terms.topic5.p7'} /></p>

    <h5>{'\u0081'}<FormattedMessage id={'terms.topic5.subtitle4'} /></h5>
    <p><FormattedMessage id={'terms.topic5.p8'} /></p>
    <p><FormattedMessage id={'terms.topic5.p9'} /></p>

    <h3 id='intelectual'><FormattedMessage id={'terms.topic6.title'} /></h3>
    <h5>{'\u0081'}<FormattedMessage id={'terms.topic6.subtitle'} /></h5>
    <p><FormattedMessage id={'terms.topic6.p1'} /></p>
    <p><FormattedMessage id={'terms.topic6.p2'} /></p>
    <p><FormattedMessage id={'terms.topic6.p3'} /></p>

    <h5>{'\u0081'}<FormattedMessage id={'terms.topic6.subtitle2'} /></h5>
    <p><FormattedMessage id={'terms.topic6.p4'} /></p>
    <p><FormattedMessage id={'terms.topic6.p5'} /></p>
    <p><FormattedMessage id={'terms.topic6.p6'} /></p>
    <p><FormattedMessage id={'terms.topic6.p7'} /></p>

    <h3 id='trademarks'><FormattedMessage id={'terms.topic7.title'} /></h3>
    <p><FormattedMessage id={'terms.topic7.p1'} /></p>
    <p><FormattedMessage id={'terms.topic7.p2'} /></p>
    <p><FormattedMessage id={'terms.topic7.p3'} /></p>

    <h3 id='privacy'><FormattedMessage id={'terms.topic8.title'} /></h3>
    <p><FormattedMessage id={'terms.topic8.p1'} /></p>

    <h3 id='confidentiality'><FormattedMessage id={'terms.topic9.title'} /></h3>
    <p><FormattedMessage id={'terms.topic9.p1'} /></p>
    <p><FormattedMessage id={'terms.topic9.p2'} /></p>

    <h3 id='suspension'><FormattedMessage id={'terms.topic10.title'} /></h3>
    <p><FormattedMessage id={'terms.topic10.p1'} /></p>

    <h3 id='liability'><FormattedMessage id={'terms.topic11.title'} /></h3>
    <p><FormattedMessage id={'terms.topic11.p1'} /></p>
    <p><FormattedMessage id={'terms.topic11.p2'} /></p>
    <p><FormattedMessage id={'terms.topic11.p3'} /></p>

    <h3 id='law'><FormattedMessage id={'terms.topic12.title'} /></h3>
    <p><FormattedMessage id={'terms.topic12.p1'} /></p>

    <h3 id='miscellaneous'><FormattedMessage id={'terms.topic13.title'} /></h3>
    <ol type='a'>
      <li><FormattedMessage id={'terms.topic13.li1'} /></li>
      <p><FormattedMessage id={'terms.topic13.li1.p'} /></p>
      <li><FormattedMessage id={'terms.topic13.li2'} /></li>
      <li><FormattedMessage id={'terms.topic13.li3'} /></li>
      <li><FormattedMessage id={'terms.topic13.li4'} /></li>
      <li><FormattedMessage id={'terms.topic13.li5'} /></li>
    </ol>
  </div>
)

export default TermsAndConditions
