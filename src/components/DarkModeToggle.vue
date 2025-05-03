<template>
  <q-toggle
    checked-icon="dark_mode"
    :color="isDark ? 'orange' : 'orange'"
    unchecked-icon="light_mode"
    v-model="darkMode"
    size="lg"
  />
</template>

<script>
import { defineComponent, ref, watch, onMounted, computed } from 'vue'
import { useQuasar } from 'quasar'
import { useAppStore } from 'src/stores/app-store'

export default defineComponent({
  name: 'DarkModeToggle',
  setup() {
    const store = useAppStore()
    const darkMode = ref(store.darkMode)
    const q = useQuasar()

    watch(darkMode, (darkMode) => {
      q.dark.set(darkMode)
      store.darkMode = darkMode
    })

    onMounted(() => {
      q.dark.set(store.darkMode)
    })

    const isDark = computed(() => q.dark.isActive)

    return {
      isDark,
      darkMode,
    }
  },
})
</script>
