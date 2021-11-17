import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
//解决vue路由重复导航错误
//获取原型对象上的push函数
const originalPush = Router.prototype.push;
//修改原型对象中的push方法
/**
 * call()函数可以在调用函数的同时，来改变this的指向，常用于实现继承。
  第一个参数this，由于call处于原型对象内部，所以此处this指向的是当前VueRouter的实例对象。而originalPush指向的是VueRouter.prototype.push。旨在于调用当前VueRouter实例对象中的push方法。
  第二个参数location，在方法调用时传入获取到的location。
 */
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      meta: {
        showTab: false
      },
      component: () => import('./views/Login.vue')
    }, {
      path: '/home',
      name: 'home',
      meta: {
        showTab: true
      },
      component: () => import('./views/Home.vue')
    }, {
      path: '/todolist',
      name: 'todoList',
      meta: {
        showTab: true
      },
      component: () => import('./views/TodoList.vue')
    }
  ]
})
