import { drawXGrids, drawYGrids } from './drawGrids'
import { drawXLabels, drawYLabels } from './drawLabels'
import { drawXTicks, drawYTicks } from './drawTicks'
import { ElementsCfgType, GridsType, PaddingsType } from '../sharedTypes'

/**
 * Manages the background elements that will be drawn
 * @param canvas Canvas reference
 * @param ctx Canvas 2D context
 * @param yLabelsFormatted Array of Y labels
 * @param xCoordinates X Coordinates
 * @param chartFloorCoordinate Chart floor coordinate
 * @param paddings Object with paddings
 * @param elementsCfg Object with elements configuration
 */
export function drawElements(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  yLabelsFormatted: number[] | string[],
  xCoordinates: number[],
  chartFloorCoordinate: number,
  paddings: PaddingsType,
  elementsCfg: ElementsCfgType,
) {
  canvas.style.background = elementsCfg.backgroundColor

  const {
    xGridsLineWidth,
    xGridsColor,
    yGridsLineWidth,
    yGridsColor,
    xLabelFont,
    xLabelColor,
    yLabelFont,
    yLabelColor,
    xTicksLineWidth,
    xTicksColor,
    xTicksLength,
    yTicksLineWidth,
    yTicksColor,
    yTicksLength,
    yLabels,
  } = elementsCfg

  const xGrids: GridsType[] = []
  const yGrids: GridsType[] = []

  const maxYAxisValue = Math.max(...yLabels)
  const minYAxisValue = Math.min(...yLabels)

  yLabels.forEach((value, index) => {
    const percentageOfValues =
      ((value - minYAxisValue) / (maxYAxisValue - minYAxisValue)) * 100

    const yCoordinate =
      canvas.height -
      paddings.paddingTop -
      paddings.paddingBottom -
      (percentageOfValues *
        (canvas.height - paddings.paddingTop - paddings.paddingBottom)) /
        100 +
      paddings.paddingTop

    yGrids.push({
      coordinate: yCoordinate,
      value: yLabelsFormatted[index],
    })
  })

  xCoordinates.forEach((coordinate, index) => {
    xGrids.push({ coordinate, value: elementsCfg.xLabels[index] })
  })

  elementsCfg.hasXGrids &&
    drawXGrids(canvas, ctx, xGridsLineWidth, xGridsColor, xGrids, paddings)
  elementsCfg.hasYGrids &&
    drawYGrids(canvas, ctx, yGridsLineWidth, yGridsColor, yGrids, paddings)
  elementsCfg.hasXLabel &&
    drawXLabels(canvas, ctx, xLabelFont, xLabelColor, xGrids, paddings)
  elementsCfg.hasYLabel &&
    drawYLabels(ctx, yLabelFont, yLabelColor, yGrids, paddings)
  elementsCfg.hasXTicks &&
    drawXTicks(
      canvas,
      ctx,
      xTicksLineWidth,
      xTicksColor,
      xTicksLength,
      chartFloorCoordinate,
      xGrids,
      paddings,
    )
  elementsCfg.hasYTicks &&
    drawYTicks(
      ctx,
      yTicksLineWidth,
      yTicksColor,
      yTicksLength,
      yGrids,
      paddings,
    )
}
