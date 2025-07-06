<script setup>
import NavBar from './components/NavBar.vue'
import Footer from './components/ContactMe.vue'
import ChatWidget from './components/ChatWidget.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <NavBar />
  <router-view :key="$route.fullPath" />
  <Footer v-if="!route.meta.hideFooter" />
  <ChatWidget />
</template>

<style scoped></style>
