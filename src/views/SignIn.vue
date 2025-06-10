<script setup>
import { inject, ref } from 'vue';
import { useRouter } from 'vue-router';
import { errorMessages } from 'vue/compiler-sfc';

const router = useRouter()
const user = inject('user')

const state = ref('login')
const loading = ref(false)
const error = ref(null)

function changeState(){
    state.value = state.value === 'login' ? 'signup' : 'login'
    console.log(state.value)
}

function onSubmit(e) {
  if (state.value === 'login') {
    handleLogin(e)
  } else {
    handleSignUp(e)
  }
}

async function handleSignUp(e){
    e.preventDefault();
    
    const username = e.target.querySelector('#username').value
    const email = e.target.querySelector('#email').value
    const password = e.target.querySelector('#password').value
    const passwordHash = btoa(password)

    loading.value = true
    error.value = null

    try{
        const response = await fetch('http://localhost:3000/api/sign-up', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username,
                email: email,
                password: passwordHash
            })
        })
        if (!response.ok){
            throw new Error('HTTP error! status: ' + response.status)
        }
        const data = await response.json()
        if (data && data.id) {
            if (user) user.value = data;
            router.push({ name: 'surveyor-home', params: { id: String(data.id) } });
        } else {
            throw new Error('No user id returned from server');
        }
    } catch (err) {
        error.value = err
    } finally {
        loading.value = false
    }
}

async function handleLogin(e){
  e.preventDefault()

  const username = e.target.querySelector('#username').value
  const password = e.target.querySelector('#password').value
  const passwordHash = btoa(password)

  loading.value = true
  error.value = null

  try{
    const response = await fetch('http://localhost:3000/api/log-in', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        username: username,
        password: passwordHash
      })
    })
    if(!response.ok){
      throw new Error('HTTPS error! status: ' + response.status)
    }

    const data = await response.json()
    if (data && data.id) {
      if (user) user.value = data;
      router.push({ name: 'surveyor-home', params: { id: String(data.id) } });
    } else {
      throw new Error('No user id returned from server');
    }
  } catch (err) {
    error.value = err
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <header>
    <h1 v-if="state === 'login'" class="page-heading">Log In</h1>
    <h1 v-else class="page-heading">Sign Up</h1>
  </header>
  <main>
    <form @submit.prevent="onSubmit">
      <div class="inputs">
        <div class="input-section">
          <label for="username">Username</label>
          <input type="text" id="username" />
        </div>
        <div class="input-section">
          <label for="password">Password</label>
          <input type="password" id="password" />
        </div>
        <div v-if="state === 'signup'">
          <label for="email">Email</label>
          <input type="text" id="email" />
        </div>
      </div>
      <div v-if="state === 'login'">
        <p>I dont have an account: <a @click="changeState">Sign up</a></p>
        <button type="submit" class="style-btn">Log in</button>
      </div>
      <div v-if="state === 'signup'">
        <p>I have an account: <a @click="changeState">Log In</a></p>
        <button type="submit" class="style-btn">Sign up</button>
      </div>
    </form>
  </main>
</template>

<style scoped>
a{
    cursor: pointer;
}
</style>