<template>
  <BasePopUp v-if="popup">
        <BaseCloseButton @click="popup = !popup">
        </BaseCloseButton>
        <div class="container scroll">

            <div class="row">
                <div class="col-lg-6 relative">
                    <div class="coverphoto_container">
<img class="img_coverphoto" :src="selectedTeam.attributes.profilePicture.data.attributes.url" :alt="selectedTeam.attributes.name">
</div>
</div>
                <div class="col-lg-6 relative">
                    <div class="relative">
                        <!-- hero -->
                        <div class="center">
                            <br>
                            <span class="subtitle">"{{ selectedTeam.attributes.quote }}"</span>
                            <br>
                            <br>
                            <span class="title bold blue">{{ selectedTeam.attributes.name }} </span>
                            <br>
                            <span class="info magenta">{{ selectedTeam.attributes.workPosition }}</span>
                        </div>
                        <!-- description -->
                        <div>
                            <br>
                            <span class="paragraph left">{{ selectedTeam.attributes.description }}</span>

                            <div>
                                
                                <div class="info_team">
                                    
                                <span class="info"><IconDiploma/> {{ selectedTeam.attributes.diploma }}</span>
                                <span class="info"><IconLanguages/> {{ selectedTeam.attributes.languages }}</span>
                            </div>
                                <br>
                                <br>
                                <BaseButtonBlue class="btn center dropdown" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample"
                                    @click="collapse = !collapse">
                                    <span> Aus- und Weiterbildungen:</span>
                                    <span class="icon blue title " v-show="!collapse">+</span>
                                    <span class="icon icon2 blue title" v-show="collapse">-</span>
                                </BaseButtonBlue>
                                <div class="collapse" id="collapseExample">
                                    <div class="card card-body">
                                        <ul>
                                            <!-- Split the educationList by bullet points (•) and render each item as a list item -->
                                            <li v-for="item in selectedTeam.attributes.education.split('•').filter(Boolean)"
                                                :key="item.trim()">
                                                <span class="paragraph">{{ item.trim() }}</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <br>
                                <BaseButtonBlue class="btn center dropdown" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#collapseExample2" aria-expanded="false"
                                    aria-controls="collapseExample2" @click="collapse2 = !collapse2">
                                    <span> Therapeutische Spezialgebiete:</span>
                                    <span class="icon blue title " v-show="!collapse2">+</span>
                                    <span class="icon icon2 blue title" v-show="collapse2">-</span>
                                </BaseButtonBlue>

                                <div class="collapse" id="collapseExample2">
                                    <div class="card card-body">
                                        <ul>
                                            <!-- Split the educationList by bullet points (•) and render each item as a list item -->
                                            <li v-for="item in selectedTeam.attributes.specialties.split('•').filter(Boolean)"
                                                :key="item.trim()">
                                                <span class="paragraph">{{ item.trim() }}</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <br>
                            <br>
                            <br>
                            <br>
                            <br>
                        </div>
                    </div>

                </div>
                <BaseContactBox v-if="selectedTeam.attributes.linkedIn !== null || selectedTeam.attributes.email !== null || selectedTeam.attributes.phone !== null">
              
                    <IconLinkedIn v-if="selectedTeam.attributes.linkedIn !== null" target="_blank" rel="noopener noreferrer" :href="selectedTeam.attributes.linkedIn" />
                    <IconEmail v-if="selectedTeam.attributes.email !== null" target="_blank" rel="noopener noreferrer" :href="selectedTeam.attributes.email" />
                    <IconPhone v-if="selectedTeam.attributes.phone !== null" target="_blank" rel="noopener noreferrer" :href="selectedTeam.attributes.phone" />

            </BaseContactBox>
            </div>
        </div>
    </BasePopUp>
  <div class="hero ">
    <BaseBox class=" box_hero center_mini_mobile" :class="{'center': mobile822}" >
      <div class="img_contaner">
        <img class="img_hero_background" src="../../assets/images/hero_img_physio_background_fadeout_2.png" alt="">
        <div class="marit_hover_container">
          <div class="marit_hover" @mouseover="isMaritHovered = true" @mouseout="isMaritHovered = false">
            <BaseButtonBlue class="hero_team_button" :class="{ 'active': isMaritHovered }"  @click="openPopupById(1)">Marit Hesse</BaseButtonBlue>
          </div>


          <div class="dominik_hover" @mouseover="isDominikHovered = true" @mouseout="isDominikHovered = false">
            <BaseButtonBlue class="hero_team_button" :class="{ 'active': isDominikHovered }" @click="openPopupById(2)">Dominik Geissberger
            </BaseButtonBlue>
          </div>
        </div>

        <img :class="{ 'active': isMaritHovered }" class="img_marit" src="../../assets/images/hero_img_physio_marit.png"
          alt="">

        <img :class="{ 'active': isDominikHovered }" class="img_dominik"
          src="../../assets/images/hero_img_physio_dominik.png" alt="">

      </div>
      <div class="text_hero_container">
        <span class="megatitle blue block z-1 position-relative">Willkommen beim <span class="semibold">Physio Bewegungswerk</span></span>
        <div class="title_box_hero ">
          <span class="ultramegatitle blue bold block z-1 position-relative">Bleib beweglich</span>
          <div class="left text_hero">
            <span class="paragraph  z-1 position-relative hero_text">Gerne stellen wir uns vor…</span>
              <br>
              <RouterLink  to="/uberuns">
            <BaseButtonBlue class=" btn_mehr z-1 position-relative">mehr</BaseButtonBlue>
          </RouterLink>
          </div>

        </div>
      </div>
    </BaseBox>
  </div>
