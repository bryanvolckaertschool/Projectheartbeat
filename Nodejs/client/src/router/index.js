import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'
//import Dashboard from '../views/Dashboard.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Dashboard',
    name: 'Dashboard',
    //component: Dashboard
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    component: () => import(/* webpackChunkName: "Dashboard" */ '../views/Dashboard.vue'),
    meta: {requireAuth : true,requiredlevel : 0}
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if(to.meta.requireAuth){
    //Need to login
    //console.log(store.token + store.level + to.meta.requiredlevel)
    if(!(store.level >= to.meta.requiredlevel)){
      if(!store.token){
        next();
      }
      else{
        next();  
      }
    }
    else{
      next();
      return("Something went wrong please refresh or contact tech support.");
    }
    
  }
  else{
    next();
  }
});

export default router
