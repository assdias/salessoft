import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    appTitle: 'SalesSoft',
    appVersion: '0.0.1',
    darkMode: false,
    userEmail: '',
    isAuthenticated: false,
  }),
  getters: {
    isDarkMode() {
      return this.darkMode
    },
    getIsAuthenticated() {
      return this.isAuthenticated
    },
    getUserEmail() {
      return this.userEmail
    },
  },
  actions: {
    login(user) {
      this.userEmail = user.email
      this.isAuthenticated = true
    },
  },
  persist: true,
})
