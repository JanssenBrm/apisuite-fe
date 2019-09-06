import React from 'react'

import authenticatescreen from 'assets/docs/stet_authenticate.png'
import confirmpaymentscreen from 'assets/docs/stet_confirm_payment.png'
import accountselectionscreen from 'assets/docs/stet_account_selection.png'

const StetConfirmingPISP = () => (
  <div className='topic-container'>
    <h2 className='headline'>PISP - Confirming a Payment</h2>
    <p>When a successful <pre>POST</pre> request is sent on <pre>/v1/payment-requests</pre> with a <pre>client_credentials</pre> token, the payment is not executed yet. The payment resource is created, however the debtor (= <pre>PSU</pre>) still needs to confirm the payment. Indeed, the request posted by the PISP to the ASPSP needs a PSU authentication before execution. Because only the <pre>Redirect</pre> authentication method is currently supported, it will be the only method that is detailed here.</p>

    <h4>Confirming a Payment - Redirect flow</h4>

    <p>You should have already initiated a payment using the <pre>POST /v1/payment-requests</pre> endpoint. As per the swagger contract, you could either go without a debtor account or choose to provide a debtor account from your test data. Either way, you should receive a <pre>consentApprovalUrl</pre> in the API response. This url will look something like this:</p>
    <pre>{`https://sandbox.auth.bnpparibasfortis.com/payment-requests/{paymentRequestResourceId}/consent?client_id=<YOUR_APP_CLIENT_ID>`}</pre>

    <p>You have to copy paste this url in your browser. If the <pre>PSU</pre> is not authenticated, you will be redirected to the <pre>Login</pre> screen.</p>

    <img src={authenticatescreen} />

    <p>On the login view, you should use one of your <pre>PSU</pre> credentials from your test data. <b>Important</b>: if you provided a debtor account in the body of <pre>POST /v1/payment-requests</pre>, you should make sure that the test user that you use to authenticate is the owner of the test account that you provided. Otherwise, you will receive an error.</p>
    <p>Once authenticated, you should now be redirected to the <pre>Confirmation</pre> screen. On this screen you should see your payment details (<code>amount</code>, <code>creditor</code>, <code>date</code>). If you already provided a <pre>debtor account</pre>, it will appear here; clicking on <pre>Continue</pre> button will confirm the payment and redirect you to the <pre>successfulReportUrl</pre> provided in the payment request. If no <pre>debtor account</pre> was provided (as in the example below), you will instead be redirected to an <pre>account selection</pre> screen.</p>

    <img src={confirmpaymentscreen} />

    <p>In the account selection screen, the accounts of the authenticated <pre>PSU</pre> will be displayed. You just have to click on the account to select it and confirm the payment. You will then be redirected to the <code>successfulReportUrl</code> provided in the payment request.</p>

    <img src={accountselectionscreen} />
  </div >
)

export default StetConfirmingPISP
