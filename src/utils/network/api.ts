import fetch from 'node-fetch';

export const doPost = (url: string, body?) => {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' }
  }).then(res => res.json());
};
