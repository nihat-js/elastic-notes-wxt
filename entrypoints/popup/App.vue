<template>
  <header>
    <h2>Elastic Notes</h2>
  </header>

  <div class="tabs">
    <div class="tab" :class="{ active: currentTab === 'quick-list' }" @click="currentTab = 'quick-list'">Quick List
    </div>
    <div class="tab" :class="{ active: currentTab === 'timers' }" @click="currentTab = 'timers'">Timers</div>
    <div class="tab" :class="{ active: currentTab === 'settings' }" @click="currentTab = 'settings'">Settings</div>
  </div>

  <!-- Content for Each Tab -->
  <div class="tab-content">
    <div v-if="currentTab === 'quick-list'">
      <QuickList />
    </div>
    <div v-if="currentTab === 'timers'">
      <Timers />
    </div>
    <div v-if="currentTab === 'settings'">
      <Settings darkMode="darkMode" notificationsEnabled="notificationsEnabled" />
    </div>
  </div>

</template>
<script setup>







import { onMounted, ref, } from "vue"
import Settings from '@/components/Settings.vue';
import QuickList from '@/components/QuickList.vue';
import Timers from '@/components/Timers.vue';
let currentTab = ref("quick-list") // Default tab
let darkMode = ref(false) // Settings for dark mode
let notificationsEnabled = ref(true) // Settings for notifications





</script>
<style scoped>
/* Styling for the Application */
header {
  text-align: center;
  background-color: #f5f5f5;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

.tabs {
  display: flex;
  justify-content: space-around;
  background-color: #f0f0f0;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

.tab {
  padding: 10px;
  cursor: pointer;
}

.tab.active {
  font-weight: bold;
  border-bottom: 2px solid #007bff;
}

.tab-content {
  padding: 20px;
}
</style>