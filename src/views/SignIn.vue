<script setup>
import { inject, ref } from 'vue';
import { useRouter } from 'vue-router';

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
  <!-- <header>
    <h1 class="page-heading">Sign In</h1>
  </header> -->
  <form @submit.prevent="onSubmit">
    <h2 v-if="state === 'login'">Log In</h2>
    <h2 v-else>Sign Up</h2>
    <div class="inputs">
      <div class="input-section">
        <label for="username">Username</label>
        <input type="text" id="username" />
      </div>
      <div class="input-section">
        <label for="password">Password</label>
        <input type="password" id="password" />
      </div>
      <div v-if="state === 'signup'" class="input-section">
        <label for="email">Email</label>
        <input type="text" id="email" />
      </div>
    </div>
    <div v-if="error != null">
      <p>{{ error.message }}</p>
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
</template>

<style scoped>
main{
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem;
}

a{
  cursor: pointer;
}

form{
  box-sizing: border-box;
  display: flex;
  align-self: center;
  justify-self: center;
  flex-direction: column;
  border: var(--border);
  border-radius: 0.25rem;
  width: 25rem;
  padding: 1rem;
  margin-top: 1rem;
}

.inputs{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.input-section{
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
}

input{
  box-sizing: border-box;
  width: 100%;
  height: 2rem;
  padding-inline: 0.25rem;
  margin: 0;
  border: var(--border);
  border-radius: 0.25rem;
}

button{
  font-size: 1rem;
  border: var(--border);
  border-radius: 0.25rem;
  padding: 0.5rem 1rem;
}
</style>