const SUCCESS_MESSAGES = {
    LOGIN_SUCCESS: 'Login Successfully!',
    REGISTER_SUCCESS: 'Register Successfully!',
  };
  
  const ERROR_MESSAGES = {
    LOGIN_FAILED: 'Failed to Login!',
    REGISTER_FAILED: 'Failed to register!',
    EMAIL_REQUIRED: 'Please provide email',
    PHONE_REQUIRED: 'please provide phone number',
    NAME_REQUIRED: 'please provide name',
    EMAIL_OR_PHONE_REQUIRED: 'Please provide email or phone number',
    EMAIL_PHONE_REQUIRED: 'Phone or Email required',
    INVALID_PHONE: 'Please enter a valid phone number',
    INVALID_EMAIL: 'Please enter a valid email',
    PASSWORD_REQUIRED: 'Password requried!',
    INVALID_USER_CREDS: 'Invalid user credentials',
    USER_EXISTS: 'User already exists',
  };
  
  const LOGIN_MESSAGES = {
    MOBILE_NOT_REGISTERED: 'This mobile is not registered with us.',
    EMAIL_NOT_REGISTERED: 'This email is not registered with us.',
  };
  
  module.exports = {
    SUCCESS_MESSAGES,
    ERROR_MESSAGES,
    LOGIN_MESSAGES,
  };
  