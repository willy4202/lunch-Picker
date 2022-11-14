<template>
  <article>
    <div
      class="vw-100 vh-100 d-flex justify-content-center align-items-center wrapper"
    >
      <div class="darkMode" v-if="isLoading">
        <div class="spinIcon">
          <div class="spinner-border text-warning" role="status">
            <span class="sr-only"></span>
          </div>
        </div>
      </div>
      <div class="text-center opacity" v-if="isShow">
        <div>
          <select v-model="category">
            <option v-for="category in categories" :key="category.id">
              {{ category.menu }}
            </option>
          </select>
          <button type="button" class="btn btn-sm mb-3" @click="getLocation">
            현재 위치 설정
          </button>
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
      x: 127.0257765,
      y: 37.4995064,
      platform: '',
      isLoading: false,
      categories: [
        { id: 0, menu: '한식' },
        { id: 1, menu: '일식' },
        { id: 2, menu: '중식' },
        { id: 3, menu: '양식' },
      ],
    };
  },

  methods: {
    async success(pos) {
      let crd = pos.coords;
      let long = crd.longitude;
      let lat = crd.latitude;

      this.x = long;
      this.y = lat;
    },

    error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    },

    async getLocation() {
      await this.loading(true);

      console.log(this.x, this.y);
      const location = await navigator.geolocation.getCurrentPosition(
        this.success,
        this.error
      );

      await this.loading(false);

      console.log(this.x, this.y);
      return location;
    },

    loading(is) {
      this.isLoading = is;
    },

    async getRestaurant() {
      this.isShow = !this.isShow;
      const baseUrl = `https://dapi.kakao.com/v2/local/search/keyword.json?y=${this.y}&x=${this.x}&radius=600`;
      const url = `${baseUrl}&query=${encodeURIComponent(
        `${this.platform} ${this.category} 맛집`
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
      const picked =
        restaurants.documents[
          Math.floor(Math.random() * restaurants.documents.length) + 1
        ];

      console.log(restaurants.documents);
      console.log(picked);

      location.href = picked.place_url;
    },

    changeKeyword(e) {
      this.platform = e.target.value;
    },
  },
};
</script>

<style scoped>
article {
  position: relative;
}

.darkMode {
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: black;
  opacity: 20%;
  z-index: 30;
}

.spinIcon {
  z-index: 100;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
