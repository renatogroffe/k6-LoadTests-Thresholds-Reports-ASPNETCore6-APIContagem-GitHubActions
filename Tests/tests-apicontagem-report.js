import http from 'k6/http';
import { sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

export let options = {
    duration: '10s',
    vus: 50,
    thresholds: {
        http_req_failed: ['rate<0.05']
    }    
};

export default function() {
    http.get('http://localhost:5000/contador');
    sleep(1);
};

export function handleSummary(data) {
    return {
      "apicontagem-loadtests.html": htmlReport(data),
      stdout: textSummary(data, { indent: " ", enableColors: true })
    };
}