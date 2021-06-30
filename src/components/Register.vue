<template>
<div class="container my-4">
        <div class="row">
            <div class="offset-0 offset-md-3 col-12 col-md-6">
                <h1>Register</h1>
                <hr />
                <form name="form" @submit.prevent="register">
                    <div class="form-group">
                        <label for="username">Username</label>
                        <input
                        type="text"
                        class="form-control"
                        name="username"
                        id="username"
                        placeholder="Enter the username"
                        v-model="form.name"
                        @blur="$v.form.name.$touch()"
                            :class="{
                                'is-invalid':errorClass($v.form.name),
                                'is-valid':validClass($v.form.name)
                            }"
                        />
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input
                            type="email"
                            class="form-control"
                            name="email"
                            id="email"
                            placeholder="Enter Your Email"
                            v-model="form.email"
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
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input
                            type="password"
                            autocomplete="off"
                            class="form-control"
                            name="password"
                            id="password"
                            placeholder="Enter Your Password"
                            v-model="form.password"
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
                    <div class="form-group">
                        <button class="btn btn-primary" :disabled="$v.form.$invalid">Register</button>
                    </div>
                     <div class="navigation"> 
                        <span>Already Have an Account?</span>
                        <router-link class="nav-link" :to="links[0]">Login Here</router-link>
                    </div>
                </form>
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
                 console.log(this.form);
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
.navigation{    
    display:flex;
    align-items: center;
}
</style>