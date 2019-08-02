import Env from './Env';

const CURRENT_ENV = Env.CURR_ENV;

const URL = {
  LOCAL : 'http://localhost:8009',
  PROD : 'https://developers.zomato.com/api/v2.1'
}

export default {
  getCities() {
    return `${URL[CURRENT_ENV]}/cities`;
  },
  getCuisines() {
    return `${URL[CURRENT_ENV]}/cuisines`;
  },
  getRestaurantList() {
    return `${URL[CURRENT_ENV]}/search`;
  }
}