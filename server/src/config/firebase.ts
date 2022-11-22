import { initializeApp } from 'firebase-admin/app';
import { credential, firestore, messaging } from 'firebase-admin';

// eslint-disable-next-line @typescript-eslint/no-var-requires
// const serviceAccount = require('./mc855-umbrella-firebase-adminsdk.json');

export const app = initializeApp({
  credential: credential.cert({
    // type: 'service_account',
    projectId: 'mc855-umbrella',

    privateKey:
      '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDYf3eIFcKBLNPH\nbgm0j+8dHQSOEyFVVjwewyxGl7/9S3ONtDvjE9tZQphyZqhFbIvslgy8A0dGp7tq\nrAmMQPnHDgJ1KCbEOWHingUcR8pAo1jUEm1J/4MoBRnDm6ZhWu4L5SnzNCY/YP/+\nIGNI3faWyFCJluYATrW1fkV4P093RnAbfwf1ZfmD0pZPEkGt+L/6njxMOBt/1uf4\nziIThXv5uGVqaH1Nvd6XDzpxxx99UoeZnc+3XqWHsizcPvOeJ6P1J09vXxu7paxf\nXCFgmd0jdMLO+5keX1FR8eoM6iMmgsTkx6VJJagiyFcFtH621Ij8fgYJjxoUsQ+M\n32M2opYBAgMBAAECggEAAlGrOBvzj2qpghNdqz93cjpjWBpAWyenUTUJ/l+VwOLU\nBAqQMah+yv/5nhAXcVbuUMRysnjehJU7XrMlDwmLI2S1Bgg+EhADSmgi6eCi+/pD\n81GXNhm0j/MuCXhbWeOddScpQd+nITqqw1AZgChQgeD3a+Hf6NTvAViu6dDTyxVD\nBOYpp8rY/ZmXldM7/4A7p4dRbGugXwfPd+DlhBMB7XO3ZPQLLtp0cNC5jHLf2XCZ\n1UsfSOn6xHfuUFESOAJEaWaRcbJo0aRBOlzwyeh0GRzrvj+G4o028RNtIuhdJ88u\naxwvM54xstetl+eFa6uZYbcwyoNPS+CQn90+cSNSAQKBgQD5Sz4OhKrlBpS0zCYg\nZ0C/2JLO+hyBCROi9Q0RLzOs6WVgwkog7j2GcWjyuWrNI0t3PLIfm2RnIYWdOMQ4\n6o2bceAcKSXSaH1tq2tkslGCJAeUVw+pqJWoe26lKwGvacx5bhoXLIpT8JoORiDb\nj+YlHz7cio5RjJr8ZCLE/CaBsQKBgQDeUmAiTM83VaUEAMzVKACDgIE70hbwSXon\nOZe21BVFx4UIyd+WZL0jK8nipIOY+8cljXA3wRPjEVC+OfLgO8/Z9LLV0k+1P819\nM4OlCES03YFKfJBapSiou2SPJ2DFXFDVNBZ3kvsfTh+Jz/H4DQhDSytI907kiw3e\nfWOGwAqdUQKBgD9jOmxGn42MltNB9Y/XsUcWsn2eaxEEVdHhrWjpL6KP1g88V8z3\nxv0gaScOrnFqwA2ZiVEwGd9/TpIjlQFD4q3bzrhaXhuaJgp0w+He1YrZznORj5H8\nI9GrUP7+aHdJ14woysmJscKWMxXeDwzFEifuQfWh5X4m2mHCtHSSCNiBAoGBAK85\n8fdW3sPYRvV+w/MFUlJTSIijr9y3rQWZiRBa3GFhPmOM6SMaR1CfRMHTtL0xROc+\nMUJgdZI0pZUpC1rdCZfaG9IXrydGIGob3hiHCdAb/bl9sDEhl4hWGo4SFV24wyUn\npsWcHT2xT35JXYeKjgasCnO6KH5NcyL3ZShh2HvhAoGBAM4pB78aMrIZYV9G75+8\nhpzv5p92FT09KlP4Wf+V6i8v4qNYLb5lY6NYCfTdAI522MN0PnBSOjFn75i8vONC\nFbbT4aNh3bXTia8eT74TDDwILj5FWCIhLotcFk3r4gW8L/UBRGc3LHA5Sm7VEWpe\nDJ1xuF/mVH11KOZd/lxLrTHW\n-----END PRIVATE KEY-----\n',
    clientEmail:
      'firebase-adminsdk-1i1bk@mc855-umbrella.iam.gserviceaccount.com',
    // client_id: '104696434629945014191',
    // auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    // token_uri: 'https://oauth2.googleapis.com/token',
    // auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    // client_x509_cert_url:
    // 'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-1i1bk%40mc855-umbrella.iam.gserviceaccount.com',
  }),
});
export const db = firestore();
export const msg = messaging();
