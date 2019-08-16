<template>
	<div ref="bmap" class="mod_map"></div>
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
		}
	},
	data() {
		return {
			city: ""
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
		repaint() {
			var map = new window.BMap.Map(this.$refs.bmap) // 创建Map实例
			var point =new BMap.Point(this.longitude, this.latitude) //创建地图坐标点,一般首次创建的这个点为地图的中心坐标点
			map.centerAndZoom(point, 14) // 用城市名设置地图中心点
			map.enableScrollWheelZoom(true) // 开启鼠标滚轮缩放
			var marker = new BMap.Marker(point);//创建标注
            map.addOverlay(marker);//方法addOverlay() 向地图中添加覆盖物(小红点)
		}
	}
}
</script>

<style lang="stylus">
.mod_map
	width 100%
	height 175px
</style>
