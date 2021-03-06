import Router from "vue-router";
import LoginPage from "@/components/Login";
import RegisterPage from "@/components/Register"
import TopicPage from "@/components/TopicPage";
import QuestionPage from '@/components/QuestionPage';
import PageNotFound from '@/components/PageNotFound';

import store from '@/store';

const meta = {
    authorize: [ ]
};

const router = new Router({
    mode:'history',
    routes:[
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
       },
       {
           name:"QuestionPage",
           path:"/questions/:id",
           component:QuestionPage,
           meta
       },
       {
        name: 'page-not-found',
        path: '*',
        component: PageNotFound
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