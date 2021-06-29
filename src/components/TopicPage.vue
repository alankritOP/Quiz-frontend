<template>
<div class="main">
    <h5 class="about">Check Out Your Skills</h5>
<div class="op">
<div class="card-group" v-for="topic in topics" :key="topic._id" >
  <div class="card mb-4 mr-5" style="width: 18rem;" >
    <div class="card-body">
      <h5 class="card-title">{{topic.name}}</h5>
      <p class="card-text">Total Number of Questions:{{topic.totalQuestions}}</p>
      <p class="card-text"><small class="text-muted">Maximum Marks:{{topic.maxMarks}}</small></p>
    <button class="btn btn-primary" @click="goToQuestions(topic._id)">Start The Quiz</button>
    </div>
  </div>
</div>
</div>
</div>
</template>

<script>
import Vue from 'vue';
import { getTopics} from "../services/topics"; 
export default {
  data(){
      return{
      id:1,
      topics:[],   
      }
  },
  methods:{
      goToQuestions(topicid){
          this.$router.push({name:'QuestionPage',params:{id:topicid}}); 
      }
  },
  created(){
          getTopics()
          .then((data)=>{
              this.topics=data;
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

<style scoped>
.about{
    position:relative;
    left:30px;
    margin-bottom: 20px;
}
.op{
    display: flex;
    flex-flow: wrap;
    flex-wrap: wrap;
    justify-content: space-evenly;
}
.main{
    margin-top: 10px;
}
</style>