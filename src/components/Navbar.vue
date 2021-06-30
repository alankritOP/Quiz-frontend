<template>
<nav class="navbar navbar-expand navbar-light" style="background-color: #e3f2fd;">
    <ul class="nav navbar-nav">
                <li class="nav-item">
                    <router-link class="nav-link" active-class="active" to="/" exact>
                       <strong>QuizApp Home</strong>
                    </router-link>
                </li>
            </ul>
    <div class="container styling">        
            <template v-if="isAuthenticated">
        <ul class="nav navbar-nav">
            <li class="nav-item">
                <span>
                    <strong>Welcome To Quiz Page</strong>
                </span>
            </li>
        </ul>
        <ul class="nav navbar-nav" v-if="isAuthenticated">
                    <li class="nav-item">
                        <span class="nav-link "><strong>Hello </strong><span class="mail">{{ email}}</span></span>
                    </li>
                    <li class="nav-item">
                        <span class="nav-link cursor-pointer point" @click="logout()"><strong >Logout</strong></span>
                    </li>
                </ul>
        </template>
        
    </div>
</nav>
</template>


<script>
export default {
    name:'Navbar',
    data(){
        return{
            links:[
                {'name':'testPage'},
            ],
        }    
    },
     computed:{
        email() {
                return this.$store.state.auth.email;
            },
            isAuthenticated() {
                return this.$store.getters.isAuthenticated;
            }
    },
    methods:{
        logout(){
            this.$store.dispatch('logout')
            .then( () => this.$router.push( { name: 'login' } ) );
            // this.$router.push({name:'login'})
        }
    },
   
}
</script>
<style scoped>
.styling{
    position:relative;
    right:10px;
}
.mail{
    color:blue;
}
.point{
    cursor: pointer;
}
</style>