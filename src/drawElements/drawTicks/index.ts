import { GridsType, PaddingsType } from '../../sharedTypes'

/**
 * Draw X Ticks
 * @param canvasRef Canvas reference
 * @param ctx Canvas 2D context
 * @param xTicksLineWidth X ticks line width
 * @param xTicksColor X ticks color
 * @param xTicksLength X ticks length
 * @param chartFloorCoordinate Chart floor coordinate
 * @param xGrids Array of X grid object
 * @param paddings Object with paddings
 */
export function drawXTicks(
  canvasRef: React.RefObject<HTMLCanvasElement>,
  ctx: CanvasRenderingContext2D,
  xTicksLineWidth: number,
  xTicksColor: string,
  xTicksLength: number,
  chartFloorCoordinate: number,
  xGrids: GridsType[],
  paddings: PaddingsType,
) {
  xGrids.forEach(grid => {
    ctx.beginPath()
    ctx.lineWidth = xTicksLineWidth
    ctx.strokeStyle = xTicksColor

    ctx.moveTo(
      grid.coordinate,
      canvasRef.current!.height - paddings.paddingBottom,
    )
    ctx.lineTo(grid.coordinate, chartFloorCoordinate + xTicksLength)

    ctx.stroke()
  })
}

/**
 * Draw Y Ticks
 * @param ctx Canvas 2D context
 * @param yTicksLineWidth Y ticks line width
 * @param yTicksColor Y ticks color
 * @param yTicksLength Y ticks length
 * @param yGrids Array of Y grid object
 * @param paddings Object with paddings
 */
export function drawYTicks(
  ctx: CanvasRenderingContext2D,
  yTicksLineWidth: number,
  yTicksColor: string,
  yTicksLength: number,
  yGrids: GridsType[],
  paddings: PaddingsType,
) {
  yGrids.forEach(grid => {
    ctx.beginPath()
    ctx.lineWidth = yTicksLineWidth
    ctx.strokeStyle = yTicksColor

    ctx.moveTo(paddings.paddingLeft, grid.coordinate)
    ctx.lineTo(paddings.paddingLeft - yTicksLength, grid.coordinate)

    ctx.stroke()
  })
}
