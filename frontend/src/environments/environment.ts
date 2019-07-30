// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const AUTH_SERVER_BASE_URL = 'http://localhost:8000/auth';
const MED_SERVER_BASE_URL = 'http://localhost:8000/med';
const RISK_SCORE_SERVER_BASE_URL = 'http://localhost:8000/score';
const IMAGE_SERVER_BASE_URL = 'http://localhost:8000/image';
const SMS_SERVER_BASE_URL = 'http://localhost:8000/sms';

export const environment = {
  production: false,
  loginUrl: AUTH_SERVER_BASE_URL + '/login',
  logoutUrl: AUTH_SERVER_BASE_URL + '/logout',
  getUserUrl: AUTH_SERVER_BASE_URL + '/currentuser',
  riskScoreUrl: RISK_SCORE_SERVER_BASE_URL + '/getscore',
  signupUrl: AUTH_SERVER_BASE_URL + '/register',
  bloodTypeSearchUrl: MED_SERVER_BASE_URL + '/bloodtype',
  beforeImgUploadUrl: IMAGE_SERVER_BASE_URL + '/before',
  afterImgUploadUrl: IMAGE_SERVER_BASE_URL + '/after',
  getImagesUrl: IMAGE_SERVER_BASE_URL + '/getall',
  getEmergencyContactsUrl: SMS_SERVER_BASE_URL + '/getcontacts',
  setEmergencyContactsUrl: SMS_SERVER_BASE_URL + '/postcontacts'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
