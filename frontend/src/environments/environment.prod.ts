const AUTH_SERVER_BASE_URL = 'https://call-for-code-server.mybluemix.net/auth';
const MED_SERVER_BASE_URL = 'https://call-for-code-server.mybluemix.net/med';
const RISK_SCORE_SERVER_BASE_URL = 'https://call-for-code-server.mybluemix.net/score';
const IMAGE_SERVER_BASE_URL = 'https://call-for-code-server.mybluemix.net/image';
const SMS_SERVER_BASE_URL = 'https://call-for-code-server.mybluemix.net/sms';

export const environment = {
  production: true,
  loginUrl: AUTH_SERVER_BASE_URL + '/login',
  logoutUrl: AUTH_SERVER_BASE_URL + '/logout',
  signupUrl: AUTH_SERVER_BASE_URL + '/register',
  getUserUrl: AUTH_SERVER_BASE_URL + '/currentuser',
  riskScoreUrl: RISK_SCORE_SERVER_BASE_URL + '/getscore',
  bloodTypeSearchUrl: MED_SERVER_BASE_URL + '/bloodtype',
  beforeImgUploadUrl: IMAGE_SERVER_BASE_URL + '/before',
  afterImgUploadUrl: IMAGE_SERVER_BASE_URL + '/after',
  getImagesUrl: IMAGE_SERVER_BASE_URL + '/getall',
  getEmergencyContactsUrl: SMS_SERVER_BASE_URL + '/getcontacts',
  setEmergencyContactsUrl: SMS_SERVER_BASE_URL + '/postcontacts'
};
