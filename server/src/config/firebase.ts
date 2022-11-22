import { initializeApp } from 'firebase-admin/app';
import { credential, firestore, messaging } from 'firebase-admin';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const serviceAccount = require('./mc855-umbrella-firebase-adminsdk.json');

export const app = initializeApp({
  credential: credential.cert(serviceAccount),
});
export const db = firestore();
export const msg = messaging();
