import { GridsType, PaddingsType } from '../../sharedTypes'

/**
 * Draw X labels
 * @param canvas Canvas reference
 * @param ctx Canvas 2D context
 * @param xLabelFont X label font
 * @param xLabelColor X label color
 * @param xGrids Array of X grid object
 * @param paddings Object with paddings
 */
export function drawXLabels(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  xLabelFont: string,
  xLabelColor: string,
  xGrids: GridsType[],
  paddings: PaddingsType,
) {
  ctx.font = xLabelFont
  ctx.fillStyle = xLabelColor

  const labelsDistance = (xGrids[1].coordinate - xGrids[0].coordinate) / 2

  xGrids.forEach(grid => {
    let labelText = grid.value as string
    const measureText = ctx.measureText(labelText)
    const widthLabelText = measureText.width

    let maxLabelWidth = widthLabelText / 2

    while (maxLabelWidth > labelsDistance) {
      labelText = `${labelText.replace(/\.{3}$/, '').slice(0, -1)}...`
      const measureText = ctx.measureText(labelText)
      const widthLabelText = measureText.width
      maxLabelWidth = widthLabelText / 2
    }

    const finalMeasureText = ctx.measureText(labelText)
    const finalWidthLabelText = finalMeasureText.width

    ctx.fillText(
      labelText,
      grid.coordinate - finalWidthLabelText / 2,
      canvas.height - paddings.paddingBase,
    )
  })
}

/**
 * Draw Y labels
 * @param ctx Canvas 2D context
 * @param yLabelFont Y label font
 * @param yLabelColor Y label color
 * @param xGrids Array of Y grid object
 * @param paddings Object with paddings
 */
export function drawYLabels(
  ctx: CanvasRenderingContext2D,
  yLabelFont: string,
  yLabelColor: string,
  yGrids: GridsType[],
  paddings: PaddingsType,
) {
  ctx.font = yLabelFont
  ctx.fillStyle = yLabelColor

  yGrids.forEach(grid => {
    const labelText = grid.value.toString()
    const labelMeasureText = ctx.measureText(labelText)
    const labelHight =
      labelMeasureText.actualBoundingBoxAscent +
      labelMeasureText.actualBoundingBoxDescent

    ctx.fillText(
      labelText,
      paddings.paddingBase,
      grid.coordinate + labelHight / 2,
    )
  })
}
