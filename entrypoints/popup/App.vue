<template>
  <!-- Header with Project Name -->
  <header>
    <h1>Elastic Notes</h1>
  </header>

  <!-- Tabs Menu -->
  <div class="tabs">
    <div class="tab" :class="{ active: currentTab === 'quick-list' }" @click="currentTab = 'quick-list'">Quick List
    </div>
    <div class="tab" :class="{ active: currentTab === 'timers' }" @click="currentTab = 'timers'">Timers</div>
    <div class="tab" :class="{ active: currentTab === 'settings' }" @click="currentTab = 'settings'">Settings</div>
  </div>

  <!-- Content for Each Tab -->
  <div class="tab-content">
    <!-- Quick List Tab -->
    <div v-if="currentTab === 'quick-list'">
      <div v-for="(item, index) in quickList" :key="index" class="list-item">
        {{ item }}
        <div>
          <button class="copy-btn" @click="copyToClipboard(item)">Copy</button>
          <button class="delete-btn" @click="deleteItem(index)">Delete</button>
        </div>
      </div>
      <div class="quick-list-options">
        <button @click="copyAllToClipboard">Copy All to Clipboard</button>
        <button @click="exportToTextFile">Export asss .txt</button>
      </div>
    </div>

    <!-- Timers Tab -->
    <div v-if="currentTab === 'timers'">
      <!-- Timers functionality would be implemented here -->
      <p>Timers functionality (not implemented)</p>
    </div>

    <!-- Settings Tab -->
    <div v-if="currentTab === 'settings'">
      <label>
        <input type="checkbox" v-model="darkMode"> Dark Mode
      </label>
      <label>
        <input type="checkbox" v-model="notificationsEnabled"> Enable Notifications
      </label>
      <!-- Additional settings can be added here -->
    </div>
  </div>
</template>
<script setup>


import { storage } from 'wxt/storage';

onMounted(async () => {
  quickList.value = await storage.getItem('local:quickList');
})



import { onMounted, ref, } from "vue"
let currentTab = ref("quick-list") // Default tab
let quickList = ref([]) // Initial list of items
let darkMode = ref(false) // Settings for dark mode
let notificationsEnabled = ref(true) // Settings for notifications
function copyToClipboard(text) {
  navigator.clipboard.writeText(text)
    .then(() => {
      console.log(`Copied: ${text}`);
      alert(`Copied to clipboard: ${text}`);
    })
    .catch(err => {
      console.error('Failed to copy:', err);
    });
}

function copyAllToClipboard() {
  const allText = this.quickList.join('\n');
  navigator.clipboard.writeText(allText)
    .then(() => {
      console.log('Copied all to clipboard');
      alert('All items copied to clipboard');
    })
    .catch(err => {
      console.error('Failed to copsy:', err);
    });
}

async function deleteItem(index) {
  console.log('Deleting itemd')
  quickList.value = quickList.value.slice(index, 1)
  // quickList.value = []
  // await storage.setItem("quickList", quickList)
}

function exportToTextFile() {
  const blob = new Blob([this.quickList.join('\n')], { type: 'text/plain' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = 'quick-list.txt';
  link.click();
}

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

.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
}

.copy-btn,
.delete-btn {
  padding: 5px 10px;
  cursor: pointer;
  border: none;
}

.copy-btn {
  background-color: #4CAF50;
  color: white;
}

.delete-btn {
  background-color: #f44336;
  color: white;
}

.quick-list-options {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.quick-list-options button {
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}
</style>