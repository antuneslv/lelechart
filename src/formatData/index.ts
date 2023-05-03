import { DataFormatType } from '../sharedTypes'

/**
 * Format the data to be presented in chart
 * @param data to be formatted
 * @param dataFormat Format that data must be presented
 * @returns formatted data
 */
export function formatData(data: number[], dataFormat: DataFormatType) {
  switch (dataFormat) {
    case 'US':
      return data.map(data =>
        data.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
      )

    case 'BR':
      return data.map(data =>
        data.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
      )

    case '%':
      return data.map(data => `${data}%`)

    case 'º':
      return data.map(data => `${data}º`)

    default:
      return data
  }
}
