<template>
	<div @click="goBMap" @touchend="goBMap"  ref="bmap" :class="mapClass" ></div>
</template>

<script>
export default {
	props: {
		address: {
			type: String,
			default: "北京市"
		},
		longitude: {
			type: String
		},
		latitude: {
			type: String
		},
		mobile:{
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			city: "",
			currLat: '',
			currLng: '',
			mapClass:'mobile_map'
		}
	},
	created () {
		console.log(1111)
		if(!this.mobile){
			this.mapClass='mod_map'
		}
	},
    watch: {
        longitude() {
            this.repaint()
        }
    },
	mounted() {
	},
	methods: {
		getCity(address) {
			if (!address) {
				return "北京市"
			} else if (~this.address.indexOf("区") || ~this.address.indexOf("县")) {
				return ~this.address.indexOf("区") ?
					this.address.substring(0, this.address.indexOf("区") + 1) :
					this.address.substring(0, this.address.indexOf("县") + 1)
			} else if (~this.address.indexOf("市")) {
				return this.address.substring(0, this.address.indexOf("市") + 1)
			} else if (~this.address.indexOf("省")) {
				return this.address.substring(0, this.address.indexOf("省") + 1)
			} else {
				this.$message({
					message: "地址无法解析",
					type: "warning"
				})
				return "北京市"
			}
		},
		goBMap() {
			window.open("https://api.map.baidu.com/direction?origin=latlng:" + this.currLat + "," + this.currLng + "|name:我所在位置&destination=latlng:" +  this.latitude + "," + this.longitude + "|name:终点&mode=driving&region=北京&output=html&src=yourCompanyName|yourAppName","_blank");
		},
		repaint() {
			var map = new window.BMap.Map(this.$refs.bmap) // 创建Map实例
			var point =new BMap.Point(this.longitude, this.latitude) //创建地图坐标点,一般首次创建的这个点为地图的中心坐标点
			map.centerAndZoom(point, 14) // 用城市名设置地图中心点

			var walking = new BMap.DrivingRoute(map, {
				renderOptions : {
					map : map,
					autoViewport : true
				}
			});


        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition((r) => {
            if (geolocation.getStatus() == BMAP_STATUS_SUCCESS) {
                var opts = {
                    position : r.point, // 指定文本标注所在的地理位置
                    offset : new BMap.Size(10, -10)
                //设置文本偏移量
				}
			}

			                //在地图上标注当前位置
                var label = new BMap.Label("您的位置", opts); // 创建文本标注对象
                label.setStyle({
                    color : "red",
                    fontSize : "12px",
                    height : "20px",
                    lineHeight : "20px",
                    fontFamily : "微软雅黑"
                });
                map.addOverlay(label);

                var opts1 = {
                    position : point, // 指定文本标注所在的地理位置
                    offset : new BMap.Size(10, -10)
                //设置文本偏移量
                }
                //在地图上标注目的地位置
                var label1 = new BMap.Label("终点", opts1); // 创建文本标注对象
                label1.setStyle({
                    color : "red",
                    fontSize : "12px",
                    height : "20px",
                    lineHeight : "20px",
                    fontFamily : "微软雅黑"
                });
                map.addOverlay(label1);

				walking.search(r.point, point);

				this.currLat = r.point.lat;
				this.currLng = r.point.lng;
				
				//window.location.href = "https://api.map.baidu.com/direction?origin=latlng:" + r.point.lat + "," + r.point.lng + "|name:我所在位置：&destination=合肥万达乐园&mode=driving&region=江苏&output=html&src=yourCompanyName|yourAppName";

		},{
            enableHighAccuracy : true
        })

			map.enableScrollWheelZoom(true) // 开启鼠标滚轮缩放
			var marker = new BMap.Marker(point);//创建标注
            //map.addOverlay(marker);//方法addOverlay() 向地图中添加覆盖物(小红点)
		}
	}
}
</script>

<style lang="stylus">
.mod_map
	width 100%
	height 175px
.mobile_map
	width 100%
	height 400px
</style>
