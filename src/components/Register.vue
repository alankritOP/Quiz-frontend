<template>
<div class="grad">
<div class="container-fluid px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto ">
    <div class="card card0 border-0">
        <div class="row d-flex">
            <div class="col-lg-6">
                <div class="card1 pb-5">
                    <div class="row px-3 justify-content-center mt-4 mb-5 border-line"> <img src="https://i.imgur.com/uNGdWHi.png" class="image"> </div>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="card2 card border-0 px-4 py-5">
                    <form name="form" @submit.prevent="register">
                     <div class="row px-3"> <label class="mb-1">
                            <h6 class="mb-0 text-sm">Username</h6>
                        </label> <input class="mb-4" type="text" name="username" placeholder="Please Enter the username"  v-model="form.name"/>   
                        </div>
                    <div class="row px-3"> <label class="mb-1">
                            <h6 class="mb-0 text-sm">Email Address</h6>
                        </label> <input class="mb-4" type="text" name="email" placeholder="Enter a valid email address"       
                          @blur="$v.form.email.$touch()"
                            :class="{
                                'is-invalid':errorClass($v.form.email),
                                'is-valid':validClass($v.form.email)
                            }"
                         />                         
                        <div v-if="$v.form.email.$error">
                            <div v-if="!$v.form.email.required" class="error-message">
                                <small>Required an email field</small>
                            </div>
                            <div v-if="!$v.form.email.email" class="error-message">
                                <small>Invalid Email</small>
                            </div>
                        </div>
                        </div>
                    <div class="row px-3"> <label class="mb-1">
                            <h6 class="mb-0 text-sm">Password</h6>
                        </label> <input type="password" name="password" placeholder="Enter password"
                        @blur="$v.form.password.$touch()"
                            :class="{
                                'is-invalid':errorClass($v.form.password),
                                'is-valid':validClass($v.form.password)
                            }"
                        /> 
                        <div v-if="$v.form.email.$error">
                            <div v-if="!$v.form.password.required" class="error-message">
                                <small>Password is required</small>
                            </div>
                            <div v-if="!$v.form.password.minLength" class="error-message">
                                <small>It should have at least 8 characters</small>
                            </div>
                             <div v-if="!$v.form.password.containsUppercase" class="error-message">
                                <small>The password must have at least 1 uppercase character</small>
                            </div>
                             <div v-if="!$v.form.password.containsLowercase" class="error-message">
                                <small>The password must have at least 1 lowercase character</small>
                            </div>
                             <div v-if="!$v.form.password.containsNumber" class="error-message">
                                <small>The password must have at least 1 digit</small>
                            </div>
                            <div v-if="!$v.form.password.containsSpecial" class="error-message">
                                <small>The password must have at least 1 special character</small>
                            </div>
                        </div>
                        </div>
                    <div class="row px-3 mb-4">
                        <div class="custom-control custom-checkbox custom-control-inline"> <input id="chk1" type="checkbox" name="chk" class="custom-control-input"> <label for="chk1" class="custom-control-label text-sm">Remember me</label> </div> <a href="#" class="ml-auto mb-0 text-sm">Forgot Password?</a>
                    </div>
                    <div class="row mb-3 px-3"> <button type="submit" class="btn btn-blue text-center">Register</button> </div>
                    <div class="row mb-4 px-3"> <small class="font-weight-bold">Already have an Account <router-link class="nav-link" :to="links[0]">Login Here </router-link> </small> </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
</template>


<script>
import Vue from 'vue';
 import {register} from "../services/auth"
 import { email, required, minLength } from 'vuelidate/lib/validators'
export default {
    name:"RegisterPage",
    data(){
        return {
            links:[
                {
                    "name":"login"
                }

            ],
            form:{
            name:"",
            email:"",
            password:"",
        },
        }
    },
     validations:{
        form:{
            name:{
                required,
                minLength:minLength(2),
            },
            email:{
                email,required
            },
            password:{
                required,
                minLength:minLength(8),
                containsUpperCase:function(value){
                    return /[A-Z]/.test(value)
                },
                containsLowercase: function(value) {
                        return /[a-z]/.test(value)
                    },
                containsNumber: function(value) {
                        return /[0-9]/.test(value)
                    },
                 containsSpecial: function(value) {
                        return /[#?!@$%^&*-]/.test(value)
                    }
            }
        }
    },
    methods:{
        errorClass(field){
            return field.$error;

        },
        validClass(field){
            return !field.$invalid && field.$model && field.$dirty;
        },
        register(){
            this.$v.form.$touch();
            if(!this.$v.form.$invalid){
                register(this.form)
                .then(()=>{this.$router.push({name:"login"})
                 Vue.$toast.success("SuccessFully Registered",{
                    position:'top-right'
                })
                
                })
                .catch((error)=>{
                    Vue.$toast.open({
                        message:error.response.data.message,
                        duration:5000,
                        type:"error"
                    });
                });
            }
            else{
                console.log("Invalid Input Values");
            }

        }
    }
}
</script>
<style scoped>
body {
    color: #000;
    overflow-x: hidden;
    height: 100%;
    background-color: #B0BEC5;
    background-repeat: no-repeat
}

.grad {
     margin-top: 50px;
}

.card0 {
    box-shadow: 0px 4px 8px 0px #757575;
    border-radius: 0px
}

.card2 {
    margin: 0px 40px
}

.logo {
    width: 200px;
    height: 100px;
    margin-top: 20px;
    margin-left: 35px
}

.image {
    width: 360px;
    height: 280px
}

.border-line {
    border-right: 1px solid #EEEEEE
}

.line {
    height: 1px;
    width: 45%;
    background-color: #E0E0E0;
    margin-top: 10px
}

.or {
    width: 10%;
    font-weight: bold
}

.text-sm {
    font-size: 14px !important
}

::placeholder {
    color: #BDBDBD;
    opacity: 1;
    font-weight: 300
}

:-ms-input-placeholder {
    color: #BDBDBD;
    font-weight: 300
}

::-ms-input-placeholder {
    color: #BDBDBD;
    font-weight: 300
}

input,
textarea {
    padding: 10px 12px 10px 12px;
    border: 1px solid lightgrey;
    border-radius: 2px;
    margin-bottom: 5px;
    margin-top: 2px;
    width: 100%;
    box-sizing: border-box;
    color: #2C3E50;
    font-size: 14px;
    letter-spacing: 1px
}

input:focus,
textarea:focus {
    -moz-box-shadow: none !important;
    -webkit-box-shadow: none !important;
    box-shadow: none !important;
    border: 1px solid #304FFE;
    outline-width: 0
}

button:focus {
    -moz-box-shadow: none !important;
    -webkit-box-shadow: none !important;
    box-shadow: none !important;
    outline-width: 0
}

a {
    color: inherit;
    cursor: pointer
}

.btn-blue {
    background-color: #1A237E;
    width: 150px;
    color: #fff;
    border-radius: 2px
}

.btn-blue:hover {
    background-color: #000;
    cursor: pointer
}

.bg-blue {
    color: #fff;
    background-color: #1A237E
}

@media screen and (max-width: 991px) {
    .logo {
        margin-left: 0px
    }

    .image {
        width: 300px;
        height: 220px
    }

    .border-line {
        border-right: none
    }

    .card2 {
        border-top: 1px solid #EEEEEE !important;
        margin: 0px 15px
    }
}
</style>