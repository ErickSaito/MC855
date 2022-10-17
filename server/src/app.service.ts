import { Injectable } from '@nestjs/common';
import { db } from './config/firebase';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async getHelloFromFirebase(): Promise<string> {
    const document = await db.collection('test').doc('hello_world').get();
    return JSON.stringify(document.data().message);
  }
}
