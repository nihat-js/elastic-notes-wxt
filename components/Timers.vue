<template>
  <div>
    <h2>Timers</h2>
    <!-- Input for setting timer duration -->
    <input type="number" v-model="newTimerDuration" placeholder="Timer duration in seconds">
    <button @click="startNewTimer">Start Timer</button>

    <!-- Active timers list -->
    <div v-for="(timer, index) in activeTimers" :key="index" class="timer">
      Timer {{ index + 1 }}: {{ timer.remaining }} seconds
      <div>
        <button v-if="timer.isRunning" @click="stopTimer(index)">Stop</button>
        <button v-else @click="resumeTimer(index)">Resume</button>
        <button @click="deleteTimer(index)">Delete</button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';

let newTimerDuration = ref(30) // Duration for new timers
let timers = ref([{
  id: 1,
  createdAt: "",
  duration: "",
}])
function startNewTimer() {
  if (newTimerDuration < 0) {
    return;
  }
  const timer = {
    startedAt: "",
    resumedAt: "",
    remaining: newTimerDuration,
    isRunning: true,
    intervalId: setInterval(() => {
      decrementTimer(timer);
    }, 1000),
  };
  activeTimers.push(timer);
}

function decrementTimer(timer) {
  if (timer.isRunning) {
    timer.remaining--; // Decrement the timer every second
    if (timer.remaining <= 0) {
      clearInterval(timer.intervalId); // Clear interval if timer reaches zero
    }
  }
}

function stopTimer(index) {
  const timer = activeTimers[index];
  timer.isRunning = false; // Stop the timer
  clearInterval(timer.intervalId); // Clear the interval
}

function resumeTimer(index) {
  const timer = activeTimers[index];
  timer.isRunning = true; // Resume the timer
  timer.intervalId = setInterval(() => {
    decrementTimer(timer);
  }, 1000); // Reassign interval for countdown
}

function deleteTimer(index) {
  const timer = activeTimers[index];
  clearInterval(timer.intervalId); // Clear interval before deleting
  activeTimers.splice(index, 1); // Remove the timer from the list
}

</script>

<style>
.timer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
  margin-bottom: 10px;
}

.timer button {
  padding: 5px 10px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}

.timer button:nth-child(1) {
  background-color: #f44336;
}
</style>