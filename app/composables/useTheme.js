export const useTheme = () => {
  const theme = ref('dark')

  const isDark = computed(() => theme.value === 'dark')
  const isLight = computed(() => theme.value === 'light')

  const toggle = () => {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
  }

  const setTheme = (val) => {
    theme.value = val
  }

  function apply(val) {
    document.documentElement.setAttribute('data-theme', val)
    document.body.className = val === 'dark' ? 'dark' : 'light'
  }

  onMounted(() => {
    const saved = localStorage.getItem('portfolio-theme')
    if (saved) {
      theme.value = saved
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      theme.value = prefersDark ? 'dark' : 'light'
    }
    apply(theme.value)
  })

  watch(theme, (val) => {
    localStorage.setItem('portfolio-theme', val)
    apply(val)
  })

  return { theme, isDark, isLight, toggle, setTheme }
}
