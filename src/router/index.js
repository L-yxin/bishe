import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'app',
      component: () => import('../views/main.vue'),
    },
    {
      path: '/index.html',
      redirect: '/' // 重定向到根路由，复用首页组件
    },
    {
      path: '/settlement',
      name: 'settlement',
      component: () => import('../views/settlement.vue'),
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/Admin.vue'),
    },
    {
      path: '/donePay',
      name: 'donePay',
      beforeEnter: (to, from, next) => {
        // 获取路由参数（如果想通过router.push传参）
        const { pay, cash, priceDifference } = to.query
        // 拼接静态页URL
        const staticPageUrl = `/donePay.html?pay=${encodeURIComponent(pay)}&cash=${encodeURIComponent(cash)}&priceDifference=${encodeURIComponent(priceDifference)}`
        // 跳转到静态页
        window.location.href = staticPageUrl
        // 阻止Vue Router默认跳转
        next(false)
      }
    }

  ],
})
router.beforeEach((to, from, next) => {
  if (to.path === '/admin') {
    ElMessageBox.prompt('登录到管理员页面', '提示', {
      placeholder: '请输入密码',
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      inputType: 'password'
    })
      .then(({ value }) => {
        if (value === '123456') {
          next()
        } else {
          ElMessageBox.alert('密码错误', '提示', {})
        }
      })
      .catch(() => {
        ElMessageBox.alert('取消登录', '提示', {})
      })
  }
  else {
    next()
  }
})
export default router
