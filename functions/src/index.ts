import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import axios from 'axios';

const env = functions.config();

// TODO: Set the server domain in the firebase config
const DOMAIN = env['DOMAIN'];

/**
 * Create user on server whenever a user is being created
 */
export const onUserCreate = functions.auth.user().onCreate(async (user, context) => {
  const uid = user.uid;
  const url = `${DOMAIN}/users/${uid}`;
  return axios.post(url);
});

/**
 * Delete the user from server whenever deleted from firebase
 */
export const onUserDelete = functions.auth.user().onDelete(async (user, context) => {
  const uid = user.uid;
  const url = `${DOMAIN}/users/${uid}`;
  return axios.delete(url);
});

/**
 * Auto delete users 30 days after a deletion request
 */
export const checkDeletedUsers = functions.pubsub.schedule('every 1 days').onRun(async context => {
  const users = await admin.auth().listUsers();
  const monthPeriod = 1000 * 60 * 60 * 24 * 30;
  const now = +new Date(context.timestamp);
  const usersToDelete = users.users.filter(user => {
    const deletedAt = user.customClaims?.['deletedAt'];
    return deletedAt && (now - deletedAt) > monthPeriod;
  }).map(u => u.uid);
  return admin.auth().deleteUsers(usersToDelete);
})
