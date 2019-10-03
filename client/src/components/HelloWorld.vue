<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p class="lead mt-2">{{ authStatus }}</p>
    <div class="d-flex my-4 justify-content-center">
      <button @click="signIn" class="btn btn-outline-primary mx-4">Sign In ></button>
      <button @click="sendRequest" class="btn btn-outline-success mx-4">Send Request ></button>
      <button @click="signOut" class="btn btn-outline-danger mx-4">Sign Out ></button>
    </div>
    <p class="lead">{{ response }}</p>
  </div>
</template>

<script>
import axios from 'axios'
import firebase from 'firebase'

const client = axios.create({
  baseURL: 'http://localhost:3000',
  json: true
})

export default {
  name: 'HelloWorld',
  data: function() {
    return {
      response: 'No data yet...',
      authStatus: 'No Auth Status'
    }
  },
  props: {
    msg: String
  },
  methods: {
    sendRequest() {
      if (firebase.auth().currentUser) {
        firebase.auth().currentUser.getIdToken(true)
        .then((idToken) => {
          client({
            method: 'get',
            url: '/',
            headers: {
              'AuthToken': idToken
            }
          }).then((res) => {
            this.response = res.data.message
          }).catch((error) => {
            this.response = error
          })
        }).catch((error) => {
          this.response = "Error getting auth token"
        });
      } else {
        client({
          method: 'get',
          url: '/'
        }).then((res) => {
          this.response = res.data.message
        }).catch((error) => {
          this.response = error
        })
      }
    },
    signIn() {
      firebase.auth()
      .signInWithEmailAndPassword("dummy@gmail.com", "pass123!")
      .then(() => {
        this.authStatus = 'Authorized'
      }).catch((err) => {
        this.authStatus = err
      })
    },
    signOut() {
      firebase.auth().signOut().then(() => {
        this.authStatus = 'Unauthorized'
      }).catch((err) => {
        this.authStatus = err
      })
    }
  }
}
</script>
