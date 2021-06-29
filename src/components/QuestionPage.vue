<template>
    <div class="main">
    <form @submit.prevent="marks">
    <div v-for="(ques,index) in questions" :key="ques._id" :index="index">
        <h6>{{index+1}}-{{ques.question}}</h6>
        <div v-for="(opt,index) in ques.choices" :key="index">
            <input 
            type="radio"
            id="html"
            name="fav_language"
            value="index"
            />
            <label for="html">{{opt}}</label><br>
        </div>
    </div>
     <div class="col-md-12 text-center">
            <button type="button" class="btn btn-primary">Submit</button>
        </div>
    </form>
    </div>
</template>

<script>
import Vue from 'vue';
import { fetchQuizById } from "../services/questions"
export default {
    name:"QuestionPage",
    data(){
        return {
            form:{
                answer:1
            },
            // count=0,
            questions:[],            
        }
    },
    // methods:{
    //     addCount(){
    //     }

    // },
    created(){
        fetchQuizById(this.$route.params.id)
        .then((data)=>{
            this.questions=data;
        })
         .catch((error)=>{
              Vue.$toast.open({
                  message:error.response.data.message,
                  duration:5000,
                  type:'error'
              })
          })
    }
}
</script>

<style  scoped>

.main{
    margin-top: 10px;
}

</style>>
