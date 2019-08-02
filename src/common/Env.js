const _initializeEnv = () => {
  return 'PROD';
  // return window.location.hostname === 'localhost'  ? 'LOCAL' : 'PROD';
};

const _isLocalHost = () => window.location.hostname === 'localhost';

export default {
  CURR_ENV: _initializeEnv(),
  isLocalHost: _isLocalHost(),
};
