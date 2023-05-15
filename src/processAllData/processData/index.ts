/* eslint-disable @typescript-eslint/no-explicit-any */
type ProcessedDataType = {
  x: string
  y: number
}

/**
 * Process the data to ensure the app doesn't break
 * @param rawData Raw data to be processed
 * @returns Processed data
 */
export function processData(rawData: any): ProcessedDataType[] {
  if (typeof rawData !== 'object' || rawData === null || rawData.length <= 1) {
    rawData = [
      { x: '', y: 0 },
      { x: '', y: 0 },
    ]
  }

  const data: any[] = rawData

  data.forEach((rawData, index) => {
    if (typeof rawData !== 'object' || Array.isArray(rawData)) {
      data[index] = { x: '', y: 0 }
    }

    if (!rawData.x) {
      data[index].x = ''
    }

    if (typeof rawData.x === 'number') rawData.x = String(rawData.x)

    if (!rawData.y || typeof rawData.y !== 'number') {
      data[index].y = 0
    }
  })

  return data
}
