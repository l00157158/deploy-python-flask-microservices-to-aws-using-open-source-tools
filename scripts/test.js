// Scenario: Scenario_1 (executor: ramping-vus)

import { sleep } from 'k6'
import http from 'k6/http'

export const options = {
  ext: {
    loadimpact: {
      name: 'cloud-test',
    },
  },
  duration: '1m',
  vus: 50
  thresholds: {http_req_duration: ['p(95)<500'],},
  scenarios: {
    Scenario_1: {
      executor: 'ramping-vus',
      gracefulStop: '30s',
      stages: [
        { target: 20, duration: '1m' },
        { target: 20, duration: '3m30s' },
        { target: 0, duration: '1m' },
      ],
      gracefulRampDown: '30s',
      exec: 'scenario_1',
    },
  },
}

export function scenario_1() {
  let response

  // get-items test
  response = http.get('http://ecsalb-1352864412.eu-west-1.elb.amazonaws.com/get-items', {
    headers: {
      'Content-Type': 'application/json',
    },
  })

  // Automatically added sleep
  sleep(1)
}
