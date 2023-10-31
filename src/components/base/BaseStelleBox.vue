<template>
   <div class="stelle_container" v-for="job in jobs">
    <span class="paragraph paragraph_absolute">{{job.attributes.name}}</span>
    <div class="links">
        
        <a :href="job.attributes.linkedInLink" target="_blank" rel="noopener noreferrer"><BaseButtonBlue class="btn">LinkedIn</BaseButtonBlue></a>
        <a :href="job.attributes.pdfLink" target="_blank" rel="noopener noreferrer"><BaseButtonMag class="btn">Mehr</BaseButtonMag></a>
    </div>
   </div>
   
   <!-- <div v-if="jobs.length === 0 || jobs === null" class="stelle_container  blank_stelle">
    <span class="paragraph  blue">Stelle in Kürze</span>

   </div> -->
</template>

<script>
import axios from 'axios';
export default{
    data(){
        return{
jobs:[],
        }
    },
    mounted() {
        axios.get('https://strapi-physio-app.onrender.com/api/jobs')
            .then(response => {
                console.log(response.data.data);
                this.jobs = response.data.data;
            });
    },
}</script>





<style scoped>
.stelle_container{
    border-radius: 40px;
border: 2px solid #004FF1;
width: 100%;
height: 60px;
display: flex;
padding-left: 50px;
flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;
}
.blank_stelle{
    justify-content: center;
    border: 1px dashed #004FF1;
    padding-left: 0px !important;
}
.btn{
    margin-left: 10px;
    margin-right: 10px;
} 
@media (max-width:650px){
    .stelle_container{
        padding-left: 0px;
display: flex;
flex-direction: column;
    flex-wrap: nowrap;

justify-content: space-around;
}
.paragraph_absolute{
    font-weight: 600;
    position: absolute;
    margin-bottom: 80px;
    font-size: 16px;
}
}
</style>