<template>
  <div class="quick-list-options">
    <button v-if="quickList.length > 0" @click="copyAllToClipboard">Copy All</button>
    <button v-if="quickList.length > 0" @click="exportToTextFile">Export as .txt</button>
    <button v-if="quickList.length > 0" @click="clearQuickList">Clear</button>
    <span v-if="quickList.length === 0"> Oops, it's empty. Use context menu to add selected text to this list </span>
  </div>
  <div class="list-item" v-for="(item, index) in quickList" :key="index">
    <span class="element"> {{ item.substring(0, 20) }}{{ item.length > 20 ? "..." : "" }} </span>
    <div class="item-actions">
      <button class="copy-button" @click="copyToClipboard(item)">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24px" height="24px">
          <path
            d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm4 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V7c0-1.1-.9 2-2-2zm0 16H8V7h12v14z" />
        </svg>
      </button>
      <button class="delete-button" @click="deleteItem(index)">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24px" height="24px">
          <path d="M3 6l3 18h12l3-18H3zm5.5 2h1v12h-1V8zm4.5 0h1v12h-1V8zM6.5 6l1-1h9l1 1H6.5zm1-2h8v1h-8V4z" />
        </svg>
      </button>
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

async function clearQuickList() {
  let answer = confirm("Are you sure you want to clear the quick list")
  if (!answer) return;
  quickList.value = [];
  await storage.setItem("local:quickList", [])
}

async function exportToTextFile() {
  const blob = new Blob([quickList.value.join('\n')], { type: 'text/plain' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = 'quick-list.txt';
  link.click();
  //   await browser.downloads.download({
  //     url: blob, // Blob URL
  //     filename: 'quick-list.txt', // Desired file name
  //     conflictAction: 'overwrite', // If a file with the same name exists
  //     saveAs: true, // If you want to prompt the user with a "Save As" dialog
  //   }, (downloadId) => {
  //     if (chrome.runtime.lastError) {
  //       console.error("Download failed:", chrome.runtime.lastError.message);
  //     } else {
  //       console.log("Download started with ID:", downloadId);
  //     }
  //   })
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

.item-actions {
  display: flex;
  gap: 3px;
}

.copy-button {
  padding: 6px 9px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: bold;
  color: white;
  background-color: #4CAF50;
}

svg {
  width: 12px;
  height: 12px;
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
  padding: 6px 9px;
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
  margin-bottom: 20px;
}

.quick-list-options button {
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}
</style>