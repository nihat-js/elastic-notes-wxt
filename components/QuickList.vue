<template>
  <div class="quick-list-options">
    <button @click="copyAllToClipboard">Copy All</button>
    <button @click="exportToTextFile">Export as .txt</button>
  </div>
  <div v-for="(item, index) in quickList" :key="index" class="list-item">
    <span class="element"> {{ item.substring(0, 20) }} {{ item.length > 20 || "..." }} </span>
    <div class="actions">
      <button class="copy-button" @click="copyToClipboard(item)">Copy</button>
      <button class="delete-button" @click="deleteItem(index)">Delete</button>
    </div>
  </div>

</template>

<script setup>
import { ref, onMounted } from 'vue'
import { storage } from 'wxt/storage';

onMounted(async () => {
  quickList.value = await storage.getItem('local:quickList');
})
let quickList = ref([]) // Initial list of items
function copyToClipboard(text) {
  navigator.clipboard.writeText(text)
    .then(() => {
      console.log(`Copied: ${text}`);
      // alert(`Copied to clipboard: ${text}`);
    })
    .catch(err => {
      console.error('Failed to copy:', err);
    });
}
function copyAllToClipboard() {
  const allText = quickList.value.join('\n');
  navigator.clipboard.writeText(allText)
    .then(() => {
      // console.log('Copied all to clipboard');
      alert('All items copied to clipboard');
    })
    .catch(err => {
      // console.error('Failed to copsy:', err);
    });
}

async function deleteItem(index) {
  console.log('Deleting itemd')
  let newList = quickList.value.filter((_, index_) => index_ !== index)
  quickList.value = newList
  await storage.setItem("local:quickList", newList)
}

function exportToTextFile() {
  const blob = new Blob([quickList.join('\n')], { type: 'text/plain' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = 'quick-list.txt';
  link.click();
}
</script>

<style scoped>
.list-item {
  display: grid;
  grid-template-columns: 5fr 1fr;
  align-items: center;
  padding: 10px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
}

.actions {
  display: flex;
  gap: 5px;
}

.copy-button {
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: bold;
  color: white;
  background-color: #4CAF50;
}

.copy-button:hover {
  background-color: #45a049;
  /* Darker shade of green on hover */
}

.copy-button:active {
  transform: scale(0.95);
  /* Slight shrink effect when clicked */
}

.delete-button {
  background-color: #f44336;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
}

.delete-button:hover {
  background-color: #d32f2f;
}

.delete-button:active {
  transform: scale(0.95);
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