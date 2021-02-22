<template>
  <div id="app" class="container py-5 px-5 mx-auto">
    <p class="text-4xl mb-5">Data Faces</p>
    <select v-if="countFaces.length > 0" @change="fetchFaces" v-model="selected_faces">
      <option v-for="(item, index) in countFaces" :key="index" v-bind:value="item.faces_id">
        {{item.faces_name}}
      </option>
    </select>
    <apexchart v-if="isApexOpen" type="scatter" height="350" :options="chartOptions" :series="series"></apexchart>
    <div v-if="allFaces.length > 0" class="grid md:grid-cols-3 sm:grid-cols-6 gap-4">
      <div
        v-for="(item, index) in allFaces"
        :key="index"
        class="rounded overflow-hidden shadow-lg"
      >
        <span class="py-5">{{ item.faces_name }}</span>
        <br>
        <span class="py-5">{{ item.createdAt }}</span>
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
  </div>
</template>

<script>


export default {
  name: "App",
  components: {
  },
  data() {
    return {
      isApexOpen: false,
      allFaces: [],
      countFaces: [],
      selected_faces:'1',
      series: [],
      chartOptions: {
        chart: {
          height: 350,
          type: 'scatter',
          zoom: {
            enabled: true,
            type: 'xy'
          }
        },
        xaxis: {
          tickAmount: 10,
          labels: {
            formatter: function (val) {
              return parseFloat(val).toFixed(1)
            }
          }
        },
        yaxis: {
          tickAmount: 7,
          labels: {
            formatter: function (val) {
              return parseFloat(val).toFixed(1)
            }
          }
        }
      },
    };
  },
  computed:{
    
  },
  mounted() {
    this.getFaces()
    this.fetchFaces();
  },
  methods: {
    async getFaces(){
      await this.$db.collection("faces").onSnapshot((result) => {
        let countFaces_ = [];
        result.forEach((doc) => {
          countFaces_.push(doc.data());
        });
        
        this.countFaces = this.$_.chain(countFaces_).groupBy("faces_id").map((value, key) => ({ faces_id: key, faces_name:value[0].faces_name, data: value })).value();
      });


    },
    async fetchFaces() {
      await this.$db.collection("faces").where("faces_id", "==", this.selected_faces).onSnapshot((result) => {
        let allFaces_ = [];
        result.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          allFaces_.push(doc.data());
        });
        this.allFaces = allFaces_;
        this.series = [];
        for (const [index,value] of allFaces_.entries()) {
          let nodes = [];
          for (const v of value.faces[0].allLandmarks) {
              nodes.push(v.position);
          }
          let series_value = {
            name: 'Face '+index,
            data : nodes
          }; 

            this.series.push(series_value);
        }
        // console.log(series);
        this.isApexOpen = true;
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
.title{
  position:absolute;
  text-align: center;
  left: 2em;
}
h1,a{
  color: #1aad8d;
  text-decoration: none;
}

ul.menu {
  list-style: none;
  position: absolute;
  z-index: 100;
  min-width: 20em;
  text-align: left;
}
ul.menu li{
  margin-top: 1em;
  position: relative;
}

</style>
