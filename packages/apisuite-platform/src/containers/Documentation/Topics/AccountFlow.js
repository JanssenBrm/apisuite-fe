import React from 'react'
import { FormattedMessage } from 'react-intl'

const Topic = () => (
  <div className='topic-container'>
    <h2 className='headline'>
      <FormattedMessage id='navigation.docs.accounts.title' />
    </h2>
    <p>
      Here is an example of access token value using the right format:
      <pre className='big'>Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsib2F1dGgyLXJlc291cmNlIl0sInNjb3BlIjpbInNlcnZlciIsInBheW1lbnRzIiwicHJvZmlsZXMiLCJhY2NvdW50cyIsInBheW1lbnQtc3VibWlzc2lvbnMiXSwiZXhwIjozNjc3MDYyNTE5LCJhdXRob3JpdGllcyI6WyJST0xFX1RSVVNURURfQ0xJRU5UIiwiUk9MRV9DTElFTlQiXSwianRpIjoiMDI2NzYyMjEtMTFiZi00Njc2LTg3MzgtODhmNDFmNzM2YThmIiwiY2xpZW50X2lkIjoiWlM4VVJ0YXNOYWVSbEVJSnpERlYifQ.nf-moJjDs6_-RqljkYcPL-7R83V_z_kcClr6g7Gr_zZVUUhK0ilVXkKeY8JgTbrwTbUdGbuRmSYUWk4AFQZQm2g4fFEPW-zKuJ6MR-Qar_gyeHc_5ht1SG-p-EemgvnJgptsR3r9oEgFf9y60NiNohN_u-kLjGYjvLHzAM21H-U</pre>
    </p>

    <ol>
      <li>Get Accounts</li>
      <p>
        In order to retrieve all accounts for a certain application, that third party application can make a GET request to the accounts service. Note that this will return all accounts that were created with this specific client (= this unique ClientId).
      </p>
      <p>
        If you only want to retrieve the accounts for a specific customer (i.e. the end user of your application) then you can make a GET request to the <pre>accounts/customerId/{`{customerId}`}</pre> endpoint. The customerId parameter can be found as part of the user data which is accessible in the Test data tab of the app view.
      </p>

      <li>Get One User Account</li>
      <p>
        If the goal is to retrieve one account in particular, then a GET request to the <pre>accounts/{`{id}`}</pre> endpoint must be made. The id parameter is generated at account creation and is found in the response of createAccount request (see above).
      </p>

      <li>Get Account Balance</li>
      <p>
        You can simply retrieve the balance of a specific account with a GET request to <pre>accounts/{`{id}`}/balances</pre>
      </p>

      <li>Get Account Transactions</li>
      <p>
        The list of transactions can be retrieved by sending a GET request to the <pre>accounts/{`{id}`}/transactions</pre> endpoint. This will actually return the list of payments for which the given account was either debtor or creditor and which were successfully submitted. So the payment initiations will not appear in the transaction list as long as the payment was not confirmed and processed.
      </p>
    </ol>
  </div>
)

export default Topic
