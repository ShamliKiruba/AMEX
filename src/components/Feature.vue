<template>
  <div>
    <div class="background">
      <div class="overlay">
        <div class="logo">
          <img src="https://b.zmtcdn.com/images/logo/zomato-us-logo.png?output-format=webp"/>
        </div>
        <h1>Find the best restaurants, cafés, and bars near you</h1>
        <div class="search">
          <div class="city">
            <p>Search for city:</p>
            <div class="autocomplete">    
              <input type="text" v-model="search" @input="fetchCityList('userInput', search)" placeholder="Enter your city"/>
              <ul v-show="showSuggestedCitites">
                <li v-for="(city, i) in citySearch" :key="i" @click="captureCity(city)">
                  {{ city.cityName }}
                </li>
              </ul>
            </div>
          </div>
          <div class="cuisine">
            <p>Select your style:</p>
            <select v-show="showSuggestedCuisine" @change="captureCuisine($event)">
              <option v-for="(cuisine, i) in cuisineList" :key="i" :value="cuisine.cuisineId">
                {{ cuisine.cuisineName }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <div class="range-slider">
      <p>Filter on Guest Rating:</p>
      <input type="range" min="1" max="5" class="slider" v-model="guestRating" @change="filterRating()">
      <button @click="clearFilter">Clear</button>
    </div>
    

    <div class="restaurant-container" v-if="restaurantList.length >= 1">
      <div class="restaurant" v-for="(restaurant,index) in restaurantList" :key="index">
        <div class="left">
          <img :src="restaurant.restaurant.featured_image || 'https://d.zmtcdn.com/data/pictures/chains/8/16774318/a54deb9e4dbb79dd7c8091b30c642077_featured_v2.png'"/>                    
        </div>
        <div class="right">
          <p class="rating">{{restaurant.restaurant.user_rating.aggregate_rating}}</p>
          <div class="desc">
            <p class="title">{{restaurant.restaurant.name.toUpperCase()}} </p>
            <div class="address sub-title">
              <p class="locality"> {{restaurant.restaurant.location.locality}}, </p>
              <p class="address-city">{{restaurant.restaurant.location.city}}</p>
              
            </div>
            <span class="sub-title">{{cuisineName(restaurant.restaurant.cuisines)}} </span>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      Sorry. No restaurants to display!
    </div>
  </div>
</template>
<script>
import Service from '../Service/Service.js';
import WebStorage from '../common/WebStorage.js';
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
    cuisineName(cuisine) {
      let temp = cuisine.split(',');
      return temp[0];
    },
    clearFilter() {
      this.restaurantList = this.allRestaurants;
    },
    fetchCityList(triggeredFrom, city) {
      let self = this;
      Service.getCities(this.search).then(res => {
        let cities = res.data.location_suggestions;
        this.citySearch = cities.map(city => {
          return { cityName: city.name,cityId : city.id }
        });
        if(triggeredFrom == 'userInput' && this.search) {
          this.showSuggestedCitites = true;
        } else if(triggeredFrom == 'initialRender') {
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
      this.sortedList = this.allRestaurants.filter(item => (Math.round(item.restaurant.user_rating.aggregate_rating) == self.guestRating));
      this.restaurantList = this.sortedList;
    }
  },
  created() {
    this.fetchCityList('initialRender');

  },
}
</script>
<style lang="scss">
.background {
  background-image: url(https://b.zmtcdn.com/images/foodshots/cover/pizza3.jpg?output-format=webp);
  background-size: cover;
  height: 400px;
  .overlay {
      position: relative;
      background: rgba(0,0,0,0.4);
      height: 100%;
  }
  h1, p {
    top: 10%;
    text-align: center;
    z-index: 1;
    font-weight: 300;
    text-rendering: optimizeLegibility;
    font-size: 28px;
    line-height: 1.3em;
    padding: 0 15px 25px;
    text-shadow: 1px 1px 0 rgba(0,0,0,.3);
    color: #fff;
  }
  .logo {
    img {
      margin: 20px auto;
      height: 100px;
    }
  }
}
.search {
  p {
    padding: 0;
  }
  margin: 40px;
  display: flex;
  justify-content: space-around;
  .city, .cuisine {
    display: flex;
    flex-direction: column;
  }
  .autocomplete {
    position: relative;
    background-color: white;
    margin: 20px 0;
    input  {
      border-radius: 5px;
      text-align: center;
      font-size: 18px;
      color: black;
      padding:5px;
    }
    ul {
      padding: 0;
      margin: 0;
      border: 1px solid #eeeeee;
      height: 120px;
      overflow: auto;
    }

    li {
      list-style: none;
      text-align: left;
      padding: 4px 2px;
      cursor: pointer;
      border: 1px solid #f5f5f5;
    }

    li:hover {
      background-color: #f32537;
      color: white;
    }
  }
  select {
    text-align-last:center;
    font-size: 18px;
    padding: 5px;
    max-height: 40px;
    margin: 20px 0;
  }
}

.range-slider {
  margin: 3% 25%;
  display: flex;
  p {
    width: 30%;
    font-weight: 300;
    text-rendering: optimizeLegibility;
    font-size: 16px;
    line-height: 1.3em;
  }
  .slider {
    margin:5px;
    width: 40%;
    -webkit-appearance: none;
    width: 50%;
    height: 7px;
    background: #ea0048;
    outline: none;
    -webkit-transition: .2s;
    transition: opacity .2s;
  }
  .slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    background: black;
    border-radius: 10px;
    cursor: pointer;
  }
  button {
    margin: -6px 10px;
    height: 30px;
  }
}
.restaurant-container {
  display: flex;
  flex-wrap: wrap;
  width: 90%;
  margin: auto;
  .restaurant {
    border: 3px solid #f70a0a;
    border-radius: 3px;
    width: 25%;
    margin: 2%;
    height: 120px;
    position: relative;
    img {
      width: 40%;
      float: left;
      height:114px;
    }
    .right {
      display: flex;
      .rating {
        position: absolute;
        right: 0;
        background-color: #73c12b;
        color: white;
        font-size: large;
        padding: 2px;
        margin: 2px;
      }
      .desc {
        width: 90%;
        text-align: left;
        padding: 10px;
        line-height: 1.1em;
        .title {
          width:90%;
          font-weight: 700;
          font-size: 16px;
        }
        .sub-title {
          font-size: 12px;
        }
      }
    }
  }
}

@media only screen and (max-width: 490px) {
  .background {
    height:470px;
  }
  .restaurant-container .restaurant {
    width: 90%;
  }
  .search {
    flex-direction: column;
    .autocomplete input, select, p {
      font-size: 18px;
    }
  }
} 

@media (min-width: 491px) and (max-width: 900px) {
  .restaurant-container .restaurant {
    width: 45%;
    .locality {
      display: none;
    }
  }
}
@media screen and (min-width: 900px) {
  .restaurant-container .restaurant {
    width: 29%;
  }
}
</style>