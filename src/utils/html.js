export function openNewWindows (router, url, options = {}) {
  const resolvedUrl = router.resolve(url, options)
  window.open(resolvedUrl.href)
}
