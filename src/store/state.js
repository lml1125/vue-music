import {playMode} from 'common/js/config'
//状态
const state = {
	singer:{},
	playing:false,//播放
	fullScreen:false,//是否全屏
	playList:[],//播放列表  不同播放模式，播放列表是不一样的
	disc: {},
	topList:{},
	sequenceList:[],//原始歌曲列表
	mode:playMode.sequence, //播放模式  sequence:0, loop:1,  random:2
	currentSong:{},
	currentIndex:-1//当前播放的索引
}

export default state