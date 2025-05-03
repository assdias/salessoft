<template>
  <q-page class="q-pa-md flex flex-center">
    <q-card class="q-pa-md" style="width: 100%; max-width: 360px">
      <q-card-section class="text-center">
        <div class="text-h6">Sales Soft</div>
      </q-card-section>
      <q-card-section class="text-center">
        <q-img
          src="~assets/salessoft.png"
          alt="Sales Soft Logo"
          style="width: 120px; height: auto"
        />
      </q-card-section>
      <q-card-section>
        <q-form @submit.prevent="onSubmit" ref="formRef">
          <q-input
            v-model="email"
            label="E-mail"
            type="email"
            outlined
            dense
            lazy-rules
            :rules="[(val) => !!val || 'Usuário obrigatório']"
            class="q-mb-md"
          />

          <q-input
            v-model="senha"
            type="password"
            label="Senha"
            outlined
            dense
            lazy-rules
            :rules="[
              (val) => !!val || 'Senha obrigatória',
              (val) => val.length >= 6 || 'Mínimo 6 caracteres',
              (val) => val.length <= 20 || 'Máximo 20 caracteres',
            ]"
            class="q-mb-md"
          />

          <div class="row justify-end">
            <q-btn label="Entrar" type="submit" color="primary" class="full-width" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { useAppStore } from 'src/stores/app-store'

const $q = useQuasar()
const router = useRouter()

const email = ref('')
const senha = ref('')
const formRef = ref(null)

function onSubmit() {
  formRef.value.validate().then((valid) => {
    if (!valid) {
      $q.notify({
        message: 'Dados inválidos',
        type: 'negative',
      })
      return
    }

    useAppStore().login({ usuario: email.value, senha: senha.value })

    if (!useAppStore().isAuthenticated) {
      $q.notify({
        message: 'Dados inválidos',
        type: 'negative',
      })
      return
    }

    $q.notify({
      message: 'Autenticado com sucesso!',
      type: 'positive',
    })
    router.replace({ name: 'me' })
  })
}
</script>
