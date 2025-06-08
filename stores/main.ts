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

interface FullResult {
  data: UserData
  message: string
  status: number
}

export const useUserStore = defineStore('user', {
  state: () => ({
    fullResult: null as FullResult | null,
    loading: false,
    error: null as string | null
  }),
  getters: {
    user(state): UserData | null {
      return state.fullResult?.data ?? null;
    }
  },
  actions: {
    downloadUserData() {
      if (!this.fullResult) return
  
      try {
        const fileData = JSON.stringify(this.fullResult, null, 2)
        const blob = new Blob([fileData], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
  
        const link = Object.assign(document.createElement('a'), {
          href: url,
          download: 'user-data.json',
        })
  
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
  
        URL.revokeObjectURL(url)
      } catch (error) {
        console.error('Błąd podczas pobierania pliku:', error)
      }
    },
    async fetchUser() {
      this.loading = true
      this.error = null

      try {
        const response = await fetch('https://webwizards.home.pl/jacek/frontend-task/api/user/')
        const result = await response.json()

        if (!response.ok) {
          throw new Error(`(status ${response.status}) ${result.message + ' (Złapane, pokazane. Frontend nie pyta – frontend naprawia 💅☕️)' || 'Wystąpił błąd'}`)
        }      

        this.fullResult = result
      } catch (err: any) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    }
  }
})