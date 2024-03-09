import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';
import { scenario } from 'k6/execution';
import http from 'k6/http';

const data = new SharedArray('requests', function () {
  return JSON.parse(open('./data/requests_graphql.json'));
});

const host = `http://37.27.9.79:8090`;

export const options = {
  vus: 500,
  iterations: 600000,
  duration: '10m'
};

export default function () {
  const query = data[scenario.iterationInTest % data.length];
  const url = `${host}/v1/graphql`;

  const res = http.post(url, JSON.stringify({ query }), {
    headers: { 'Content-Type': 'application/json' },
    tags: { name: 'fetch' },
    timeout: '30s',
  });

  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(0.2 * (scenario.iterationInTest % 6));
}