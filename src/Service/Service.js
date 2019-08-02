import Proteus from '../common/Proteus';
import URLS from '../common/Urls';
import WebStorage from '../common/WebStorage'

export default {
    getCities(city) {
        let currentLocation = WebStorage.getCollection('currentLocation');
        let payload = '';
        if(city) {
            payload = `?q=${city}`
        } else {
            payload = currentLocation ? `?lat=${currentLocation.lat}&lng=${currentLocation.lng}` : '';
        }
        return Proteus().get(URLS.getCities() + payload);
    },
    getCuisines(cityId) {
        return Proteus().get(URLS.getCuisines()+ '?city_id=' + cityId);
    },
    getRestaurantList(cuisine) {
        return Proteus().get(URLS.getRestaurantList()+ '?entity_type=zone&cuisines=' + cuisine);
    },
}