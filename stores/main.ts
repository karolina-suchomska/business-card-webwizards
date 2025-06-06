import { defineStore } from 'pinia'

interface UserImage {
  baseUrl: string
  filename: string
  extension: string
}

interface UserData {
  id: string
  name: string
  surname: string
  email: string
  phone: string
  about: string
  image: UserImage
}

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as UserData | null,
    loading: false,
    error: null as string | null,
    message: null as string | null
  }),
  actions: {
    async fetchUser() {
      this.loading = true
      this.error = null
      this.message = null

      try {
        const response = await fetch('https://webwizards.home.pl/jacek/frontend-task/api/user/')
        const result = await response.json()

        if (!response.ok) {
          throw new Error(`${result.message || 'Wystąpił błąd'} (status ${response.status})`)
        }      

        this.user = result.data
        this.message = result.message
      } catch (err: any) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    }
  }
})