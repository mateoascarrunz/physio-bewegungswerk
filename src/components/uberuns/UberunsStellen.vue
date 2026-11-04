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
import { fetchJobs } from '@/services/cms';
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
        fetchJobs().then((jobs) => {
      this.jobs = jobs;
    });
    },
}
</script>

<style scoped>
.container{
    margin-top: 20px;
}
</style>