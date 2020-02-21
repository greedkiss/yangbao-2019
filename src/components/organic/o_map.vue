<template>
  <div ref="omap" class="mod_map"></div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array
    },
    place: {
      type: Object
    },
    mapCenter: {
      type: Object
    }
  },
  watch: {
    'place.lon':{
      handler: function(){
        this.repaint(this.data)
      }
    },
    'data': {
      handler: function(){
        this.repaint(this.data)
      }
    },
    'mapCenter.lon':{
      handler: function(){
        this.repaint(this.data)
      }
    }
  },
  mounted() {
    this.repaint(this.data);
  },
  methods: {
    repaint(data) {
      var map = new window.BMap.Map(this.$refs.omap); // 创建Map实例
      if (this.mapCenter.level == 0) {
        map.centerAndZoom(
          new BMap.Point(this.place.lon, this.place.lan),
          this.place.level
        );
      } else {
        map.centerAndZoom(
          new BMap.Point(this.mapCenter.lon, this.mapCenter.lan),
          this.mapCenter.level
        );
      } // 初始化地图,设置中心点坐标和地图级别

      map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放

      map.setMapStyle({
        styleJson: [
          {
            featureType: "water",
            elementType: "all",
            stylers: {
              color: "#044161"
            }
          },
          {
            featureType: "land",
            elementType: "all",
            stylers: {
              color: "#091934"
            }
          },
          {
            featureType: "boundary",
            elementType: "geometry",
            stylers: {
              color: "#064f85"
            }
          },
          {
            featureType: "railway",
            elementType: "all",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "highway",
            elementType: "geometry",
            stylers: {
              color: "#004981"
            }
          },
          {
            featureType: "highway",
            elementType: "geometry.fill",
            stylers: {
              color: "#005b96",
              lightness: 1
            }
          },
          {
            featureType: "highway",
            elementType: "labels",
            stylers: {
              visibility: "on"
            }
          },
          {
            featureType: "arterial",
            elementType: "geometry",
            stylers: {
              color: "#004981",
              lightness: -39
            }
          },
          {
            featureType: "arterial",
            elementType: "geometry.fill",
            stylers: {
              color: "#00508b"
            }
          },
          {
            featureType: "poi",
            elementType: "all",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "green",
            elementType: "all",
            stylers: {
              color: "#056197",
              visibility: "off"
            }
          },
          {
            featureType: "subway",
            elementType: "all",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "manmade",
            elementType: "all",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "local",
            elementType: "all",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "arterial",
            elementType: "labels",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "boundary",
            elementType: "geometry.fill",
            stylers: {
              color: "#029fd4"
            }
          },
          {
            featureType: "building",
            elementType: "all",
            stylers: {
              color: "#1a5787"
            }
          },
          {
            featureType: "label",
            elementType: "all",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "poi",
            elementType: "labels.text.fill",
            stylers: {
              color: "#ffffff"
            }
          },
          {
            featureType: "poi",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#1e1c1c"
            }
          },
          {
            featureType: "administrative",
            elementType: "labels",
            stylers: {
              visibility: "on"
            }
          },
          {
            featureType: "road",
            elementType: "labels",
            stylers: {
              visibility: "off"
            }
          }
        ]
      });

      var dataSet = new mapv.DataSet(data);

      var options = {
        splitList: {
          other: "yellow",
          1: "green",
          2: "yellow",
          3: "red",
          4: "blue"
        },
        size: 3,
        max: 30,
        draw: "category"
      };

      var mapvLayer = new mapv.baiduMapLayer(map, dataSet, options);
    }
  }
};
</script>

<style lang="stylus"></style>