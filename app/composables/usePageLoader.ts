export const usePageLoader = createSharedComposable(() => {
  const isVisible = ref(false)

  function show(minMs = 2200) {
    isVisible.value = true
    setTimeout(() => {
      isVisible.value = false
    }, minMs)
  }

  return { isVisible, show }
})
