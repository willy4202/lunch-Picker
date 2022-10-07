<template>
  <article>
    <div
      class="vw-100 vh-100 d-flex justify-content-center align-items-center wrapper"
    >
      <div class="text-center opacity" v-if="isShow">
        <div>
          <!-- <button type="button" class="btn btn-sm" @click="getLocation">
            현재 위치 설정
          </button> -->
          <p>지하철역 이름을 입력해주세요</p>
          <input
            class="input"
            type="text"
            v-model="platform"
            placeholder="지하철역을 기준으로 맛집을 찾아보세요"
          />
        </div>
        <div @click="lunchPicker">
          <img :src="emoji" class="img-fluid emoji" />
          <h4 class="fw-bold mask">눌러서 점심 찾기</h4>
        </div>
      </div>
      <div class="spinner-grow text-warning" role="status" v-if="!isShow">
        <span class="sr-only"></span>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: 'LunchMain',
  components: {},
  data() {
    return {
      emoji: require(`@/assets/${Math.floor(Math.random() * 4 + 1)}.gif`),
      isShow: true,

      x: '127',
      y: '26',
      platform: '강남역',
    };
  },

  updated() {
    console.log(this.platform);
  },

  methods: {
    async success(pos) {
      let crd = pos.coords;
      let long = crd.longitude;
      let lat = crd.latitude;

      this.x = long;
      this.y = lat;
      console.log(long, lat);
      alert('위치 설정 완료');
    },

    error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    },

    getLocation() {
      return navigator.geolocation.getCurrentPosition(this.success, this.error);
    },

    async getRestaurant() {
      this.isShow = !this.isShow;
      const baseUrl = `https://dapi.kakao.com/v2/local/search/keyword.json?y=${this.y}&x=${this.y}&radius=50`;
      const url = `${baseUrl}&query=${encodeURIComponent(
        `${this.platform} 맛집`
      )}&page=${this.randomPage()}`;
      const authorization = 'KakaoAK a6e6b1da205e7e44358765185414aa27';
      const res = await fetch(url, {
        headers: {
          Authorization: authorization,
        },
      });
      return res.json();
    },

    randomPage() {
      const START = 1;
      const END = 40;
      return Math.floor(Math.random() * END + START);
    },

    async lunchPicker() {
      const restaurants = await this.getRestaurant();
      const picked = restaurants.documents[Math.floor(Math.random())];

      console.log(restaurants.documents);

      location.href = picked.place_url;
    },
  },
};
</script>

<style scoped>
article {
  position: relative;
}

.input {
  display: flex;
  width: 100%;
  text-align: center;
}

.emoji {
  width: 200px;
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
