<template>
  <div class="vw-100 vh-100 d-flex justify-content-center align-items-center">
    <div class="text-center">
      <button type="button" class="btn btn-sm" @click="getLocation">
        현재 위치 설정
      </button>
      <div @click="getRestaurant">
        <img :src="emoji" class="img-fluid emoji" />
        <h4 class="fw-bold mask">눌러서 점심 찾기</h4>
      </div>
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
    };
  },

  created() {},

  updated() {},

  methods: {
    success: function (pos) {
      var crd = pos.coords;
      console.log('Yourcurrent position is:');
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less${crd.accuracy} meters.`);

      return crd.latitude, crd.longitude;
    },

    error: function (err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    },

    getLocation: function () {
      return navigator.geolocation.getCurrentPosition(this.success, this.error);
    },

    getRestaurant() {
      console.log('hi');
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
</style>
