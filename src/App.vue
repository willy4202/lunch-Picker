<template>
  <div class="vw-100 vh-100 d-flex justify-content-center align-items-center">
    <div class="text-center opacity" v-if="isShow">
      <button type="button" class="btn btn-sm" @click="getLocation">
        현재 위치 설정
      </button>
      <div @click="lunchPicker">
        <img :src="emoji" class="img-fluid emoji" />
        <h4 class="fw-bold mask">눌러서 점심 찾기</h4>
      </div>
    </div>
    <div
      id="spinner"
      class="spinner-border text-success"
      role="status"
      v-if="!isShow"
    >
      <span></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LunchMain',
  components: {},
  data() {
    return {
      emoji: require(`@/assets/${Math.floor(Math.random() * 4 + 1)}.gif`),
      isShow: true,
      x: '127.0257878',
      y: '37.4995166',
    };
  },

  created() {},

  mounted() {},

  updated() {
    console.log(this.x, this.y);
  },

  methods: {
    success: function (pos) {
      var crd = pos.coords;
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      (crd.latitude = this.x), (crd.longitude = this.y);
      return crd.latitude, crd.longitude;
    },

    error: function (err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    },

    getLocation: function () {
      return navigator.geolocation.getCurrentPosition(this.success, this.error);
    },

    async getRestaurant() {
      this.isShow = !this.isShow;

      const baseUrl = `https://dapi.kakao.com/v2/local/search/keyword.json?y=${this.y}&x=${this.y}&radius=500`;
      const url = `${baseUrl}&query=${encodeURIComponent(
        '강남역 점심'
      )}&page=${this.randomPage()}`;
      const authorization = 'KakaoAK a6e6b1da205e7e44358765185414aa27';
      const res = await fetch(url, {
        headers: {
          Authorization: authorization,
        },
      });
      const json = await res.json();
      return json.document;
    },

    randomPage() {
      const START = 1;
      const END = 40;

      return Math.floor(Math.random() * (END - START + 1) + START);
    },

    async lunchPicker() {
      const restaurants = await this.getRestaurant();
      const picked =
        restaurants[Math.floor(Math.random() * restaurants.length)];

      location.href = picked.place_url;
    },
  },
};
</script>

<style scoped>
.emoji {
  width: 50%;
  margin: 3vh 0 10vh;
}

.btn {
  background-color: gold;
}

h4:hover {
  color: gold;
  transition: 0.3s;
}

.opacity {
  animation: fadein 1s;
  -moz-animation: fadein 1s; /* Firefox */
  -webkit-animation: fadein 1s; /* Safari and Chrome */
  -o-animation: fadein 1s; /* Opera */
}
@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@-moz-keyframes fadein {
  /* Firefox */
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@-webkit-keyframes fadein {
  /* Safari and Chrome */
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@-o-keyframes fadein {
  /* Opera */
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
