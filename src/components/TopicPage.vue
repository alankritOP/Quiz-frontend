<template>
<div>
    <h5 class="about">Check Out Your Skills</h5>
<div class="op">
<div class="card-group" v-for="topic in topics" :key="topic._id" >
  <div class="card mb-4 mr-5" style="width: 18rem;" >
    <div class="card-body">
      <h5 class="card-title">{{topic.name}}</h5>
      <p class="card-text">Total Number of Questions:{{topic.totalQuestion}}</p>
      <p class="card-text"><small class="text-muted">Maximum Marks:{{topic.maxMarks}}</small></p>
      <!-- <img src="https://hrcdn.net/s3_pub/hr-assets/dashboard/C%23.svg" alt="" role="presentation" class="verifiable-skill-card-logo"> -->
    <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
  </div>
</div>
</div>
</div>
</template>

<script>
import Vue from 'vue';
import { getTopics } from "../services/topics"; 
export default {
  data(){
      return{
      topics:[],   
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
    margin-bottom: 20px;
}
.op{
    display: flex;
    flex-flow: wrap;
    flex-wrap: wrap;
    justify-content: space-evenly;
}
.verifiable-skill-card-logo{
    position: absolute;
    right: -10%;
    bottom: 0;
    height: 85%;
    opacity: .1;
    pointer-events: none;
}
</style>