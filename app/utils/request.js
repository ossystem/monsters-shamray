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
}

function procResponse(res) {
  if (typeof res !== 'object') {
    throw new Error('Bad response');
  }
  const { status, data: rawData } = res;

  if (status < 200 || status >= 400) {
    throw new Error(`Response with status ${status}`);
  }

  const { data, error } = rawData;

  if (error) {
    throw new Error(`Server replied with error: ${error}`);
  }

  return data;
}

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

    return procResponse(await axios(opts));
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

    return procResponse(await axios(opts));
  } catch (error) {
    return onError(error);
  }
}
