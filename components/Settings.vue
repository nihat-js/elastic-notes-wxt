<template>
  <label>
    <input type="checkbox" :modelValue="darkMode"> Dark Mode
  </label>
  <label>
    <input type="checkbox" :modelValue="notificationsEnabled"> Enable Notifications
  </label>
</template>
<script setup>
import { ref } from 'vue';
const { darkMode } = defineProps({
  darkMode: Boolean,
  notificationsEnabled: Boolean
})
</script>