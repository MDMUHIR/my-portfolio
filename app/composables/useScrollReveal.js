export const useScrollReveal = () => {
  const observer = ref(null)

  const observe = (selector = '.reveal, .reveal-left, .reveal-right, .reveal-scale') => {
    if (import.meta.client) {
      observer.value = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible')
              observer.value?.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
      )

      document.querySelectorAll(selector).forEach((el) => {
        observer.value?.observe(el)
      })
    }
  }

  const destroy = () => {
    observer.value?.disconnect()
  }

  return { observe, destroy }
}