</template>
<script>
import IconDiploma from '../icon/IconDiploma.vue';
import IconLanguages from '../icon/IconLanguages.vue';
import IconLinkedIn from '../icon/IconLinkedIn.vue';
import IconEmail from '../icon/IconEmail.vue';
import IconPhone from '../icon/IconPhone.vue';
import BaseContactBox from '../base/BaseContactBox.vue';
import axios from 'axios';
export default {
      
  components: {
        IconLinkedIn,
        IconEmail,
        IconPhone,
        IconDiploma,
        IconLanguages,
        BaseContactBox
    },
  data() {
    return {
      isMaritHovered: false,
      isDominikHovered: false,
      mobile822:false,
            teams: [],
            popup: false,
            selectedTeam: null,
            collapse: false,
            collapse2: false,
            url: null,
    };
  },
  mounted() {
        axios.get('https://strapi-physio-app.onrender.com/api/teams?populate=*')
            .then(response => {
                console.log(response.data.data);
        
                this.teams = response.data.data;

            });
    },
  created() {
    // Add an event listener to monitor window resize
    window.addEventListener('resize', this.handleWindowResize);
    
    // Call the handler initially to set the initial value
    this.handleWindowResize();
  },
  methods: {
    handleWindowResize() {
      // Get the current viewport width
      const viewportWidth = window.innerWidth;
      
      // Check if the viewport width is less than or equal to 822px
      if (viewportWidth <= 990) {
        // Update the mobile822 data property to false
        this.mobile822 = false;
      } else {
        // Update the mobile822 data property to true
        this.mobile822 = true;
      }
    },
    openPopupById(teamId) {
  const team = this.teams.find((t) => t.id === teamId);
  if (team) {
    this.selectedTeam = team;
    this.popup = true;
  }
}
  },
  beforeDestroy() {
    // Remove the event listener when the component is destroyed
    window.removeEventListener('resize', this.handleWindowResize);
  },

};
</script>


<style scoped>
.hero {
  width: 100%;
  top: -80px;
  height: 100vh;
  max-height: 1100px;
  position: relative;

}


.box_hero {
  padding-top: 140px;
  position: relative;
  overflow: hidden;
}

.text_hero {
  width: 40%;
}

.title_box_hero {
  display: inline-block;
}

.img_hero_background {
  width: 110vw;
  position: absolute;
  bottom: -130px;
  right: -100px;
  opacity: 0.8;
  z-index: 0;
}

.img_marit,
.img_dominik {
  width: 110vw;
  position: absolute;
bottom: -130px;
  right: -100px;
opacity: 0.3;   /* estaba en 3 */

  transition: opacity 0.3s ease-in-out;
  z-index: 0;
}

.marit_hover_container {
  width: inherit;
  height: inherit;
  position: relative;
}

.marit_hover {
  background-color: transparent;
  width: 15%;
  aspect-ratio: 1/1.8;
  position: absolute;
  right: 38%;
  bottom: 100px;
display: flex;
flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
  z-index: 2;

  transition: opacity 0.3s ease-in-out;

}

.dominik_hover_container {
  width: inherit;
  height: inherit;
  position: relative;
}

.dominik_hover {
  width: 21%;
aspect-ratio: 1/1.5;
  position: absolute;

  right: 5%;
  bottom: 100px;
  z-index: 2;
  display: flex;
  flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
  transition: opacity 0.3s ease-in-out;


}

