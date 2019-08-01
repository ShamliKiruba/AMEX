<template>
  <div>
    Hi
    <div class="autocomplete">
      <input type="text" v-model="search" @keyup="fetchCityList(search, 'userinput')"/>
      <ul  class="autocomplete-results" v-show="showSuggestedCitites">
        <li  class="autocomplete-result" v-for="(city, i) in citySearch" :key="i" @click="captureCity(city)">
          {{ city.cityName }}
        </li>
      </ul>
    </div>

    <select v-show="showSuggestedCuisine" @change="captureCuisine($event)">
      <option v-for="(cuisine, i) in cuisineList" :key="i" :value="cuisine.cuisineId">
        {{ cuisine.cuisineName }}
      </option>
    </select>

    <input type="range" min="1" max="5" v-model="guestRating" @change="filterRating()">

    <div class="restaurant-container" v-if="restaurantList.length >= 1">
      <div class="restaurant" v-for="(restaurant,index) in restaurantList" :key="index">
        <span class="rating">{{restaurant.user_rating.aggregate_rating}}</span>
        <img :src="restaurant.featured_image"/>
        <p>{{restaurant.name}} </p>
        <div class="address">
          {{restaurant.location.address}}, {{restaurant.location.city}}
        </div>
        <p>{{restaurant.cuisines}} </p>
      </div>
    </div>
    <div v-else>
      Sorry. No restaurants to display!
    </div>

    <div>
      <button @click="clearFilter">Clear Filter</button>
    </div>
  </div>
</template>
<script>
import Service from '../Service/Service.js'
export default {
  data() {
    return {
      citySearch : [],
      cuisineList : [],
      search: 'Pune',
      showSuggestedCitites : false,
      showSuggestedCuisine : false,
      restaurantList : [],
      allRestaurants : [],
      sortedList : [],
      guestRating : 2.5
    };
  },
  methods: {
    clearFilter() {
      this.restaurantList = this.allRestaurants;
    },
    fetchCityList(city, userinput) {
      let self = this;
      Service.getCities(this.search).then(res => {
        let cities = res.data.location_suggestions;
        this.citySearch = cities.map(city => {
          return { cityName: city.name,cityId : city.id }
        });
        if(userinput) {
          this.showSuggestedCitites = true;
        } else {
          self.captureCity(self.citySearch[0])
        }
      });
    },
    captureCity(city) {
      this.search = city ? city.cityName : this.search;
      this.showSuggestedCitites = false;
      Service.getCuisines(city.cityId).then(res => {
        this.cuisineList = res.data.cuisines.map(cuisine => {
          return { cuisineName: cuisine.cuisine.cuisine_name, cuisineId : cuisine.cuisine.cuisine_id }
        });
        this.showSuggestedCuisine = true;
        this.captureCuisine();
      });
    },
    captureCuisine(e) {
      let cuisine = e ? e.target.value : 1035;
      Service.getRestaurantList(cuisine).then(res => {
        this.allRestaurants = res.data.restaurants;
        this.restaurantList = this.allRestaurants;
      });
    },
    filterRating() {
      let self = this;
      this.sortedList = this.allRestaurants.filter(item => (Math.round(item.user_rating.aggregate_rating) == self.guestRating));
      this.restaurantList = this.sortedList;
    }
  },
  created() {
    this.fetchCityList();

  },
}
</script>
<style lang="scss">
  .autocomplete {
    position: relative;
    width: 130px;
  }

  .autocomplete-results {
    padding: 0;
    margin: 0;
    border: 1px solid #eeeeee;
    height: 120px;
    overflow: auto;
  }

  .autocomplete-result {
    list-style: none;
    text-align: left;
    padding: 4px 2px;
    cursor: pointer;
  }

  .autocomplete-result:hover {
    background-color: #4AAE9B;
    color: white;
  }
  ul {
  list-style: none;
}
.restaurant-container {
  display: flex;
  flex-wrap: wrap;
  width: 80%;
  margin: auto;
  .restaurant {
    border: 3px solid #e0dbdb;
    border-radius: 3px;
    width: 15%;
    position: relative;
    .rating {
      position: absolute;
      right: 0;
      background-color: #73c12b;
      color: white;
      font-size: large;
      padding: 2px;
      margin: 2px;
    }
    img {
      width: 100%;
    }
  }
}

</style>