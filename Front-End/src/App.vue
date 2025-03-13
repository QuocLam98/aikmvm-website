<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useRoute } from 'vue-router';
import HelloWorld from './components/HelloWorld.vue'
import HomeView from './views/HomeView.vue';

const route = useRoute();
</script>

<template>
  <RouterView />
</template>
