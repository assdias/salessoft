<template>
  <q-page class="column flex-center">
    <div class="q-pa-md full-width text-center">
      <div class="text-h2">Sales Soft</div>
      <div class="q-pa-md">
        <q-img
          src="~assets/salessoft.png"
          alt="Sales Soft Logo"
          style="width: 100%; height: auto"
          class="rounded-borders"
        />
      </div>
      <div class="q-pa-md text-h6">SQLite Status: {{ dbStatus }}</div>
    </div>
  </q-page>
</template>

<script setup>
//import { App } from '@capacitor/app'
import { ref, onBeforeUnmount, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { useLocalApi } from 'src/composables/UseLocalApi'
import { Cliente, Produto } from 'src/models'

const $q = useQuasar()
const router = useRouter()
const { initDb, syncTables, closeConnection } = useLocalApi()
const dbStatus = ref('Não inicializado')

const initDatabase = async () => {
  try {
    dbStatus.value = 'Inicializando...'
    await initDb()
    dbStatus.value = 'Inicializado'
    $q.notify({
      color: 'positive',
      message: 'Banco de dados inicializado com sucesso',
    })
  } catch (error) {
    console.error('Erro ao inicializar DB:', error)
    dbStatus.value = 'Erro: ' + error.message
    $q.notify({
      color: 'negative',
      message: 'Erro ao inicializar banco de dados',
    })
  }
}

const syncAllTables = async () => {
  try {
    dbStatus.value = 'Sincronizando tabelas...'
    await syncTables([Cliente, Produto])
    dbStatus.value = 'Tabelas sincronizadas'
    $q.notify({
      color: 'positive',
      message: 'Tabelas sincronizadas com sucesso',
    })
  } catch (error) {
    console.error('Erro ao sincronizar tabelas:', error)
    dbStatus.value = 'Erro: ' + error.message
    $q.notify({
      color: 'negative',
      message: 'Erro ao sincronizar tabelas',
    })
  }
}

onMounted(async () => {
  try {
    await initDatabase()
    await syncAllTables()
    router.replace({ name: 'auth' })
  } catch (error) {
    console.error('Erro na inicialização:', error)
  }
})

onBeforeUnmount(async () => {
  try {
    await closeConnection()
    console.log('Conexão fechada')
  } catch (error) {
    console.error('Erro ao fechar conexão:', error)
  }
})
</script>
