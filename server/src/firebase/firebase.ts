import { Injectable } from '@nestjs/common';
import { credential, firestore, messaging } from 'firebase-admin';
import { initializeApp } from 'firebase-admin/app';
import { Messaging } from 'firebase-admin/lib/messaging/messaging';

@Injectable()
export class FirebaseApp {
  constructor() {
    initializeApp({
      credential: credential.cert({
        privateKey: process.env.GOOGLE_APPLICATION_CREDENTIALS_PRIVATE_KEY,
        projectId: process.env.GOOGLE_APPLICATION_CREDENTIALS_PRJECT_ID,
        clientEmail: process.env.GOOGLE_APPLICATION_CREDENTIALS_CLIENT_EMAIL,
      }),
    });
  }

  getFirestore(): firestore.Firestore {
    return firestore();
  }

  getMessaging(): Messaging {
    return messaging();
  }
}
