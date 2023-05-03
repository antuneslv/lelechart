type PaddingsCfgType = {
  hasXLabel: boolean
  hasYLabel: boolean
  hasXTicks: boolean
  hasYTicks: boolean
  xTicksLength: number
  yTicksLength: number
  xLabelOffset: number
  yLabelOffset: number
}

/**
 * Calculates chart paddings
 * @param maxXLabelTextHight max X label text hight
 * @param maxYLabelTextWidth max Y label text width
 * @param firstXLabelWidth first X label width
 * @param lastXLabelWidth last X label width
 * @param firstYLabelHight first Y label hight
 * @param lastYLabelHight last Y label hight
 * @param paddingsCfg Configuration object with variables to calculate padding
 * @returns Object with paddings calculated
 */
export function calculatePaddings(
  maxXLabelTextHight: number,
  maxYLabelTextWidth: number,
  firstXLabelWidth: number,
  lastXLabelWidth: number,
  firstYLabelHight: number,
  lastYLabelHight: number,
  paddingsCfg: PaddingsCfgType,
) {
  const {
    hasXLabel,
    hasYLabel,
    hasXTicks,
    hasYTicks,
    xTicksLength,
    yTicksLength,
    xLabelOffset,
    yLabelOffset,
  } = paddingsCfg

  const paddingBase = 8
  const paddingTop = hasYLabel ? paddingBase + lastYLabelHight / 2 : 0
  const paddingRight = hasXLabel ? paddingBase + lastXLabelWidth / 2 : 0
  let paddingBottom = 0
  let paddingLeft = 0

  switch (true) {
    case hasXLabel && hasXTicks:
      paddingBottom =
        paddingBase + maxXLabelTextHight + xLabelOffset + xTicksLength
      break
    case hasXLabel:
      paddingBottom = paddingBase + maxXLabelTextHight + xLabelOffset
      break
    case hasXTicks:
      paddingBottom = paddingBase + xTicksLength
      break
    case hasYLabel:
      paddingBottom = paddingBase + firstYLabelHight / 2
      break
    default:
      break
  }

  switch (true) {
    case hasYLabel && hasYTicks:
      paddingLeft =
        paddingBase + maxYLabelTextWidth + yLabelOffset + yTicksLength
      break
    case hasYLabel:
      paddingLeft = paddingBase + maxYLabelTextWidth + yLabelOffset
      break
    case hasYTicks && hasXLabel:
      paddingLeft =
        yTicksLength > firstXLabelWidth / 2
          ? paddingBase + yTicksLength
          : paddingBase + firstXLabelWidth / 2
      break
    case hasYTicks:
      paddingLeft = paddingBase + yTicksLength
      break
    case hasXLabel:
      paddingLeft = paddingBase + firstXLabelWidth / 2
      break
    default:
      break
  }

  return {
    paddingBase,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
  }
}
