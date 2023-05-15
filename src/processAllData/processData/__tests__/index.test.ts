import { processData } from '..'

const neutralValue = { x: '', y: 0 }

describe('processData', () => {
  it('should return an array with two neutralValue if rawData is undefined', () => {
    const data = processData(undefined)

    expect(data).toStrictEqual([neutralValue, neutralValue])
  })

  it('should return an array with two neutralValue if rawData is null', () => {
    const rawData = null

    const data = processData(rawData)

    expect(data).toStrictEqual([neutralValue, neutralValue])
  })

  it('should return an array with two neutralValue if rawData length is less than one', () => {
    const rawData = [{ x: '1', y: 1 }]

    const data = processData(rawData)

    expect(data).toStrictEqual([neutralValue, neutralValue])
  })

  it('should return an array with two neutralValue if typeof rawData length is different from object', () => {
    const rawData1 = 1
    const rawData2 = '1'
    const rawData3 = true

    const data1 = processData(rawData1)
    const data2 = processData(rawData2)
    const data3 = processData(rawData3)

    expect(data1).toStrictEqual([neutralValue, neutralValue])
    expect(data2).toStrictEqual([neutralValue, neutralValue])
    expect(data3).toStrictEqual([neutralValue, neutralValue])
  })

  it('should return an neutralValue in position of rawData has a value different from object or if it is an array', () => {
    const rawData1 = [{ x: 'a', y: 1 }, 2]
    const rawData2 = ['1', { x: 'b', y: 2 }]
    const rawData3 = [{ x: 'a', y: 1 }, false, { x: 'c', y: 3 }]
    const rawData4 = [{ x: 'a', y: 1 }, ['abc']]

    const data1 = processData(rawData1)
    const data2 = processData(rawData2)
    const data3 = processData(rawData3)
    const data4 = processData(rawData4)

    expect(data1).toStrictEqual([{ x: 'a', y: 1 }, neutralValue])
    expect(data2).toStrictEqual([neutralValue, { x: 'b', y: 2 }])
    expect(data3).toStrictEqual([
      { x: 'a', y: 1 },
      neutralValue,
      { x: 'c', y: 3 },
    ])
    expect(data4).toStrictEqual([{ x: 'a', y: 1 }, neutralValue])
  })

  it('should transform typeof x into string', () => {
    const rawData = [
      { x: 1, y: 1 },
      { x: 2, y: 2 },
    ]

    const data = processData(rawData)

    expect(data).toStrictEqual([
      { x: '1', y: 1 },
      { x: '2', y: 2 },
    ])
  })
})
