import { drawElements } from '../drawElements'
import { DrawCfgType, ElementsCfgType, PaddingsType } from '../sharedTypes'

/**
 * Draw a line chart
 * @param canvasRef Canvas reference
 * @param ctx Canvas 2D context
 * @param yLabelsFormatted Array of Y labels
 * @param xCoordinates X Coordinates
 * @param yCoordinates Y Coordinates
 * @param chartFloorCoordinate Chart floor coordinate
 * @param paddings Object with paddings
 * @param drawCfg Object with line props
 * @param elementsCfg Object with elements configuration
 */
export function drawLineChart(
  canvasRef: React.RefObject<HTMLCanvasElement>,
  ctx: CanvasRenderingContext2D,
  yLabelsFormatted: number[] | string[],
  xCoordinates: number[],
  yCoordinates: number[],
  chartFloorCoordinate: number,
  paddings: PaddingsType,
  drawCfg: DrawCfgType,
  elementsCfg: ElementsCfgType,
) {
  const canvas = canvasRef.current as HTMLCanvasElement

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  drawElements(
    canvas,
    ctx,
    yLabelsFormatted,
    xCoordinates,
    chartFloorCoordinate,
    paddings,
    elementsCfg,
  )

  ctx.beginPath()

  ctx.lineWidth = drawCfg.lineWidth
  ctx.strokeStyle = drawCfg.lineColor

  ctx.moveTo(xCoordinates[0], yCoordinates[0])

  for (let i = 1; i <= yCoordinates.length; i++) {
    ctx.lineTo(xCoordinates[i], yCoordinates[i])
  }

  ctx.stroke()

  if (!drawCfg.isFilled) return

  ctx.lineTo(xCoordinates[xCoordinates.length - 1], chartFloorCoordinate)
  ctx.lineTo(xCoordinates[0], chartFloorCoordinate)
  ctx.lineTo(xCoordinates[0], yCoordinates[0])

  ctx.fillStyle = drawCfg.fillColor
  ctx.fill()
}
