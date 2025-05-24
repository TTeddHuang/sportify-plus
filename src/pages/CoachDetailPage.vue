<template>
  {{ coach }}
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'

const coach = ref()

onMounted(async () => {
  const { data } = await axios.get(
    'https://sportify-backend-1wt9.onrender.com/api/v1/courses/coaches/2bca7644-3899-4e06-89a4-c35f737284d0'
  )
  coach.value = data
})
</script>
