import { createApp } from 'vue'
import App from './App.vue'
import { router, store } from './providers'

const app = createApp(App)

export default app.use(router).use(store)
