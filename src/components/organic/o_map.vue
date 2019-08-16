<template>
	<div ref="omap" class="mod_map"></div>
</template>

<script>
export default {
	data() {
		return {
			
		}
	},
    props: {
        data: {
            type: Array
        },
        mapCenter: {
            type: Object
        }
    },
    watch: {
        data(newId) {
            this.repaint(newId)
        }
    },
	mounted() {
		this.repaint(this.data)
	}, 
	methods: {
		 repaint(data){
            var map = new window.BMap.Map(this.$refs.omap) // 创建Map实例
            map.centerAndZoom(new BMap.Point(this.mapCenter.lon, this.mapCenter.lan), this.mapCenter.level)  // 初始化地图,设置中心点坐标和地图级别
            map.enableScrollWheelZoom(true) // 开启鼠标滚轮缩放
            
            map.setMapStyle({
                styleJson: [{
                    "featureType": "water",
                    "elementType": "all",
                    "stylers": {
                        "color": "#044161"
                    }
                }, {
                    "featureType": "land",
                    "elementType": "all",
                    "stylers": {
                        "color": "#091934"
                    }
                }, {
                    "featureType": "boundary",
                    "elementType": "geometry",
                    "stylers": {
                        "color": "#064f85"
                    }
                }, {
                    "featureType": "railway",
                    "elementType": "all",
                    "stylers": {
                        "visibility": "off"
                    }
                }, {
                    "featureType": "highway",
                    "elementType": "geometry",
                    "stylers": {
                        "color": "#004981"
                    }
                }, {
                    "featureType": "highway",
                    "elementType": "geometry.fill",
                    "stylers": {
                        "color": "#005b96",
                        "lightness": 1
                    }
                }, {
                    "featureType": "highway",
                    "elementType": "labels",
                    "stylers": {
                        "visibility": "on"
                    }
                }, {
                    "featureType": "arterial",
                    "elementType": "geometry",
                    "stylers": {
                        "color": "#004981",
                        "lightness": -39
                    }
                }, {
                    "featureType": "arterial",
                    "elementType": "geometry.fill",
                    "stylers": {
                        "color": "#00508b"
                    }
                }, {
                    "featureType": "poi",
                    "elementType": "all",
                    "stylers": {
                        "visibility": "off"
                    }
                }, {
                    "featureType": "green",
                    "elementType": "all",
                    "stylers": {
                        "color": "#056197",
                        "visibility": "off"
                    }
                }, {
                    "featureType": "subway",
                    "elementType": "all",
                    "stylers": {
                        "visibility": "off"
                    }
                }, {
                    "featureType": "manmade",
                    "elementType": "all",
                    "stylers": {
                        "visibility": "off"
                    }
                }, {
                    "featureType": "local",
                    "elementType": "all",
                    "stylers": {
                        "visibility": "off"
                    }
                }, {
                    "featureType": "arterial",
                    "elementType": "labels",
                    "stylers": {
                        "visibility": "off"
                    }
                }, {
                    "featureType": "boundary",
                    "elementType": "geometry.fill",
                    "stylers": {
                        "color": "#029fd4"
                    }
                }, {
                    "featureType": "building",
                    "elementType": "all",
                    "stylers": {
                        "color": "#1a5787"
                    }
                }, {
                    "featureType": "label",
                    "elementType": "all",
                    "stylers": {
                        "visibility": "off"
                    }
                }, {
                    "featureType": "poi",
                    "elementType": "labels.text.fill",
                    "stylers": {
                        "color": "#ffffff"
                    }
                }, {
                    "featureType": "poi",
                    "elementType": "labels.text.stroke",
                    "stylers": {
                        "color": "#1e1c1c"
                    }
                }, {
                    "featureType": "administrative",
                    "elementType": "labels",
                    "stylers": {
                        "visibility": "on"
                    }
                },{
                    "featureType": "road",
                    "elementType": "labels",
                    "stylers": {
                        "visibility": "off"
                    }
                }]
            });

            // var randomCount = 300

            // var data = []

            // var citys = ["北京","天津","上海","重庆","石家庄","太原","呼和浩特","哈尔滨","长春","沈阳","济南","南京","合肥","杭州","南昌","福州","郑州","武汉","长沙","广州","南宁","西安","银川","兰州","西宁","乌鲁木齐","成都","贵阳","昆明","拉萨","海口"]

            // // 构造数据
            // while (randomCount--) {
            //     var cityCenter = mapv.utilCityCenter.getCenterByCityName(citys[parseInt(Math.random() * citys.length)])
            //     data.push({
            //         geometry: {
            //             type: 'Point',
            //             coordinates: [cityCenter.lng - 2 + Math.random() * 4, cityCenter.lat - 2 + Math.random() * 4]
            //         },
            //         // count: parseInt(4 * Math.random())
            //         count: 2
            //     })
            // }
            var dataSet = new mapv.DataSet(data)

            var options = {
                splitList: { 
                    other: 'yellow',
                    1: 'green',
                    2: 'yellow',
                    3: 'red'
                },
                size: 3,
                max: 30,
                draw: 'category'
            }

            var mapvLayer = new mapv.baiduMapLayer(map, dataSet, options)
         }
	}
}
</script>

<style lang="stylus">
</style>