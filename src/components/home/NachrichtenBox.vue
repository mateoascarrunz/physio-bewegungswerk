<template>
  <BasePopUp v-if="popup">

    <div class="container margin_top">
      <BaseCloseButton class="closed_button" @click="popup = !popup">
      </BaseCloseButton>
      <div class="row">
        <div class="col-lg-6">
          <img loading="lazy" class="img_card_popup" :src="selectedNews.img.url"
            :alt="selectedNews.img.name">
        </div>
        <div class="col-lg-6 center center_items">

          <span class="title bold blue "> {{ selectedNews.title }}</span>
          <br><br><span class="subtitle blue"> {{ selectedNews.subtitle }}</span>
          <div class="icons margin_top">
            <div><img loading="lazy" class="icon" src="../../assets/images/user_icon.svg" alt=""><span class="paragraph "> by
                {{ selectedNews.author }}</span></div>
            <div><img loading="lazy" class="icon" src="../../assets/images/calendar_icon.svg" alt=""><span class="paragraph ">{{ ' ' +
              formattedDate(selectedNews.date) }}</span></div>
          </div>
        </div>
        <div class="col-lg-12 margin_top">
          <BaseRitchText :markdownText="selectedNews.text"></BaseRitchText>
        </div>
      </div>
    </div>
  </BasePopUp>

  <div class="grid_container padding_null" v-if="latestNews.length ">
    <BaseBox class="grid-col-2 center" v-reveal>
      <span class="title bold blue">News</span>
      <div class="news_container">
        <BaseCard v-for="newsItem in latestNews" :key="newsItem.id" class="cards_news">
          <template v-slot:img_card>
            <img loading="lazy" class="img_card" :src="cardImageUrl(newsItem.img.url)"
              :alt="newsItem.img.name">
          </template>
          <span class="subtitle bold block">{{ truncateDescription(newsItem.title, 5) }}</span>
          <br>
          <span class="info block left description_news">{{ truncateDescription(newsItem.subtitle,
            maxWordsForDescription) }}</span>
          <br>
          <BaseButtonMag @click="openPopup(newsItem)" class="news_button">mehr</BaseButtonMag>
        </BaseCard>
        <BaseEmptyCard v-if="latestNews.length < 3">
          <span class="subtitle block blue">Weitere News</span>
          <span class="subtitle block blue">Coming soon</span>
        </BaseEmptyCard>
      </div>
      <br>
      <br>
      <RouterLink class="nav-link" to="/news">
        <BaseButtonMag>Alle News sehen</BaseButtonMag>
      </RouterLink>
    </BaseBox>
  </div>
</template>

<script>
import { cardImageUrl, news } from '@/services/cms';
import BaseButtonMag from '../base/BaseButtonMag.vue';
import BaseCard from '../base/BaseCard.vue';
import BaseEmptyCard from '../base/BaseEmptyCard.vue';
import BasePopUp from '../base/BasePopUp.vue';
import { defineAsyncComponent } from 'vue';

const BaseRitchText = defineAsyncComponent(() => import('../base/BaseRitchText.vue'));

export default {
  components: {
    BaseCard,
    BaseButtonMag,
    BaseEmptyCard,
    BasePopUp,
    BaseRitchText
  },
  data() {
    return {
      news: [],
      popup: false,
      maxWordsForDescription: 0,
    };
  },
  mounted() {
    this.news = news;
    window.addEventListener('resize', this.updateMaxWordsForDescription);
    this.updateMaxWordsForDescription();
  },
  computed: {
    latestNews() {
      const sortedNews = [...this.news].sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });
      return sortedNews.slice(0, 3);
    },
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
      if (description) {
        const words = description.split(' ');
        if (words.length > maxWords) {
          return words.slice(0, maxWords).join(' ') + '...';
        }
        return description;
      }
      return ''; // Handle the case where description is undefined
    },
    updateMaxWordsForDescription() {
      this.maxWordsForDescription = window.innerWidth < 990 ? 10 : 26;
    },
  },
  beforeUnmount() {
    // Remove the resize event listener when the component is destroyed
    window.removeEventListener('resize', this.updateMaxWordsForDescription);
  },
};
</script>

<style scoped>
.news_container {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: space-evenly;
  margin-top: 60px;
}

.news_button {
  position: absolute;
  bottom: 25px;
  left: 50%;
  transform: translateX(-50%);
}

.description_news {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 90%;
}

.center_box {
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.img {
  width: 500px;
  height: 500px;
  background-color: red;
}

.container_grid_4 {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 20px;
  /* Espacio entre la imagen y el texto */
}

.image {
  max-width: 100%;
  height: auto;
  grid-row: span 2;
}

.img_card {
  height: 100%;
  width: auto;
  opacity: 0.5;
background-color: white;
}

.img_card_popup {
  height: auto;
  width: 100%;
  border-radius: 45px;
  opacity: 0.5;
}

@media (max-width: 990px) {
  .img_card_popup {

    border-radius: 25px;
  }
}
@media (max-width: 778px){

.news_container {
  display: flex;

  flex-direction: column;

align-items: center;
  margin-top: 60px;
}
.cards_news{
  margin-bottom: 20px;
}
}
.text {
  word-wrap: break-word;
  /* Rompe palabras largas en líneas */
}

.icons {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: space-around;
}

.margin_top {
  margin-top: 50px;
}

.center_items {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.closed_button {
  margin-top: -29px;
  position: sticky;
  margin-left: 100%;
}

.icon {
  margin-bottom: 10px;
}


</style>
