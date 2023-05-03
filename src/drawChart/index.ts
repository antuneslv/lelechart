import { processData } from '../processData'
import { measureText } from '../measureTexts'
import { calculatePaddings } from '../calculatePaddings'
import { calculateYLabels } from '../calculateYLabels'
import { calculateCoordinates } from '../calculateCoordinates'
import { showTooltipOnData } from '../showTooltipOnData'
import { drawAnimatedLineChart } from '../drawAnimatedLineChart'
import { drawLineChart } from '../drawLineChart'
import { CfgType } from '../sharedTypes'

/**
 * Draw chart
 * @param canvasRef Canvas reference
 * @param ctx Canvas Context2D
 * @param cfg Configuration object
 */
export function drawChart(
  canvasRef: React.RefObject<HTMLCanvasElement>,
  ctx: CanvasRenderingContext2D,
  cfg: CfgType,
) {
  const dataLength = cfg.data.length

  const {
    data: processedData,
    dataFormat,
    animation,
    backgroundColor,
    color,
    fill,
    lineWidth,
    x,
    y,
  } = processData(cfg)

  const paddingsCfg = {
    hasXLabel: x.label!.display,
    hasYLabel: y.label!.display,
    hasXTicks: x.ticks!.display,
    hasYTicks: y.ticks!.display,
    xTicksLength: x.ticks?.length as number,
    yTicksLength: y.ticks?.length as number,
    xLabelOffset: x.label?.offset as number,
    yLabelOffset: y.label?.offset as number,
  }

  const xLabelFont = (ctx.font = `${x.label?.fontSize} ${x.label?.fontFamily}`)
  const yLabelFont = (ctx.font = `${y.label?.fontSize} ${y.label?.fontFamily}`)

  const data = processedData.map(data => data.y)
  const xLabels = processedData.map(data => data.x) as (string | number)[]

  const animationsCfg = []

  const { yLabels, yLabelsFormatted, minYTick, maxYTick } = calculateYLabels(
    data,
    dataFormat,
  )

  const {
    maxXLabelTextHight,
    maxYLabelTextWidth,
    firstXLabelWidth,
    lastXLabelWidth,
    firstYLabelHight,
    lastYLabelHight,
  } = measureText(ctx, xLabels, xLabelFont, yLabelsFormatted, yLabelFont)

  const paddings = calculatePaddings(
    maxXLabelTextHight,
    maxYLabelTextWidth,
    firstXLabelWidth,
    lastXLabelWidth,
    firstYLabelHight,
    lastYLabelHight,
    paddingsCfg,
  )

  const xAxisDistance =
    (canvasRef.current!.width - paddings.paddingLeft - paddings.paddingRight) /
    (dataLength - 1)

  const { xCoordinates, yCoordinates, chartFloorCoordinate } =
    calculateCoordinates(
      canvasRef,
      data,
      paddings,
      xAxisDistance,
      minYTick,
      maxYTick,
    )

  showTooltipOnData(canvasRef, data, xCoordinates, yCoordinates, dataFormat)

  for (let i = 0; i < dataLength; i++) {
    animationsCfg.push({
      pos: i,
      targetY: yCoordinates[i],
      currentY: canvasRef.current!.height,
      baseSpeed: 1,
      globalSpeed: animation.speed,
      finished: false,
    })
  }

  const drawCfg = {
    lineWidth,
    lineColor: color,
    isFilled: fill.display,
    fillColor: fill.color,
  }

  const elementsCfg = {
    backgroundColor,
    hasXLabel: x.label?.display as boolean,
    xLabelFont,
    xLabelColor: x.label?.color as string,
    hasXGrids: x.grids?.display as boolean,
    xGridsColor: x.grids?.color as string,
    xGridsLineWidth: x.grids?.lineWidth as number,
    hasXTicks: x.ticks?.display as boolean,
    xTicksColor: x.ticks?.color as string,
    xTicksLineWidth: x.ticks?.lineWidth as number,
    xTicksLength: x.ticks?.length as number,
    hasYLabel: y.label?.display as boolean,
    yLabelFont,
    yLabelColor: y.label?.color as string,
    hasYGrids: y.grids?.display as boolean,
    yGridsColor: y.grids?.color as string,
    yGridsLineWidth: y.grids?.lineWidth as number,
    hasYTicks: y.ticks?.display as boolean,
    yTicksColor: y.ticks?.color as string,
    yTicksLineWidth: y.ticks?.lineWidth as number,
    yTicksLength: y.ticks?.length as number,
    xLabels,
    yLabels,
  }

  if (animation.isEnable) {
    drawAnimatedLineChart(
      canvasRef,
      ctx,
      yLabelsFormatted,
      xCoordinates,
      chartFloorCoordinate,
      paddings,
      animationsCfg,
      drawCfg,
      elementsCfg,
    )
    return
  }
  drawLineChart(
    canvasRef,
    ctx,
    yLabelsFormatted,
    xCoordinates,
    yCoordinates,
    chartFloorCoordinate,
    paddings,
    drawCfg,
    elementsCfg,
  )
}
