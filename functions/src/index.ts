import * as functions from 'firebase-functions';
import axios from 'axios';

const env = functions.config();

// TODO: Set the server domain in the firebase config
const DOMAIN = env['DOMAIN'];

export const onUserCreate = functions.auth.user().onCreate(async (user, context) => {
  const uid = user.uid;
  const url = `${DOMAIN}/users/${uid}`;
  return axios.post(url);
});

export const onUserDelete = functions.auth.user().onDelete(async (user, context) => {
  const uid = user.uid;
  const url = `${DOMAIN}/users/${uid}`;
  return axios.delete(url);
});
