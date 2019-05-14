import axios from 'axios';

const jsonHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const getAuthHeaders = token => token ? { Authorization: `Bearer ${token}` } : {};

function onError(error) {
  //TODO procc error
  console.log(`onfetchError error${error}`);
  throw error;
};

export async function get(accessToken, url, additionalHeaders = {}, {notAuth = false} = {}) {
  try {
    let authHeaders = {};
    if (!notAuth) {
      authHeaders = getAuthHeaders(accessToken);
    }
    const headers = { ...jsonHeaders, ...additionalHeaders, ...authHeaders };
    const opts = {
      url,
      method: 'get',
      headers,
    };

    return await axios(opts);
  } catch (error) {
    return onError(error);
  }
}

export async function post(accessToken, url, data, additionalHeaders = {}, {notAuth = false} = {}) {
  try {
    let authHeaders = {};
    if (!notAuth) {
      authHeaders = getAuthHeaders(accessToken);
    }
    const headers = { ...jsonHeaders, ...additionalHeaders, ...authHeaders };
    //const body = JSON.stringify(data);
    const opts = {
      url,
      method: 'post',
      headers,
      data,
    };

    return await axios(opts);
  } catch (error) {
    return onError(error);
  }
}
