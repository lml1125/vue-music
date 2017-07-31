// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import jsonp from 'common/js/jsonp'
import {commonParams,options} from './config'
import axios from 'axios'
export function getRecommend(){
	const url = "https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg"
    const data = Object.assign({},commonParams,{
      platform:'h5',
      uin:0,
      needNewCode:1
    })
    
    return jsonp(url,data,options)
}


export function getMusicbox(){
	const url ='https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
    const data = Object.assign({},commonParams,{
        platform:'yqq',
		hostUin:0,
		loginUin:0,
		sin:0,
		ein:29,
		sortId:5,
		needNewCode:0,
		categoryId:10000000,
		rnd:Math.random()
    })
    
    return jsonp(url,data,options)
}
export function getMusicList() {
	const url ='/api/getMusicList'
	//const url ='https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_tag_conf.fcg'
	const data = Object.assign({},commonParams,{
		platform:'yqq',
		hostUin:0,
		sin:0,
		ein:29,
		sortId:5,
		needNewCode:0,
		categoryId:10000000,
		rnd:Math.random(),
		format:'json'
	})

	return axios.get(url,{
		params:data
	}).then((res)=>{
        return Promise.resolve(res.data)
	})
}

export function getSongList(disstid) {
  const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'

  const data = Object.assign({}, commonParams, {
    disstid,
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0
  })

  return jsonp(url, data, options)
}

