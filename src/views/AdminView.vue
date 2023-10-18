<template>
    <div class="center admin_text">
        <span class="title blue bold">Das Admin-Dashboard wird umgeleitet.</span>
        <div class="spinner-border blue" role="status">
  <span class="visually-hidden">Loading...</span>
</div>
    </div>
</template>
<style scoped>
.admin_text{
    width: 100vw;
    height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
}
.spinner-border{
    width: 50px;
height: 50px;
}
</style>
<script>
export default {
  created() {
    if (this.$route.path === '/admin') {
      window.location.href = 'https://data.physio-bewegungswerk.ch/admin/';
    }
  },
};
</script>