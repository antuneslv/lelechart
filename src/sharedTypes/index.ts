export type DataType = { x?: string | number; y: number }

export type CfgType = {
  dimensions: {
    maxWidth: number
    maxHeight: number
    paddingX: number
  }
  data: DataType[]
  dataFormat?: DataFormatType
  lineWidth?: number
  color?: string
  animation?: {
    isEnable: boolean
    speed: number
  }
  backgroundColor?: string
  fill?: {
    display: boolean
    color: string
  }
  tooltip?: {
    fontFamily?: string
    fontSize?: string
    color?: string
    borderRadius: string
    backgroundColor?: string
  }
  responsive?: boolean
  x?: {
    label?: {
      display: boolean
      fontSize?: string
      fontFamily?: string
      color?: string
      offset?: number
    }
    grids?: {
      display: boolean
      color?: string
      lineWidth?: number
    }
    ticks?: {
      display: boolean
      color?: string
      lineWidth?: number
      length?: number
    }
  }
  y?: {
    label?: {
      display: boolean
      fontSize?: string
      fontFamily?: string
      color?: string
      offset?: number
    }
    grids?: {
      display: boolean
      color?: string
      lineWidth?: number
    }
    ticks?: {
      display: boolean
      color?: string
      lineWidth?: number
      length?: number
    }
  }
}

export type PaddingsType = {
  paddingBase: number
  paddingTop: number
  paddingBottom: number
  paddingLeft: number
  paddingRight: number
}

export type DataFormatType =
  | 'USD'
  | 'EUR'
  | 'JPY'
  | 'GBP'
  | 'AUD'
  | 'CHF'
  | 'CAD'
  | 'CNY'
  | 'SEK'
  | 'NZD'
  | 'BRL'
  | 'RUB'
  | 'INR'
  | 'MXN'
  | '%'
  | 'º'

export type GridsType = {
  coordinate: number
  value: string | number
}

export type AnimationsCfgType = {
  pos: number
  targetY: number
  currentY: number
  baseSpeed: number
  globalSpeed: number
  finished: boolean
}

export type DrawCfgType = {
  lineWidth: number
  lineColor: string
  isFilled: boolean
  fillColor: string
}

export type ElementsCfgType = {
  backgroundColor: string
  hasXLabel: boolean
  xLabelFont: string
  xLabelColor: string
  hasXGrids: boolean
  xGridsColor: string
  xGridsLineWidth: number
  hasXTicks: boolean
  xTicksColor: string
  xTicksLineWidth: number
  xTicksLength: number
  hasYLabel: boolean
  yLabelFont: string
  yLabelColor: string
  hasYGrids: boolean
  yGridsColor: string
  yGridsLineWidth: number
  hasYTicks: boolean
  yTicksColor: string
  yTicksLineWidth: number
  yTicksLength: number
  xLabels: (string | number)[]
  yLabels: number[]
}

export type tooltipCfgType = {
  fontFamily: string
  fontSize: string
  color: string
  borderRadius: string
  backgroundColor: string
}

export type aggregateCalculatedDataType = {
  canvasRef: React.RefObject<HTMLCanvasElement>
  ctx: CanvasRenderingContext2D
  data: number[]
  dataFormat: DataFormatType | null
  yLabelsFormatted: number[] | string[]
  xCoordinates: number[]
  yCoordinates: number[]
  chartFloorCoordinate: number
  paddings: PaddingsType
  tooltip: tooltipCfgType
  animationsCfg: AnimationsCfgType[]
  drawCfg: DrawCfgType
  elementsCfg: ElementsCfgType
}
