<script setup lang="ts">
const notes = useNotes()
useSeoMeta({ title: 'Biblioteca', description: 'Busque uma explicação ou filtre as notas por assunto.' })
</script>

<template><LibraryCatalog :notes="notes" /></template>
