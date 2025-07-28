<template>
    <span v-html="renderedHTML" class="news_container"></span>
  </template>
  
  <script>
  import MarkdownIt from 'markdown-it';
  
  export default {
    props: {
      markdownText: String,
    },
    data() {
      return {
        renderedHTML: '', 
      };
    },
    mounted() {
      const md = new MarkdownIt();
      this.renderedHTML = md.render(this.markdownText);
    },
  };
  </script>

  <style>

.new_container img{
  margin-top: 50px;
  width: 100%;
margin-bottom: 20px;
border-radius: 20px;
}</style>
  