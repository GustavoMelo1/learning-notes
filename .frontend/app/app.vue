<template>
  <div>
    <a class="skip-link" href="#conteudo">Pular para o conteúdo</a>
    <SiteHeader />
    <main id="conteudo">
      <NuxtPage />
    </main>
    <SiteFooter />
    <ClientOnly><SearchPalette /></ClientOnly>
  </div>
</template>
