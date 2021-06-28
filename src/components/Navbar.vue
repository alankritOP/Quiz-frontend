<template>
<nav class="navbar navbar-expand navbar-light bg-light">
    <ul class="nav navbar-nav">
                <li class="nav-item">
                    <router-link class="nav-link" active-class="active" to="/" exact>
                        Home
                    </router-link>
                </li>
            </ul>
    <div class="container styling">        
            <template v-if="isAuthenticated">
        <ul class="nav navbar-nav">
            <li class="nav-item">
                <router-link class="nav-link" :to="links[0]">Welcome to Quiz Page</router-link>
            </li>
            <!-- <li class="nav-item">
                <router-link class="nav-link" :to="links[1]">Meetings</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" :to="links[3]">Teams</router-link>
            </li> -->
        </ul>
        <ul class="nav navbar-nav" v-if="isAuthenticated">
                    <li class="nav-item">
                        <span class="nav-link ">Hello <span class="mail">{{ email}}</span></span>
                    </li>
                    <li class="nav-item">
                        <span class="nav-link cursor-pointer" @click="logout()">Logout</span>
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
            this.$router.push({name:'login'})
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
</style>