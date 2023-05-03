/**
 * Measure canvas texts for distances calculations
 * @param ctx Canvas Context2D
 * @param xLabels X label data array
 * @param xLabelFont X label Font
 * @param yLabels Y label data array
 * @param yLabelFont Y label Font
 * @returns Object with text measurements
 */
export function measureText(
  ctx: CanvasRenderingContext2D,
  xLabels: (string | number)[],
  xLabelFont: string,
  yLabels: (string | number)[],
  yLabelFont: string,
) {
  const xLabelsTextHight: number[] = []
  const yLabelsTextWidth: number[] = []

  xLabels.forEach(label => {
    ctx.font = xLabelFont

    const xLabelMeasureText = ctx.measureText(label.toString())
    const xLabelHight =
      xLabelMeasureText.actualBoundingBoxAscent +
      xLabelMeasureText.actualBoundingBoxDescent

    xLabelsTextHight.push(xLabelHight)
  })

  yLabels.forEach(label => {
    ctx.font = yLabelFont

    const yLabelMeasureText = ctx.measureText(label.toString())
    const yLabelWidth = yLabelMeasureText.width

    yLabelsTextWidth.push(yLabelWidth)
  })

  const maxXLabelTextHight = Math.max(...xLabelsTextHight)
  const maxYLabelTextWidth = Math.max(...yLabelsTextWidth)

  const firstXLabel = xLabels[0]
  const lastXLabel = xLabels[xLabels.length - 1]

  const firstYLabel = yLabels[0]
  const lastYLabel = yLabels[yLabels.length - 1]

  const firstXLabelMeasureText = ctx.measureText(firstXLabel.toString())
  const lastXLabelMeasureText = ctx.measureText(lastXLabel.toString())

  const firstYLabelMeasureText = ctx.measureText(firstYLabel.toString())
  const lastYLabelMeasureText = ctx.measureText(lastYLabel.toString())

  const firstXLabelWidth = firstXLabelMeasureText.width
  const lastXLabelWidth = lastXLabelMeasureText.width

  const firstYLabelHight =
    firstYLabelMeasureText.actualBoundingBoxAscent +
    firstYLabelMeasureText.actualBoundingBoxDescent
  const lastYLabelHight =
    lastYLabelMeasureText.actualBoundingBoxAscent +
    lastYLabelMeasureText.actualBoundingBoxDescent

  return {
    maxXLabelTextHight,
    maxYLabelTextWidth,
    firstXLabelWidth,
    lastXLabelWidth,
    firstYLabelHight,
    lastYLabelHight,
  }
}
