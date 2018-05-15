import 'isomorphic-fetch';
import { URL, getRequestHeader, parseResponse } from '../utils/loginUtils';

class User {
  async login(email_id, password) {
    console.log(JSON.stringify({ email_id, password }));
    const response = await fetch(`${URL()}/auth`, {
      method: 'POST',
      headers: getRequestHeader(true),
      body: JSON.stringify({ email_id, password }),
    });

    return parseResponse(response);
  }

  async getMe() {
    const response = await fetch(`${URL()}/getme`, {
      method: 'GET',
      headers: getRequestHeader(),
    });

    return parseResponse(response);
  }
}

export default new User();
