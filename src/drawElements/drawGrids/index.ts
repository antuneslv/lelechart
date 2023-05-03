import { GridsType, PaddingsType } from '../../sharedTypes'

/**
 * Draw X grids
 * @param canvasRef Canvas reference
 * @param ctx Canvas 2D context
 * @param xGridsLineWidth X grid line width
 * @param xGridsColor X grid color
 * @param xGrids Array of X grid object
 * @param paddings Object with paddings
 */
export function drawXGrids(
  canvasRef: React.RefObject<HTMLCanvasElement>,
  ctx: CanvasRenderingContext2D,
  xGridsLineWidth: number,
  xGridsColor: string,
  xGrids: GridsType[],
  paddings: PaddingsType,
) {
  xGrids.forEach(grid => {
    ctx.beginPath()
    ctx.lineWidth = xGridsLineWidth
    ctx.strokeStyle = xGridsColor

    ctx.moveTo(grid.coordinate, paddings.paddingTop)
    ctx.lineTo(
      grid.coordinate,
      canvasRef.current!.height - paddings.paddingBottom,
    )

    ctx.stroke()
  })
}

/**
 * Draw Y grids
 * @param canvasRef Canvas reference
 * @param ctx Canvas 2D context
 * @param yGridsLineWidth Y grid line width
 * @param yGridsColor Y grid color
 * @param yGrids Array of Y grid object
 * @param paddings Object with paddings
 */
export function drawYGrids(
  canvasRef: React.RefObject<HTMLCanvasElement>,
  ctx: CanvasRenderingContext2D,
  yGridsLineWidth: number,
  yGridsColor: string,
  yGrids: GridsType[],
  paddings: PaddingsType,
) {
  yGrids.forEach(grid => {
    ctx.beginPath()
    ctx.lineWidth = yGridsLineWidth
    ctx.strokeStyle = yGridsColor

    ctx.moveTo(paddings.paddingLeft, grid.coordinate)
    ctx.lineTo(
      canvasRef.current!.width - paddings.paddingRight,
      grid.coordinate,
    )

    ctx.stroke()
  })
}
