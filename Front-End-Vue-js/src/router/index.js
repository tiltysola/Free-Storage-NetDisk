import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Frame from '@/components/Frame'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/Frame',
      name: 'Frame',
      component: Frame
    }
  ]
})
