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
        <BaseBox class="center grid-col-2">
            <span class="title bold blue">Lernen Sie unser Team kennen</span>
            <br>
            <br>
            <div class="container-fluid">
                <swiper-container :slides-per-view="computedSlidesPerView" speed="500" css-mode="true" autoplay="true"
                    navigation="true" pagination="true">
                    <swiper-slide v-for="team in teams" >
                        <BaseCard :theheight="'25%'" class="block-center" @click="openPopup(team)">
                            <template v-slot:img_card>
<img class="img_card" :src="team.attributes.profilePicture.data.attributes.url" :alt="team.attributes.name">
  </template>
                            <span class="paragraph blue bold">{{ team.attributes.name }}</span>
                            <br>
                            <span class="info magenta">{{ team.attributes.workPosition }}</span>
                            <br>
                        </BaseCard>
                    </swiper-slide>

                </swiper-container>
            </div>
        </BaseBox>

</template>
<script>
import IconDiploma from '../icon/IconDiploma.vue'
import IconLanguages from '../icon/IconLanguages.vue'
import IconLinkedIn from '../icon/IconLinkedIn.vue';
import IconEmail from '../icon/IconEmail.vue';
import IconPhone from '../icon/IconPhone.vue';
import BaseCard from '../base/BaseCard.vue';
import BaseContactBox from '../base/BaseContactBox.vue';
import axios from 'axios';
export default {
    
    components: {
        BaseCard,

        IconLinkedIn,
        IconEmail,
        IconPhone,
        IconDiploma,
        IconLanguages,
        BaseContactBox
    },
    data() {
        return {
            teams: [],
            popup: false,
            selectedTeam: null,
            collapse: false,
            collapse2: false,
            url: null,
            windowWidth: window.innerWidth,

        }
    },
    created() {

    window.addEventListener('resize', this.handleWindowResize);
    this.handleWindowResize();
  },
    mounted() {
        axios.get('https://strapi-physio-app.onrender.com/api/teams?populate=*')
            .then(response => {
                console.log(response.data.data);
        
                this.teams = response.data.data;

            });
    },

beforeDestroy() {
    window.removeEventListener('resize', this.handleWindowResize);
  },
  methods: {
        openPopup(team) {
            this.selectedTeam = team;
            this.popup = true;
        },
        getTeamCoverPhotoUrl(team) {
        // Ensure that team and coverPhoto data exist
        if (team && team.attributes.coverPhoto && team.attributes.coverPhoto.data.attributes.url) {
            // Log the URL for debugging
            console.log('Team Cover Photo URL:', team.attributes.coverPhoto.data.attributes.url);

            // Construct and return the complete image URL
            return team.attributes.coverPhoto.data.attributes.url;
        } else {
            // Handle the case where the data is missing or invalid
            return ''; // Or provide a default image URL
        }
    },
    handleWindowResize() {
      this.windowWidth = window.innerWidth;
    },
    },


    computed: {
        computedSlidesPerView() {
  const totalTeams = this.teams.length;


  if (totalTeams === 1) {
    return 1;
  } else if (totalTeams === 2) {
    if (this.windowWidth < 890) {
      return 1;}
    return 2;
  } else if (totalTeams >= 3) {
    if (this.windowWidth < 890) {
      return 1;
    } else if (this.windowWidth < 1400){
        return 2; 
      } else {
        return 3; 
      }
  } 
  }
},
}
</script>

<style scoped>
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
    position: sticky;
    top: 0px;
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
