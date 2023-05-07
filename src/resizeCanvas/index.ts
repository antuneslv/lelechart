import { aggregateCalculatedData } from '../aggregateCalculatedData'
import { CfgType, aggregateCalculatedDataType } from '../sharedTypes'

type DrawChartType = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  ctx: CanvasRenderingContext2D,
  aCData: aggregateCalculatedDataType,
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

  if (!canvasRef.current) return

  if (innerWidth >= cfg.dimensions.maxWidth) {
    canvasRef.current.width = cfg.dimensions.maxWidth - cfg.dimensions.paddingX
    canvasRef.current.height = cfg.dimensions.maxHeight
  } else if (innerWidth - cfg.dimensions.paddingX < 300) {
    canvasRef.current.width = 300
    canvasRef.current.height = 300 / aspectRatio < 150 ? 150 : 300 / aspectRatio
  } else if (innerHeight < 150) {
    canvasRef.current.height = 150
    canvasRef.current.width = 150 * aspectRatio < 300 ? 300 : 150 * aspectRatio
  } else {
    canvasRef.current.width = innerWidth - cfg.dimensions.paddingX
    canvasRef.current.height = innerWidth / aspectRatio
  }
  const aCData = aggregateCalculatedData(canvasRef, ctx, cfg)

  drawChart(canvasRef, ctx, aCData, {
    ...cfg,
    animation: { isEnable: false, speed: 4 },
  })
}
