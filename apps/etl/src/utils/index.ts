export function batchMap<T>(arr: T[], batchSize: number) {
  const batches = []
  for (let i = 0; i < arr.length; i += batchSize) {
    const batch = arr.slice(i, i + batchSize)
    batches.push(batch)
  }
  return batches
}

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))
