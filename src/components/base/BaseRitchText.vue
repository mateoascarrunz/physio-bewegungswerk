<template>
    <span v-html="renderedHTML"></span>
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
  