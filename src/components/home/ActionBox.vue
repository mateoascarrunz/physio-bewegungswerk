<template>
    <BaseBox :color="blue" class="grid-col-2 relative">
        <div class="row">
            <div class="col-lg-9">
                <br>
                <span class="megatitle white block bold">Vereinbaren Sie gerne online einen Termin mit uns</span>
                <br>
                <br>
                <BaseButtonBlue> <span class="white mobil-nowhite" @click="goToLink()">Termin Vereinbaren</span>
                </BaseButtonBlue>
                <br>
            </div>
            <div class="col-lg-4">

            </div>
        </div>
        <img class="icon" src="../../assets/images/physio_icon_white.svg" alt="">
    </BaseBox>
</template>
<script>
export default {
    inject: ['blue', 'lightblue'],
    data() {
        return {
            LinkAppointment: 'https://onlinecalendar.medidoc.ch/BookAppointment?cgid=GLLYOUHTXUK45FADLLmoKA&ssid=gUj7CbnQGk.1KiYHwBRBVg',
        }
    },
    methods: {
        goToLink() {
            window.open(this.LinkAppointment, '_blank');
        }
    }
}
</script>
<style scoped>
.col-lg-9 {
    margin-top: 50px;
    margin-left: 100px;
    margin-right: 100px;
    margin-bottom: 50px;
    z-index: 2;
}

.icon {
    position: absolute;
    right: 50px;
    height: 90%;
    bottom: 0px;
    z-index: 1;
    opacity: 0.3;
}

@media(max-width: 990px) {
    .col-lg-9 {
        margin-top: 0px;
        margin-left: 0px;
        margin-right: 0px;
        margin-bottom: 0px;
        z-index: 2;
    }
}</style>