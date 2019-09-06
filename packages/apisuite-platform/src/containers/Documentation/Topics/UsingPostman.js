import React from 'react'
import { FormattedMessage } from 'react-intl'

const Topic = () => (
  <div className='topic-container'>
    <h2 className='headline'>
      Using Postman - Testing sandbox endpoints
    </h2>
    <p>
      Postman collection gives you the possibility to test the STET APIs thoroughly. It is recommended to execute the API calls sequentially as there are some requests that use the result of a previous call as input.
    </p>

    <h4 className='headline'>
      Environment & global variables
    </h4>
    <p>
      Before taking a deep dive into the requests themselves we suggest you to pay attention to the environment variables, accessible on the top right of Postman (click on the eye icon, just under the Sign In button). Some environment variables are static so you do not need to touch them, but other variables on the other hand depend on your app credentials; these variables need to be updated according to the app you created in the portal (app center).

      <ul>
        <li><pre>client_id: </pre>the client id from your application</li>
        <li><pre>client_secret: </pre>the client secret from your application</li>
        <li><pre>redirect_url: </pre>the redirect url that you picked for your app (note that it does not have to be valid yet for the Postman flow)</li>
        <li><pre>access_token_client: </pre>the access token that was generated for your app in the portal. This access token uses the client_credentials grant type.</li>
      </ul>
      <p>
        <i>Note: This information is available from Dashboard in the Overview tab of your application.</i>
      </p>
    </p>

    <h4 className='headline'>
      Account
    </h4>
    <p>
      The requests under the account folder are pretty straightforward: just enter the access token of your app in the Authorization tab and click on Send. Keep in mind that you need to generate test data in the Test data tab of one of your apps before you can see some accounts there. You will also need to submit payments to have account transactions.
    </p>

    <h4 className='headline'>
      Payment
    </h4>
    <p>
      You can find requests linked to payment initiation in the payment folder. If you have test accounts, you can select two of them (one as debtor, one as creditor) and update the payment initiation body accordingly. You only need to change the Identification (i.e IBAN) and Name (name of the account owner) fields.
    </p>

    <h4 className='headline'>
      Oauth
    </h4>
    <p>
      Before confirming the payment initiated in the previous step, you will need a new access token using the authorization_code grant type (to simulate user consent). Instead of using the Get New Access Token functionality of Postman, the following requests can be executed in sequentially in order to replicate the authorization_code grant flow (that a real app would implement).
      <br /><br />
      <i>Important: you must not forget to update the clientId and clientSecret in your global variables to match the ones of your application. You must also tick off Automatically follow redirects in Postman settings.</i>
      <br /><br />
      <ul>
        <li><pre>GET /authorize:</pre>This request is used to trigger the authorization flow and get the login page (which is why the result is a redirect). Here we just need to set the cookie JSESSIONID</li>
        <li><pre>POST /login:</pre>You will need to fill in the username and password of the selected user (customerId and password, respectively). If the login is successful the JSESSIONID cookie will be updated and will serve as proof the login was successful.</li>
        <li><pre>GET /authorize:</pre>Another request to the authorize service once connected returns the confirmation page where the end user will allow the third party application to use his bank account to execute a payment.</li>
        <li><pre>POST /authorize:</pre>This request must always follow a GET /authorize call (confirmation page). If it is the case and the user is logged in (the session cookie is valid) then a redirect to the chosen callback url will be triggered, including the authorization code. Since you deactivated the Automatically follow redirects feature of Postman, the authorization code will be directly retrieved from the Location header of the response, instead.</li>
        <li><pre>POST /token:</pre>Finally, once the authorization code has been retrieved (automatically), you can exchange it against the access token. Do not forget to generate a Base64 encoded concatenated string of your client id and client secret, as it is used in the Authorization header of the request (the value of this header must also start with Basic).</li>
      </ul>
      <p>
        <i>Note: This information is available from Dashboard in the Overview tab of your application.</i>
      </p>
    </p>

    <h4 className='headline'>
      Payment-submission
    </h4>
    <p>
      Once the access token has been retrieved with authorization_code grant type (either via the oauth requests flow or via the Postman Get new access token feature), you are then able to submit payments. Note that you only need this token for the POST requests that require user consent. Before submitting a payment do not forget to update the PaymentId and to ensure the PaymentInitiation body is the same as the one you initiated before.
    </p>
  </div>
)

export default Topic
