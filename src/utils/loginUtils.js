async function _parseResponse(response) {
  const contentType = response.headers.get('content-type');

  if (contentType && contentType.indexOf('application/json') !== -1) {
    return await response.json();
  } else {
    throw new Error(`Unrecognized content type "${contentType}"`);
  }
}

export async function parseResponse(response) {
  const data = await _parseResponse(response);
  if (response.ok) {
    return data;
  } else {
    const error = new Error();
    if (data.hasOwnProperty('error')) {
      error.messages = [data.description];
    } else {
      error.messages = [data.error];
    }
    throw error;
  }
}

export function getRequestHeader(ignoreJwt) {
  if (ignoreJwt) {
    return {
      'Content-Type': 'application/json',
    };
  } else {
    return {
      Authorization: `JWT ${sessionStorage.getItem('jwt')}`,
      jwt: sessionStorage.getItem('jwt'),
    };
  }
}

export function URL() {
  return process.env.REACT_APP_SERVER_AUTH_URL || 'http://localhost:5000';
}
