<template>
    <div class="main">
    <form @submit.prevent="marks()">
    <div v-for="(ques,index1) in questions" :key="ques._id">
        <h6>{{index1+1}}-{{ques.question}}</h6>
        <div v-for="(opt,index2) in ques.choices" :key="index2">
            <input 
            type="radio"
            id="html"
            :name="getName(index1)"
            :value="index2"
            v-model="answers[index1]"
            />
            <label for="html">{{opt}}</label><br>
        </div>
    </div>
     <div class="col-md-12 text-center">
            <button type="submit" class="btn btn-primary">Submit</button>
        </div>
    </form>
    </div>
</template>

<script>
import Vue from 'vue';
import { fetchQuizById, showScore } from "../services/questions"
export default {
    name:"QuestionPage",
    data(){
        return {
            questions:[],    
            answers:[],        
        }
    },
    methods:{
        getName(index){
            return "name"+index;
        },
        marks(){
            showScore(this.answers,this.questions)
            .then((data)=>{
                console.log(data);
            })
            .catch((error)=>{
              Vue.$toast.open("Something Went Wrong",{
                  message:error.response.data.message,
                  duration:5000,
                  type:'error'
              })
          })
        }
    },
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
