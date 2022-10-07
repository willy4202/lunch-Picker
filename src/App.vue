<template>
  <div
    class="vw-100 vh-100 bg-warning d-flex justify-content-center align-items-center"
  >
    <div class="text-center">
      <button
        type="button"
        class="btn btn-light btn-sm"
        data-toggle="tooltip"
        data-placement="top"
        title="Tooltip on top"
        @click="getLocation"
      >
        현재 위치 설정
      </button>
      <div @click="getRestaurant">
        <img :src="emoji" class="img-fluid" />
        <h4
          class="text-white fw-bold mask"
          style="
            color: linear-gradient(
              45deg,
              rgba(29, 236, 197, 0.5),
              rgba(91, 14, 214, 0.5) 100%
            );
          "
        >
          눌러서 점심 찾기
        </h4>
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
