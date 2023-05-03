import { CfgType } from '../sharedTypes'

/**
 * Process the data to ensure the app doesn't break
 * @param cfg Configuration object
 * @returns Object with processed datas
 */
export function processData(cfg: CfgType) {
  const {
    data: rawData,
    dataFormat: rawDataFormat,
    animation: rawAnimation,
    backgroundColor: rawBackground,
    color: rawColor,
    fill: rawFill,
    lineWidth: rawLineWidth,
    x: rawX,
    y: rawY,
  } = cfg

  const data = rawData

  data.forEach((rawData, index) => {
    if (!rawData.x) {
      data[index].x = ''
    }

    if (typeof rawData.x === 'number') rawData.x.toString()

    if (!rawData.y || typeof rawData.y !== 'number') {
      data[index].y = 0
    }
  })

  let dataFormat = rawDataFormat

  if (!dataFormat) dataFormat = ''

  let animation = rawAnimation

  if (!animation || typeof animation !== 'object') {
    animation = {
      isEnable: false,
      speed: 10,
    }
  }

  if (typeof animation.isEnable !== 'boolean') animation.isEnable = false
  if (typeof animation.speed !== 'number') animation.speed = 4

  if (animation.speed > 10) animation.speed = 10
  if (animation.speed < 1) animation.speed = 1

  let backgroundColor = rawBackground

  if (!backgroundColor || typeof backgroundColor !== 'string') {
    backgroundColor = '#fff'
  }

  let color = rawColor

  if (!color || typeof color !== 'string') color = '#0c84da'

  let fill = rawFill

  if (!fill || typeof fill !== 'object') {
    fill = {
      display: false,
      color: '#0c84da33',
    }
  }

  if (typeof fill.display !== 'boolean') fill.display = false
  if (typeof fill.color !== 'string') fill.color = '#0c84da33'

  let lineWidth = rawLineWidth

  if (!lineWidth || typeof lineWidth !== 'number') lineWidth = 2

  let x = rawX

  if (!x || typeof x !== 'object') {
    x = {
      label: {
        display: false,
        color: '#1e1e1e',
        fontFamily: 'Arial',
        fontSize: '14px',
        offset: 8,
      },
      grids: {
        display: false,
        color: '#1e1e1e80',
        lineWidth: 0.5,
      },
      ticks: {
        display: false,
        color: '#1e1e1e80',
        lineWidth: 0.5,
        length: 8,
      },
    }
  }

  if (!x.label || typeof x.label !== 'object') {
    x.label = {
      display: false,
      color: '#1e1e1e',
      fontFamily: 'Arial',
      fontSize: '14px',
      offset: 8,
    }
  }

  if (!x.grids || typeof x.grids !== 'object') {
    x.grids = {
      display: false,
      color: '#1e1e1e80',
      lineWidth: 0.5,
    }
  }

  if (!x.ticks || typeof x.ticks !== 'object') {
    x.ticks = {
      display: false,
      color: '#1e1e1e80',
      lineWidth: 0.5,
      length: 8,
    }
  }

  if (typeof x.label.display !== 'boolean') x.label.display = false
  if (!x.label.color || typeof x.label.color !== 'string') {
    x.label.color = '#1e1e1e'
  }
  if (!x.label.fontFamily || typeof x.label.fontFamily !== 'string') {
    x.label.fontFamily = 'Arial'
  }
  if (!x.label.fontSize || typeof x.label.fontSize !== 'string') {
    x.label.fontSize = '14px'
  }
  if (!x.label.offset || typeof x.label.offset !== 'string') {
    x.label.offset = 8
  }

  if (typeof x.grids.display !== 'boolean') x.grids.display = false
  if (!x.grids.color || typeof x.grids.color !== 'string') {
    x.grids.color = '#1e1e1e80'
  }
  if (!x.grids.lineWidth || typeof x.grids.lineWidth !== 'number') {
    x.grids.lineWidth = 0.5
  }

  if (typeof x.ticks.display !== 'boolean') x.ticks.display = false
  if (!x.ticks.color || typeof x.ticks.color !== 'string') {
    x.ticks.color = '#1e1e1e80'
  }
  if (!x.ticks.lineWidth || typeof x.ticks.lineWidth !== 'number') {
    x.ticks.lineWidth = 0.5
  }
  if (!x.ticks.length || typeof x.ticks.length !== 'number') {
    x.ticks.length = 8
  }

  let y = rawY

  if (!y || typeof y !== 'object') {
    y = {
      label: {
        display: false,
        color: '#1e1e1e',
        fontFamily: 'Arial',
        fontSize: '14px',
        offset: 8,
      },
      grids: {
        display: false,
        color: '#1e1e1e80',
        lineWidth: 0.5,
      },
      ticks: {
        display: false,
        color: '#1e1e1e80',
        lineWidth: 0.5,
        length: 8,
      },
    }
  }

  if (!y.label || typeof y.label !== 'object') {
    y.label = {
      display: false,
      color: '#1e1e1e',
      fontFamily: 'Arial',
      fontSize: '14px',
      offset: 8,
    }
  }

  if (!y.grids || typeof y.grids !== 'object') {
    y.grids = {
      display: false,
      color: '#1e1e1e80',
      lineWidth: 0.5,
    }
  }

  if (!y.ticks || typeof y.ticks !== 'object') {
    y.ticks = {
      display: false,
      color: '#1e1e1e80',
      lineWidth: 0.5,
      length: 8,
    }
  }

  if (typeof y.label.display !== 'boolean') y.label.display = false
  if (!y.label.color || typeof y.label.color !== 'string') {
    y.label.color = '#1e1e1e'
  }
  if (!y.label.fontFamily || typeof y.label.fontFamily !== 'string') {
    y.label.fontFamily = 'Arial'
  }
  if (!y.label.fontSize || typeof y.label.fontSize !== 'string') {
    y.label.fontSize = '14px'
  }
  if (!y.label.offset || typeof y.label.offset !== 'string') {
    y.label.offset = 8
  }

  if (typeof y.grids.display !== 'boolean') y.grids.display = false
  if (!y.grids.color || typeof y.grids.color !== 'string') {
    y.grids.color = '#1e1e1e80'
  }
  if (!y.grids.lineWidth || typeof y.grids.lineWidth !== 'number') {
    y.grids.lineWidth = 0.5
  }

  if (typeof y.ticks.display !== 'boolean') y.ticks.display = false
  if (!y.ticks.color || typeof y.ticks.color !== 'string') {
    y.ticks.color = '#1e1e1e80'
  }
  if (!y.ticks.lineWidth || typeof y.ticks.lineWidth !== 'number') {
    y.ticks.lineWidth = 0.5
  }
  if (!y.ticks.length || typeof y.ticks.length !== 'number') {
    y.ticks.length = 8
  }

  return {
    data,
    dataFormat,
    animation,
    backgroundColor,
    color,
    fill,
    lineWidth,
    x,
    y,
  }
}
