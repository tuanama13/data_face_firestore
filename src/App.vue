<template>
  <div id="app" class="container py-5 px-5">
    <p class="text-4xl mb-5">Data Faces</p>

    <div v-if="allFaces.length > 0" class="grid grid-cols-3 gap-4">
      <div
        v-for="(item, index) in allFaces"
        :key="index"
        class="rounded overflow-hidden shadow-lg"
      >
        <div v-for="(v, i) in item.faces" :key="i" class="px-6 py-4 text-left">
          <div class="my-4">
            <h4 class="font-bold text-xl mb-2">Bounding Box</h4>
            <json-viewer
              style="padding-top: 0px"
              :value="v.boundingBox"
            ></json-viewer>
          </div>
          <div class="my-4">
            <h4 class="font-bold text-xl mb-2">Face Contour</h4>
            <ul>
              <li v-for="(vc, ic) in v.allContours" :key="ic">
                <json-viewer style="padding-top: 0px" :value="vc"></json-viewer>
              </li>
            </ul>
          </div>
          <div class="my-4">
            <h4 class="font-bold text-xl mb-2">Face Landmarks</h4>
            <ul>
              <li v-for="(vl, il) in v.allLandmarks" :key="il">
                <json-viewer style="padding-top: 0px" :value="vl"></json-viewer>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- <ol v-if="allFaces.length > 0" style="text-align: left">
      <li v-for="(item, index) in allFaces" :key="index">
        <div v-for="(v, i) in item.faces" :key="i">
          <h4>Bounding Box</h4>
          <json-viewer
            style="padding-top: 0px"
            :value="v.boundingBox"
          ></json-viewer>
          <h4>Face Contour</h4>
          <ul>
            <li v-for="(vc, ic) in v.allContours" :key="ic">
              <json-viewer style="padding-top: 0px" :value="vc"></json-viewer>
            </li>
          </ul>
          <br />
          <h4>Face Landmarks</h4>
          <ul>
            <li v-for="(vl, il) in v.allLandmarks" :key="il">
              <json-viewer style="padding-top: 0px" :value="vl"></json-viewer>
            </li>
          </ul>
        </div>
      </li>
    </ol> -->
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
.jv-container .jv-code {
  padding: 0px 0px;
}
</style>
