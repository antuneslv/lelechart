import { formatData } from '../formatData'
import { DataFormatType } from '../sharedTypes'

/**
 * Calculate Y Labels to show in the chart
 * @param data Y Data
 * @param dataFormat Format that data must be presented
 * @returns Object with Y labels
 */
export function calculateYLabels(
  data: number[],
  dataFormat?: DataFormatType | null,
) {
  const yLabels = []

  const maxData = Math.max(...data)
  const minData = Math.min(...data)

  const range = maxData - minData

  let initialNumYTicks

  switch (true) {
    case range < 20:
      initialNumYTicks = 10
      break
    case range < 50:
      initialNumYTicks = 9
      break
    case range < 100:
      initialNumYTicks = 8
      break
    case range < 200:
      initialNumYTicks = 7
      break
    case range < 500:
      initialNumYTicks = 6
      break
    default:
      initialNumYTicks = 5
  }

  const initialYGridSpacing = range / (initialNumYTicks - 1)
  const orderOfMagnitude = Math.floor(Math.log10(initialYGridSpacing))
  const magnitudePow10 = 10 ** orderOfMagnitude
  const mostSignificantDigit = Math.round(initialYGridSpacing / magnitudePow10)

  const yGridSpacing = mostSignificantDigit * magnitudePow10

  const minYTick = Math.floor(minData / yGridSpacing) * yGridSpacing
  const maxYTick = Math.ceil(maxData / yGridSpacing) * yGridSpacing

  function fixJsCalc(a: number, b: number, precision: number) {
    const factor = 10 ** precision
    const result = a + b
    return Math.round(result * factor) / factor
  }

  let fixedJsCalc = 0
  for (let i = minYTick; i < maxYTick + yGridSpacing; i += yGridSpacing) {
    i === minYTick ? yLabels.push(i) : yLabels.push(fixedJsCalc)
    fixedJsCalc = fixJsCalc(i, yGridSpacing, 4)
  }

  const yLabelsFormatted = formatData(yLabels, dataFormat)

  return { yLabels, yLabelsFormatted, minYTick, maxYTick }
}
