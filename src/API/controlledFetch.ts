const controlledFetch = async (url: string) => {
  const timeout = 8000
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)
  const response = await fetch(url, { signal: controller.signal })

  clearTimeout(timeoutId)

  return response.json()
}

export default controlledFetch
