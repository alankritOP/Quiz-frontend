import Router from "vue-router";
import Navbar from "@/components/Navbar";
import LoginPage from "@/components/Login";
import RegisterPage from "@/components/Register"
import TopicPage from "@/components/TopicPage";

import store from '@/store';

const meta = {
    authorize: [ ]
};

const router = new Router({
    mode:'history',
    routes:[
        {
            name:'Navbar',
            path: "/navbar",
            component:Navbar
        },
       {
           name: "login",
           path: "/",
           component: LoginPage

       },
       {
           name: "register",
           path: "/register",
           component: RegisterPage
       },
       {
           name:"topic-page",
           path:"/topicPage",
           component:TopicPage,
           meta
       }
    ]
})
router.beforeEach(( to, from, next ) => {
  if( to.meta.authorize && !store.getters.isAuthenticated ) {
      next({
          name: 'login'
      });
  } else {
      next();
  }
});
export default router;