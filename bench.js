import { sleep } from 'k6';
import { SharedArray } from 'k6/data';
import { scenario } from 'k6/execution';
import http from 'k6/http';

const data = new SharedArray('requests', function () {
  return JSON.parse(open('./data/requests.json'));
});

const host = `http://nkwgss0.37.27.9.79.sslip.io/`; 

export const options = {
  vus: 500,
  iterations: 500 * 60 * 1 * 10,
  duration: '1m'
};
  
export default function () {
  const params = data[scenario.iterationInTest % data.length];
  const url = `${host}${params}`;

  http.get(url, {
    tags: { name: 'fetch' },
    timeout: '30s',
  });

  sleep(0.2 * (scenario.iterationInTest % 6));
}
