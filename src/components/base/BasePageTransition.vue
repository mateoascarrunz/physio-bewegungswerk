<template>
    <div class="page_container" v-if="PageTransition" >
        <div class="fade_out_animation">
        <img class="icon_page" src="../../assets/images/physio_icon.svg" alt="">
    </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            PageTransition: true,


        }
    },
    mounted() {
        setTimeout(() => {
            this.PageTransition = false;
        }, 1500);
        setTimeout(() => {
            document.body.classList.remove('popup-open');
        }, 1500);
    },
    beforeMount() {
        document.body.classList.add('popup-open');
    }
};
</script>
<style scoped>
.page_container {
    background-color: rgba(255, 255, 255, 0.305);
    backdrop-filter: blur(40px);
-webkit-backdrop-filter: blur(40px);
    width: 100vw;
    height: 100vh;
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    top: 0px;
    left: 0px;
    z-index: 10;
    animation: fade-out 0.5s forwards ease;
    animation-delay: 1s;
}

.icon_page {
    width: 100px;
    animation: fade-in 0.5s forwards ease;
    opacity: 0;
    filter: blur(50px);
}
.fade_out_animation{
    animation: fade-out 0.5s forwards ease;
    animation-delay: 1s;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.page_text {
    animation: fade-in 0.5s forwards ease;
    opacity: 0;
    filter: blur(50px);
}

@keyframes fade-in {
    to {
        opacity: 1;
        filter: blur(0);
    }
}

@keyframes fade-out {
    to {
        opacity: 0;
        backdrop-filter: blur(0)px;
        -webkit-backdrop-filter: blur(0px);
    }
}</style>