import React from 'react'
import { FormattedMessage } from 'react-intl'
import scenarioHeaders from 'assets/docs/scenario_headers_postman.png'

const ScenarioExceptionRules = () => (
  <div className='scenario-exception-rules-container'>
    <h2 className='headline'>
      <FormattedMessage id='navigation.docs.scenario.title' />
    </h2>

    <p>
      <br />
    </p>
    <ul>
      <li>The scenarios are there to help you test cases that can’t be supported by the sandbox due to technical limitations, but will be present in Production environment.</li>
    </ul>
    <p>
      <br />
    </p>
    <ul>
      <li>
        <p>The idea is to pass a specific header to trigger specific responses (mocked) that will correspond to the response you will receive in the <i>«real»</i> scenario (in Production environment).</p>
      </li>
    </ul>
    <p>
      <br />
    </p>
    <ul>
      <li>
        <p>You can filter the list of scenarios available for each endpoint by first selecting the desired endpoint (e.g. <i>«Get Accounts»</i>); you then need to click on a specific scenario in the provided list to see the details.</p>
      </li>
    </ul>
    <p>
      <br />
    </p>
    <ul>
      <li>
        <span>In the scenario details you can see the following details:</span>
        <ul>
          <li>
            <span>The <strong>scenario id</strong> which will you have to pass as a header in order to trigger the scenario.</span>
          </li>
          <li>
            <span>The <strong>Title</strong> (name) of the scenario.</span>
          </li>
          <li>
            <span>The <strong>Scenario</strong> itself (e.g. Payment service not responding).</span>
          </li>
          <li>
            <span>The <strong>Technical response</strong> which includes the HTTP response code and the JSON response body that you will receive in that scenario.</span>
          </li>
        </ul>
      </li>
    </ul>
    <p>
      <br />
    </p>
    <ul>
      <li>
        <span>To trigger this scenario you have to pass an additional header <strong>«x-openbank-scenario»</strong> with the value of the scenario id that is displayed in the scenario details (example below).</span>
      </li>
    </ul>
    <p><img src={scenarioHeaders} /></p>
    <p>
      <br />
    </p>
    <ul>
      <li>
        <span>Note that when you provide this header, you don’t even need a valid access token (because the call won’t reach the sandbox and will just trigger a mocked response). You don't need to pass any additional header either.</span>
      </li>
    </ul>

  </div>
)

export default ScenarioExceptionRules
