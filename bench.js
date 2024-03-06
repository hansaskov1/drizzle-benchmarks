import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';
import { scenario } from 'k6/execution';
import http from 'k6/http';

const data = new SharedArray('requests', function () {
  return JSON.parse(open('./data/requests.json'));
});

const host = `http://37.27.9.79:3000`;

export const options = {
  vus: 500,
  iterations: 600000,
  duration: '1m'
};

export default function () {
  const params = data[scenario.iterationInTest % data.length];
  const url = `${host}${params}`;

  const res = http.get(url, {
    tags: { name: 'fetch' },
    timeout: '30s',
  });

  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(0.2 * (scenario.iterationInTest % 6));
}
