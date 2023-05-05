import { DataFormatType } from '../sharedTypes'

/**
 * Format the data to be presented in chart
 * @param data to be formatted (currencies, %, º)
 * @param dataFormat Format that data must be presented
 * @returns formatted data
 */
export function formatData(data: number[], dataFormat?: DataFormatType | null) {
  switch (dataFormat) {
    case 'USD':
      return data.map(data =>
        data.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
      )

    case 'EUR':
      return data.map(data =>
        data.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' }),
      )

    case 'JPY':
      return data.map(data =>
        data.toLocaleString('ja-JP', { style: 'currency', currency: 'JPY' }),
      )

    case 'GBP':
      return data.map(data =>
        data.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' }),
      )

    case 'AUD':
      return data.map(data =>
        data.toLocaleString('en-AU', { style: 'currency', currency: 'AUD' }),
      )

    case 'CHF':
      return data.map(data =>
        data.toLocaleString('de-CH', { style: 'currency', currency: 'CHF' }),
      )

    case 'CAD':
      return data.map(data =>
        data.toLocaleString('en-CA', { style: 'currency', currency: 'CAD' }),
      )

    case 'CNY':
      return data.map(data =>
        data.toLocaleString('zh-CN', { style: 'currency', currency: 'CNY' }),
      )

    case 'SEK':
      return data.map(data =>
        data.toLocaleString('sv-SE', { style: 'currency', currency: 'SEK' }),
      )

    case 'NZD':
      return data.map(data =>
        data.toLocaleString('en-NZ', { style: 'currency', currency: 'NZD' }),
      )

    case 'BRL':
      return data.map(data =>
        data.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
      )

    case 'RUB':
      return data.map(data =>
        data.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' }),
      )

    case 'INR':
      return data.map(data =>
        data.toLocaleString('en-IN', { style: 'currency', currency: 'INR' }),
      )

    case 'MXN':
      return data.map(data =>
        data.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' }),
      )

    case '%':
      return data.map(data => `${data}%`)

    case 'º':
      return data.map(data => `${data}º`)

    default:
      return data
  }
}
