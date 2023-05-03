import { drawElements } from '../drawElements'
import { DrawCfgType, ElementsCfgType, PaddingsType } from '../sharedTypes'

type AnimationCfgType = {
  pos: number
  targetY: number
  currentY: number
  baseSpeed: number
  globalSpeed: number
  finished: boolean
}

/**
 * Draw an animated line chart
 * @param canvasRef Canvas reference
 * @param ctx Canvas 2D context
 * @param yLabelsFormatted Array of Y labels
 * @param xCoordinates X Coordinates
 * @param chartFloorCoordinate Chart floor coordinate
 * @param paddings Object with paddings
 * @param animationsCfg Array with configurations of each animation frame
 * @param drawCfg Object with line props
 * @param elementsCfg Object with elements configuration
 */
export function drawAnimatedLineChart(
  canvasRef: React.RefObject<HTMLCanvasElement>,
  ctx: CanvasRenderingContext2D,
  yLabelsFormatted: number[] | string[],
  xCoordinates: number[],
  chartFloorCoordinate: number,
  paddings: PaddingsType,
  animationsCfg: AnimationCfgType[],
  drawCfg: DrawCfgType,
  elementsCfg: ElementsCfgType,
) {
  ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height)

  drawElements(
    canvasRef,
    ctx,
    yLabelsFormatted,
    xCoordinates,
    chartFloorCoordinate,
    paddings,
    elementsCfg,
  )

  animationsCfg.sort((a, b) => b.targetY - a.targetY)
  animationsCfg.forEach((animation, index) => {
    animation.baseSpeed = (index / (index + 1) + 1) * animation.globalSpeed
  })
  animationsCfg.sort((a, b) => a.pos - b.pos)

  ctx.beginPath()
  ctx.lineWidth = drawCfg.lineWidth
  ctx.strokeStyle = drawCfg.lineColor

  for (let i = 0; i < xCoordinates.length; i++) {
    const animation = animationsCfg[i]

    if (!animation.finished) {
      animation.currentY =
        animation.currentY > animation.targetY
          ? animation.currentY - animation.baseSpeed
          : ((animation.finished = true), animation.targetY)
    }

    if (i === 0) {
      ctx.moveTo(xCoordinates[i], animation.currentY)
    } else {
      ctx.lineTo(xCoordinates[i], animation.currentY)
    }
  }

  ctx.stroke()

  const startAnimation = requestAnimationFrame(() =>
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
    ),
  )

  if (animationsCfg.every(animation => animation.finished)) {
    cancelAnimationFrame(startAnimation)
  }

  if (!drawCfg.isFilled) return

  ctx.lineTo(xCoordinates[xCoordinates.length - 1], chartFloorCoordinate)
  ctx.lineTo(xCoordinates[0], chartFloorCoordinate)
  ctx.lineTo(xCoordinates[0], animationsCfg[0].currentY)

  ctx.fillStyle = drawCfg.fillColor
  ctx.fill()
}
