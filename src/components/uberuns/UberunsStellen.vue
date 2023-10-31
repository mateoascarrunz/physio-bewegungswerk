<template>
    <BaseBox class="center stelle_container" id="stellen" v-if="jobs.length !== 0">
    <span class="title blue bold title_stelle">Offene Stellen</span>
    <br>
    <br>
    <div class="container"  >
    <BaseStelleBox></BaseStelleBox>
</div>
    
    
    
    </BaseBox>
</template>
<script>
import BaseStelleBox from '../base/BaseStelleBox.vue';
import axios from 'axios';
export default{

    components:{
        BaseStelleBox
    },
    data(){
        return{
jobs:[],
        }
    },
    mounted() {
        axios.get('https://strapi-physio-app.onrender.com/api/jobs')
            .then(response => {
                this.jobs = response.data.data;
            });
    },
}
</script>

<style scoped>
.container{
    margin-top: 20px;
}
</style>