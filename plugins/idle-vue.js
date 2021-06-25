import Vue from 'vue'
import IdleVue from 'idle-vue'
const eventsHub = new Vue();
const options = { eventEmitter: eventsHub, idleTime: 1200000 }

Vue.use(IdleVue, options)
