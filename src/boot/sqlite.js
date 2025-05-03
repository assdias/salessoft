// src/boot/sqlite.js
// Arquivo de boot do Quasar para inicializar o SQLite globalmente

import { boot } from 'quasar/wrappers'
import { Capacitor } from '@capacitor/core'
import { SQLiteConnection } from '@capacitor-community/sqlite'

export default boot(async ({ app }) => {
  try {
    console.log('Inicializando SQLite globalmente...')

    if (Capacitor.getPlatform() === 'web') {
      const sqliteConnection = new SQLiteConnection()
      const isAvailable = await sqliteConnection.isAvailable()

      if (isAvailable) {
        try {
          console.log('Inicializando WebStore para SQLite...')
          await sqliteConnection.initWebStore()
          console.log('WebStore inicializado com sucesso')
        } catch (err) {
          console.error('Erro ao inicializar WebStore:', err)
        }
      } else {
        console.warn('SQLite não está disponível na plataforma web')
      }
    }

    app.config.globalProperties.$sqlite = {
      platform: Capacitor.getPlatform(),
    }

    console.log('SQLite inicializado globalmente com sucesso')
  } catch (error) {
    console.error('Erro ao inicializar SQLite globalmente:', error)
  }
})
