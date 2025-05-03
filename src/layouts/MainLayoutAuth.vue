<template>
  <q-layout view="lHh Lpr lFf">
    <HeaderNav />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import HeaderNav from 'src/components/HeaderNav.vue'
</script>
