<script setup>
import NavBar from './components/NavBar.vue'
import Footer from './components/ContactMe.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <NavBar />
  <router-view />
  <Footer v-if="!route.meta.hideFooter" />
</template>

<style scoped></style>
