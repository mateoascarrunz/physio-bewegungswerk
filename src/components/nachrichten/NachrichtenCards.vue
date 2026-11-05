
<template>
  <BasePopUp v-if="popup">
    
<div class="container margin_top">
  <BaseCloseButton class="closed_button" @click="popup = !popup">
        </BaseCloseButton>
<div class="row">
<div class="col-lg-6">
  <img loading="lazy" class="img_card_popup" :src="selectedNews.img.url" :alt="selectedNews.img.name">
</div>
<div class="col-lg-6 center center_items">

  <span class="title bold blue title_news_popup"> {{ selectedNews.title }}</span>
  <div class="left_mobile">
  <br><br><span class="subtitle blue"> {{ selectedNews.subtitle }}</span>
</div>
  <div class="icons margin_top">
    <div><img loading="lazy" class="icon" src="../../assets/images/user_icon.svg" alt=""><span class="paragraph paragraph_mobile "> by {{selectedNews.author}}</span></div>
    <div><img loading="lazy" class="icon" src="../../assets/images/calendar_icon.svg" alt=""><span class="paragraph paragraph_mobile">{{' ' + formattedDate(selectedNews.date)}}</span></div>
  </div>
</div>
<div class="col-lg-12 margin_top">
 <BaseRitchText :markdownText="selectedNews.text"></BaseRitchText> 
</div>
</div>
</div>
</BasePopUp>



<div class="grid_container">
 <div class="grid-col-2">
<div class="grid_container_3">

<BaseCard  :theheight="'50%'" v-for="newsItem in latestNews" :key="newsItem.id" class="center_box center">
  <template v-slot:img_card>
<img loading="lazy" class="img_card" :src="cardImageUrl(newsItem.img.url)" :alt="newsItem.img.name">
  </template>
            <span class="subtitle bold block">{{ truncateDescription(newsItem.title, 5) }}</span>
            <br>
            <span class="info block left description_news">{{ truncateDescription(newsItem.subtitle, maxWordsForDescription) }}</span>
            <br>
            <BaseButtonMag @click="openPopup(newsItem)" class="news_button">mehr</BaseButtonMag>
        </BaseCard>
        <BaseEmptyCard v-if="news.length < 3" class="center_box"><span class="subtitle block blue">Weitere News</span><span class="subtitle block blue">Coming soon</span></BaseEmptyCard>

</div>
</div>
</div>

</template>

<script>
import BaseEmptyCard from '../base/BaseEmptyCard.vue';
import BaseCard from '../base/BaseCard.vue';
import BasePopUp from '../base/BasePopUp.vue';
import { cardImageUrl, news } from '@/services/cms';
import { defineAsyncComponent } from 'vue';

const BaseRitchText = defineAsyncComponent(() => import('../base/BaseRitchText.vue'));

export default {
  components: {
    BaseCard,
    BaseEmptyCard,
    BasePopUp,
    BaseRitchText,
  },
  data() {
    return {
      news: [],
      selectedNews: [],
      popup: false,
      maxWordsForDescription: 0, // Initialize maxWordsForDescription
    };
  },
  mounted() {
    this.news = news;

    // Add a resize event listener to update maxWordsForDescription on window resize
    window.addEventListener('resize', this.updateMaxWordsForDescription);
    // Initialize maxWordsForDescription based on the initial viewport width
    this.updateMaxWordsForDescription();
  },
  methods: {
    cardImageUrl,
    openPopup(newsItem) {
      this.selectedNews = newsItem;
      this.popup = true;
    },
    formattedDate(selectedDate) {
      const dateParts = selectedDate.split('-');
      if (dateParts.length === 3) {
        const [year, month, day] = dateParts;
        return `${day}-${month}-${year}`;
      }
      return selectedDate;
    },
    truncateDescription(description, maxWords) {
      const words = description.split(' ');
      if (words.length > maxWords) {
        return words.slice(0, maxWords).join(' ') + '...';
      }
      return description;
    },
    updateMaxWordsForDescription() {
      this.maxWordsForDescription = window.innerWidth < 990 ? 10 : 26;
    },
  },
  beforeUnmount() {
    // Remove the resize event listener when the component is destroyed
    window.removeEventListener('resize', this.updateMaxWordsForDescription);
  },
  computed: {
    latestNews() {
      const sortedNews = [...this.news].sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });
      return sortedNews;
    },
  },
};
</script>

<style scoped>
.center_box{
display: block;
margin-left: auto;
margin-right: auto;
}

.img{
  width: 500px;
  height: 500px;
  background-color: red;
}
.container_grid_4 {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 20px; /* Espacio entre la imagen y el texto */
}

.image {
  max-width: 100%; 
  height: auto; 
  grid-row: span 2; 
}
.img_card{
  height: 100%;
  width: auto;
  opacity: 0.5;
  background-color: white;
}
.img_card_popup{
  height: auto;
  width: 100%;
  border-radius: 45px;
  opacity: 0.5;
}

.news_button{
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 20px;
}
.description_news{
  width: 90%;
  top: 50%;
  transform: translateY(-50%);
  position: absolute;

}
.text {
  word-wrap: break-word; /* Rompe palabras largas en líneas */
}
.icons{
  display: flex;
  flex-wrap: nowrap;
    flex-direction: row;
    justify-content: space-around;
}
.margin_top{
  margin-top: 50px;
}
.center_items{
  display: flex;
    flex-direction: column;
    justify-content: center;
}
.closed_button{
  margin-top: -29px;
    position: sticky;
    margin-left: 100%;
}
.icon{
  margin-bottom: 10px;
}
@media (max-width: 990px){
  .img_card_popup{

  border-radius: 25px;
}
.icons{
  align-items: flex-start;
  flex-direction: column;
}
.paragraph_mobile{
font-size: 14px;
}
.title_news_popup{
  margin-top: 20px;
}
.left_mobile{
  text-align: left;
}
}
</style>