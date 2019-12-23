// 权限拦截 导航守卫

import router from '../router'
// 再 路由上设置全局守卫
router.beforeEach(function (to, from, next) {
  // to是路由即将进入的目标路由对象
  // from是当前导航正要离开的路由
  // next 一定要调用方法来reslove这个钩子
  // 判断如果我进入的路由前地址是/home 判断其有没有携带token 有则放过没有需要回到登录页
  if (to.path.startsWith('/home')) {
    let token = window.localStorage.getItem('user-token')
    if (token) {
      // 进行管道的下一个钩子
      next()
    } else {
      // 当前导航被终止 跳转到新的导航地址
      next('/login')
    }
  } else {
    next()
  }
})
