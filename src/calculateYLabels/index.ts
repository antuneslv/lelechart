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

  let range = maxData - minData
  if (range === 0) range = 1

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

  function fixJsCalc(precision: number, a: number, b = 0) {
    const factor = 10 ** precision
    const result = a + b
    return Math.round(result * factor) / factor
  }

  const minYTick = fixJsCalc(
    4,
    Math.floor(minData / yGridSpacing) * yGridSpacing,
  )
  const maxYTick = fixJsCalc(
    4,
    Math.ceil(maxData / yGridSpacing) * yGridSpacing,
  )

  for (
    let i = minYTick;
    i < maxYTick + yGridSpacing;
    i = fixJsCalc(4, i, yGridSpacing)
  ) {
    yLabels.push(i)
  }

  const yLabelsFormatted = formatData(yLabels, dataFormat)

  return { yLabels, yLabelsFormatted, minYTick, maxYTick }
}
