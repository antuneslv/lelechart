import { CfgType } from '../sharedTypes'

type DrawChartType = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  ctx: CanvasRenderingContext2D,
  cfg: CfgType,
) => void

/**
 * Function responsible to redraw canvas on resize
 * @param drawChart Function core to draw canvas
 * @param canvasRef Canvas reference
 * @param ctx Canvas 2D context
 * @param cfg Configuration object
 */
export function resizeCanvas(
  drawChart: DrawChartType,
  canvasRef: React.RefObject<HTMLCanvasElement>,
  ctx: CanvasRenderingContext2D,
  cfg: CfgType,
) {
  const aspectRatio = cfg.dimensions.maxWidth / cfg.dimensions.maxHeight

  if (canvasRef.current) {
    if (innerWidth >= cfg.dimensions.maxWidth) {
      canvasRef.current.width =
        cfg.dimensions.maxWidth - cfg.dimensions.paddingX
      canvasRef.current.height = cfg.dimensions.maxHeight
    } else {
      canvasRef.current.width = innerWidth - cfg.dimensions.paddingX
      canvasRef.current.height = innerWidth / aspectRatio
    }

    drawChart(canvasRef, ctx, {
      ...cfg,
      animation: { isEnable: false, speed: 4 },
    })
  }
}