.hero_team_button {
  margin-top: 100px;
  width: fit-content;
  height: fit-content;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  z-index: 2;
  color: white !important; ;
}

.active {
  opacity: 1 !important;
  transition: opacity 0.3s ease-in-out;
}

.img_contaner {
  position: absolute;
  width: 100vw;
  height: 100vh;
  right: -100px;
  bottom: -100px;
}
.btn_mehr{
  margin-top: 50px;


}
.text_hero{
  position: relative;
}
.hero_text{
  margin-left: 10px;
}
@media (max-width:1400px){

.img_hero_background {

  bottom: 0px;
  right: -50px;

}
.img_marit,
.img_dominik {

bottom: 0px;
right: -50px;

}
.img_contaner {

  bottom: 0px;
  right: -50px;
}


.marit_hover {
  width: 15%;
  aspect-ratio: 1/2.4;
  right: 38%;
  bottom: 100px;
}
.dominik_hover {
  width: 21%;
aspect-ratio: 1/2.25;
  right: 6%;
  bottom: 0px;
}
}
@media (max-width:1154px){
  .btn_mehr{
  margin-top: 20px;


}
.img_hero_background {

bottom: 0px;
right: 0px;


}
.img_marit,
.img_dominik {

bottom: 0px;
right: 0px;

}
.img_contaner {

bottom: 0px;
right: 0px;
}
.dominik_hover {

aspect-ratio: 1/2.55;
right: 10%;

}
.marit_hover {

  aspect-ratio: 1/2.7;
  right: 42%;

}
}
@media (max-width: 990px) {
  .hero_text{
  margin-left: 0px;
}
  .text_hero{
    margin-top: 10px;
  }
  .btn_mehr{
  margin-top: 10px;


}
  .img_hero_background {
width: auto;
height: 100%;
bottom: -50px;
right: -10vw;


}
  .img_marit,
.img_dominik {
  width: auto;
  height: 100%;
  right: -10vw;
bottom: -50px;
opacity: 1; 

}
.img_contaner {
  width: auto;
  height: 100%;
bottom: -50px;
right: -10vw;

}
.hero_team_button {

display: none;

}
.ultramegatitle{
  width: 100%;
  font-size:65px;
}
}
@media (max-width: 699px){
  /* .hero{
    max-height: 800px;
  } */
  .text_hero{
width: 100%;
  }
  .ultramegatitle{

  font-size:8.9vw;
}
.megatitle{
  font-size:5vw;
}
.img_hero_background {

height: 110vw;

right: 5%;


}
  .img_marit,
.img_dominik {

  height: 110vw;
  right: 5%;


}
.img_contaner {
  width: auto;
  height: 110vw;

right: 5;

}
.center_mini_mobile{
  text-align: center !important;
}
}
@media (max-width: 500px){
  .hero{
  height: 94vh;
  }
  .img_contaner {

    bottom: 50px;


}
  
}
/* @media (max-width: 500px){
  .hero {

  max-height: 600px;


} 
}*/
@media (max-height: 950px) and (min-width: 990px) {
  .img_contaner {

    bottom: -200px;
  }
}

@media (max-height: 770px) and (min-width: 990px) {
  .img_contaner {

    bottom: -300px;
  }


}






.box {
    height: 100px !important;
}

.block-center {
    display: block;
    margin-left: auto;
    margin-right: auto;
    cursor: pointer;
}

.dropdown {
    display: block;
    width: 100%;
    position: relative;
}

.icon {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
}

.icon2 {
    top: 40%;
}

.card {
    background-color: transparent;
    border-color: transparent;
    padding-left: 0px;
    padding-right: 0px;
}

.contact {
    position: absolute;
    border-radius: 50px;
    background: rgba(63, 99, 167, 0.20);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    width: 50%;
    height: 93px;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-evenly;
    align-items: center;

}

.scroll {
    overflow-y: scroll;
    height: 100% !important;
}
.info_team{
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    margin-top: 20px;
}
.coverphoto_container{
    width: 100%;
    aspect-ratio: 1/1.22;
    overflow: hidden;
    border-radius: 40px;
}
.img_coverphoto{
    width: 100%;
    overflow: hidden;
}
@media (max-width: 990px){
    .coverphoto_container{
    width: 50vw;
        display: block;
        margin-left: auto;
        margin-right: auto;
}
.contact{
    width: 80%;
}
}
</style>