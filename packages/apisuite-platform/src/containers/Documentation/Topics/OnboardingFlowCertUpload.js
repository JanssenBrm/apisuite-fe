import React from 'react'
import { FormattedMessage } from 'react-intl'
import certificateupload from 'assets/docs/ob_flow_certificate_upload_postman.png'
import consolecertificate from 'assets/docs/ob_flow_postman_console_certificate.png'

const OnboardingFlowCertUpload = () => (
  <div className='topic-container'>
    <h2 className='headline'>
      <FormattedMessage id='navigation.docs.onboardingflowcertupload.title' />
    </h2>
    <p>
      <b>Disclaimer :</b> In production, only QWAC certificates (Qualified Website Authentification Certificate) will be
      allowed, and only one QWAC per third party. For the sandbox, this restriction doesn't apply and the certificate(s)
      can be either OV (Organisation validated) or EV (Extended validated). Note that you can find documentation about
      QWAC certificates here : <a
        href='https://www.etsi.org/deliver/etsi_ts/119400_119499/119495/01.01.02_60/ts_119495v010102p.pdf'
      >https://www.etsi.org/deliver/etsi_ts/119400_119499/119495/01.01.02_60/ts_119495v010102p.pdf
      </a>
    </p>
    <p>
      All the STET endpoints will enforce TLS-Mutual Authentication. We will check for your certificate to be part of a
      whitelist, so you need to provide us your certificate in advance so that it can be whitelisted. This is done via
      the <em>onboarding endpoint</em>.
    </p>
    <p>
      You will have to add a client certificate so that our server can capture it. Note that for this endpoint TLS-MA is
      also enforced but not the whitelist, hence we will force the client to send a certificate but any valid
      certificate will be accepted.
    </p>
    <p>
      The way you can add a client certificate depends on your API client. We provide here an example using Postman. On
      Postman you can upload a certificate in Settings &gt; Certificates.
    </p>
    <img src={certificateupload} alt='certificate upload' />
    <p>
      You first have to provide the hostname of your certificate, i.e. the domain on which you registered it. Next, If
      your certificate is in pfx/p12 format you can upload it in the “PFX file” field and provide the password in the
      "Passphrase" field. You can also provide the public key and private key separately, in "CRT file" and "KEY file",
      respectively (this is useful if your API client doesn't support pfx format).
    </p>
    <p>
      When all is good click on “Add” and the certificate will be automatically added to all your API calls in Postman
      (if the server enforces SSL verification you will see it in the Postman console).
    </p>
    <p>
      <img src={consolecertificate} alt='certificate console' />
    </p>
  </div>
)

export default OnboardingFlowCertUpload
