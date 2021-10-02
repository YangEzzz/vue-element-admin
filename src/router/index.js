import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: () => import('@/views/dashboard/index'),
        name: '首页',
        meta: { title: '首页', icon: 'guide', affix: true }
      }
    ]
  }

]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  // 404 page must be placed at the end !!!
  {
    path: '/Result',
    component: Layout,
    name: '成绩',
    redirect: '/Result/create',
    children: [
      {
        name: '个人成绩',
        path: '/Result/PersonalResult',
        component: () => import('@/views/Result/PersonalResult'),
        // eslint-disable-next-line no-sequences
        meta: { title: '个人成绩', icon: 'documentation', roles: (['admin'], ['editor']) }
      }
    ]
  },
  {
    path: '/AdvangeResult',
    component: Layout,
    name: '平均成绩',
    redirect: '/AdvangeResult',
    // eslint-disable-next-line no-sequences
    meta: { title: '平均成绩', icon: 'documentation', roles: (['admin'], ['editor']) },
    children: [
      {
        name: '班级平均成绩',
        path: '/AdvangeResult/ClassAdv',
        component: () => import('@/views/AdvangeResult/ClassAdv'),
        // eslint-disable-next-line no-sequences
        meta: { title: '班级平均成绩', icon: 'documentation', roles: (['admin'], ['editor']) }
      },
      {
        name: '全级平均成绩',
        path: '/AdvangeResult/AllAdv',
        component: () => import('@/views/AdvangeResult/AllAdv'),
        // eslint-disable-next-line no-sequences
        meta: { title: '全级平均成绩', icon: 'documentation', roles: (['admin'], ['editor']) }
      }
    ]
  },
  {
    path: '/Rank',
    component: Layout,
    redirect: '/Rank',
    name: '排名',
    // eslint-disable-next-line no-sequences
    meta: { title: '成绩排名', icon: 'documentation', roles: (['admin'], ['editor']) },
    children: [
      {
        name: '班级排名',
        path: '/Rank/ClassRank',
        component: () => import('@/views/rank/ClassRank'),
        // eslint-disable-next-line no-sequences
        meta: { title: '班级排名', icon: 'documentation', roles: (['admin'], ['editor']) }
      },
      {
        name: '全级排名',
        path: '/Rank/AllRank',
        component: () => import('@/views/rank/AllRank'),
        // eslint-disable-next-line no-sequences
        meta: { title: '全级排名', icon: 'documentation', roles: (['admin'], ['editor']) }
      }
    ]
  },
  {
    path: '/statistics',
    component: Layout,
    name: '统计',
    redirect: '/statistics',
    // eslint-disable-next-line no-sequences
    meta: { title: '统计', icon: 'documentation', roles: (['admin'], ['editor']) },
    children: [
      {
        name: '优秀率',
        path: '/statistics/ExcellentRate',
        component: () => import('@/views/statistics/ExcellentRate'),
        // eslint-disable-next-line no-sequences
        meta: { title: '优秀率', icon: 'documentation', roles: (['admin'], ['editor']) }
      },
      {
        name: '及格率',
        path: '/statistics/PassRate',
        component: () => import('@/views/statistics/PassRate'),
        // eslint-disable-next-line no-sequences
        meta: { title: '及格率', icon: 'documentation', roles: (['admin'], ['editor']) }
      },
      {
        name: '不及格人数',
        path: '/statistics/FailNum',
        component: () => import('@/views/statistics/FailNum'),
        // eslint-disable-next-line no-sequences
        meta: { title: '不及格人数', icon: 'documentation', roles: (['admin'], ['editor']) }
      }
    ]
  },
  {
    path: '/Charts',
    component: Layout,
    redirect: '/Charts/chart',
    children: [
      {
        name: '分数段条形图',
        path: '/Charts/chart',
        component: () => import('@/views/Charts/chart'),
        // eslint-disable-next-line no-sequences
        meta: { title: '分数段条形图', icon: 'chart', roles: (['admin'], ['editor']) }
      }
    ]
  },
  {
    path: '/change',
    component: Layout,
    name: '修改成绩',
    redirect: '/changeResult',
    meta: { title: '修改上传成绩信息', icon: 'list', roles: ['admin'] },
    children: [
      {
        name: '修改班级成绩',
        path: '/changeResult/change',
        params: '',
        component: () => import('@/views/changeResult/change'),
        meta: { title: '修改成绩信息', icon: 'edit', roles: ['admin'] }
      },
      {
        name: '上传班级成绩',
        path: '/changeResult/create',
        component: () => import('@/views/changeResult/create'),
        meta: { title: '上传班级成绩', icon: 'edit' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
