<template>
  <div id="app">
    <h1>Faces</h1>
    <ol style="text-align: left">
      <li v-for="(item, index) in allFaces" :key="index">
        <!-- {{ item.faces }} -->
        <div v-for="(v, i) in item.faces" :key="i">
          <h4>Bounding Box</h4>
          {{ v.boundingBox }}
          <h4>Face Contour</h4>
          <ul>
            <li v-for="(vc, ic) in v.allContours" :key="ic">
              {{ vc }}
            </li>
          </ul>
          <br />
          <h4>Face Landmarks</h4>
          <ul>
            <li v-for="(vl, il) in v.allLandmarks" :key="il">
              {{ vl }}
            </li>
          </ul>
        </div>
      </li>
    </ol>
    <!-- <div v-for="(item, index) in allFaces" :key="index">
      {{ item }}
    </div> -->
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      allFaces: [],
    };
  },
  mounted() {
    this.fetchFaces();
  },
  methods: {
    async fetchFaces() {
      await this.$db.collection("faces").onSnapshot((result) => {
        let allFaces_ = [];
        result.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          allFaces_.push(doc.data());
        });
        this.allFaces = allFaces_;
      });
    },
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
