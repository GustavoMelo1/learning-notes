// Prerendered at build time into /search.json; the search palette loads it on first use.
export default defineEventHandler(async (event) => {
  const sections = await queryCollectionSearchSections(event, 'notes', { ignoredTags: ['pre', 'code', 'style', 'script'] })
  const hidden = new Set((await queryCollection(event, 'notes').where('search', '=', false).select('path').all()).map(note => note.path))
  return sections.filter(section => !hidden.has(section.id.split('#')[0]))
})
