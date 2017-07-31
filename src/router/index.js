import Vue from 'vue'
import Router from 'vue-router'
import rank from '@/components/rank/rank'
import rankDetail from '@/components/rank/rankDetail'

import recommend from '@/components/recommend/recommend'
import recommendDetail from '@/components/recommend/recommendDetail'
import serach from '@/components/serach/serach'
import singer from '@/components/singer/singer'
import singerDetail from '@/components/singer-detail/singer-detail'



Vue.use(Router)



export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      name: 'recommend',
      component: recommend,
      children:[
        {
        	path:':dissid',
        	component:recommendDetail
        }
      ]
    },
    {
      path: '/rank',
      name: 'rank',
      /*
      meta:{
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      */
      component: rank,
      children:[
        {
        	path:':id',
        	component:rankDetail
        }
      ]
    },
    
    {
      path: '/serach',
      name: 'serach',
      component: serach
    },
    {
      path: '/singer',
      name: 'singer',
      component: singer,
      children:[
        {
        	path:':id',
        	component:singerDetail
        }
      ]
    }
    

  ]
})
