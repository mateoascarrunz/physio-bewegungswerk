
<template>
  <BasePopUp v-if="popup">
    
<div class="container margin_top">
  <BaseCloseButton class="closed_button" @click="popup = !popup">
        </BaseCloseButton>
<div class="row">
<div class="col-lg-6">
  <img class="img_card_popup" :src="selectedNews.attributes.img.data.attributes.url" :alt="selectedNews.attributes.img.data.attributes.name">
</div>
<div class="col-lg-6 center center_items">

  <span class="title bold blue title_news_popup"> {{ selectedNews.attributes.title }}</span>
  <div class="left_mobile">
  <br><br><span class="subtitle blue"> {{ selectedNews.attributes.subtitle }}</span>
</div>
  <div class="icons margin_top">
    <div><img class="icon" src="../../assets/images/user_icon.svg" alt=""><span class="paragraph paragraph_mobile "> by {{selectedNews.attributes.author}}</span></div>
    <div><img class="icon" src="../../assets/images/calendar_icon.svg" alt=""><span class="paragraph paragraph_mobile">{{' ' + formattedDate(selectedNews.attributes.date)}}</span></div>
  </div>
</div>
<div class="col-lg-12 margin_top">
 <BaseRitchText :markdownText="selectedNews.attributes.text"></BaseRitchText> 
</div>
</div>
</div>
</BasePopUp>



<div class="grid_container">
 <div class="grid-col-2">
<div class="grid_container_3">

<BaseCard  :theheight="'50%'" v-for="newsItem in news" :key="newsItem.id" class="center_box center">
  <template v-slot:img_card>
<img class="img_card" :src="newsItem.attributes.img.data.attributes.url" :alt="newsItem.attributes.img.data.attributes.name">
  </template>
            <span class="subtitle bold block">{{ truncateDescription(newsItem.attributes.title, 5) }}</span>
            <br>
            <span class="info block left description_news">{{ truncateDescription(newsItem.attributes.subtitle, maxWordsForDescription) }}</span>
            <br>
            <BaseButtonMag @click="openPopup(newsItem)" class="news_button">mehr</BaseButtonMag>
        </BaseCard>
        <BaseEmptyCard v-if="news.length < 3" class="center_box"><span class="subtitle block blue">More news</span><span class="subtitle block blue">Coming soon</span></BaseEmptyCard>

</div>
</div>
</div>

</template>

<script>
import BaseEmptyCard from '../base/BaseEmptyCard.vue';
import BaseCard from '../base/BaseCard.vue';
import img1 from '../../assets/images/img_news_1.jpeg';
import BasePopUp from '../base/BasePopUp.vue';
import axios from 'axios';
import BaseRitchText from '../base/BaseRitchText.vue';

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
    axios.get('https://strapi-physio-app.onrender.com/api/news-items?populate=*').then((response) => {
      console.log(response.data.data);
      this.news = response.data.data;
    });

    // Add a resize event listener to update maxWordsForDescription on window resize
    window.addEventListener('resize', this.updateMaxWordsForDescription);
    // Initialize maxWordsForDescription based on the initial viewport width
    this.updateMaxWordsForDescription();
  },
  methods: {
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
  beforeDestroy() {
    // Remove the resize event listener when the component is destroyed
    window.removeEventListener('resize', this.updateMaxWordsForDescription);
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