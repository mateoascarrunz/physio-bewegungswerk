<template>
     <BaseBox  class="grid-col-2 center"> 
     <span class="title bold blue">Neueste Nachrichten</span>
     <div class="news_container">

        <BaseCard v-for="newsItem in latestNews" :key="newsItem.id">
            <span class="subtitle bold block">{{ truncateDescription(newsItem.title, 5) }}</span>
            <br>
            <span class="info block left description_news">{{ truncateDescription(newsItem.description, 26) }}</span>
            <br>
            <BaseButtonMag class="news_button">mehr</BaseButtonMag>
        </BaseCard>
        <BaseEmptyCard v-if = "latestNews.length < 3"><span class="subtitle block blue">More news</span><span class="subtitle block blue">Coming soon</span></BaseEmptyCard>
     </div>
     <br>
     <br>
     <RouterLink class="nav-link" to="/nachrichten"><BaseButtonMag>Alle Nachrichten sehen</BaseButtonMag></RouterLink>
     </BaseBox>
</template>
<script>
import BaseButtonMag from '../base/BaseButtonMag.vue';
import BaseCard from '../base/BaseCard.vue';
import BaseEmptyCard from '../base/BaseEmptyCard.vue';
export default{
    components:{
    BaseCard,
    BaseButtonMag,
    BaseEmptyCard
},
    data(){
        return{
            news: [
      {
        id: '1',
        title: 'New Zurich Physiotherapy Clinic',
        img: '',
        date: '20.08.2023', // Use a consistent date format (e.g., '20.08.2023')
        description: 'Exciting news! Zurich welcomes a new physiotherapy clinic offering cutting-edge treatments and rehabilitation services.',
      },
      {
        id: '2',
        title: 'Innovative Pain Relief Technique Gaining Popularity',
        img: '',
        date: '22.08.2023',
        description: 'Explore an innovative pain relief technique thats capturing attention in the world of physiotherapy. This technique is making a difference in the lives of many by offering a non-invasive and effective solution for chronic pain management. Learn how it works and its potential benefits, which extend to individuals seeking holistic approaches to pain management.',
      },
      // {
      //   id: '3',
      //   title: 'Physiotherapy Community Unites for Annual Health and Wellness Expo',
      //   img: '',
      //   date: '24.08.2023',
      //   description: 'Join physiotherapy professionals, enthusiasts, and individuals interested in healthcare and wellness at the annual Health and Wellness Expo. This event is a hub for the latest medical advancements, rehabilitation techniques, and wellness insights. Attend informative sessions, connect with experts, and discover strategies to promote a healthier lifestyle and improve your overall health.',
      // },
      // {
      //   id: '4',
      //   title: 'Breakthroughs in Physiotherapy: Advancing Care and Wellness',
      //   img: '',
      //   date: '25.08.2023',
      //   description: 'Stay updated on the latest breakthroughs in the field of physiotherapy, where cutting-edge clinics are redefining care and wellness. From groundbreaking treatments to innovative pain relief techniques, explore how these developments are shaping the future of rehabilitation and improving the lives of individuals worldwide. Join us on a journey through the exciting world of physiotherapy innovations.',
      // },

    ],
        }
    },
    computed: {
  latestNews() {
    return this.news.slice(0, 3);
  },
},

    methods: {
    truncateDescription(description, maxWords) {
      const words = description.split(' ');
      if (words.length > maxWords) {
        return words.slice(0, maxWords).join(' ') + '...';
      }
      return description;
    },
    toggleDescription(newsItem) {
      newsItem.showMore = !newsItem.showMore;
    },
  },
}</script>
<style>
.news_container{
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    justify-content: space-evenly;
    margin-top: 60px;
}
.news_button{
    position: absolute;
    bottom: 25px;
    left: 50%;
    transform: translateX(-50%);
}
.description_news{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 90%;
}
</style>