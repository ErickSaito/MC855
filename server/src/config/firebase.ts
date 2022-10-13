import { applicationDefault, initializeApp } from 'firebase-admin/app';
import { firestore } from 'firebase-admin';

export const app = initializeApp({
  credential: applicationDefault(),
});
export const db = firestore();
