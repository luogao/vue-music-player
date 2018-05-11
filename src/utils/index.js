export const getRelativePosition = (el, x, y) => {
  const rect = el.getBoundingClientRect()
  const width = el.width || el.clientWidth
  const height = el.height || el.clientHeight
  return {
      x: x - rect.left * (width / rect.width),
      y: y - rect.top * (height / rect.height)
  }
}