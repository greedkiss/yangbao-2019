import Vue from 'vue'

let app = new Vue()

export default async(id = '', method = 'getArea') => {
	let url = 'https://cors.io/?https://apis.map.qq.com/ws/district/v1/getchildren'
	if(id.length == 0){
		url = url + '?' + 'key=DHYBZ-2HQKD-63E4Q-HGKZC-P3GEJ-ISFDM'
	}else{
		url = url + '?' + 'id=' + id + '&key=DHYBZ-2HQKD-63E4Q-HGKZC-P3GEJ-ISFDM'
	}
	let requestConfig = {
		method: 'GET',
	}
	try {
            const response = await fetch(url, requestConfig);

            const responseJson = await response.json();

            if (response) {
                return responseJson
            }
        } catch (error) {
            app.$message.error(error.message || '请求失败')
            return false
        }
}
