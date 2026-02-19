<script setup lang="ts">
import { ref, onMounted } from 'vue'

const messages = ref<any[]>([])
const name = ref('')
const message = ref('')

const API_URL = 'http://localhost:3000/guestbook'

async function fetchMessages() {
  const res = await fetch(API_URL)
  messages.value = await res.json()
}

async function submitMessage() {
  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: name.value,
      message: message.value
    })
  })

  name.value = ''
  message.value = ''
  fetchMessages()
}

onMounted(fetchMessages)
</script>

<template>
  <div>
    <h1>Guestbook</h1>

    <form @submit.prevent="submitMessage">
      <input v-model="name" placeholder="Your name" required />
      <textarea v-model="message" placeholder="Your message" required />
      <button type="submit">Submit</button>
    </form>

    <div v-for="msg in messages" :key="msg.id">
      <strong>{{ msg.name }}</strong>
      <p>{{ msg.message }}</p>
    </div>
  </div>
</template>
