import { PaddingsType } from '../sharedTypes'

/**
 * Calculates X and Y and chart floor Coordinates
 * @param canvasRef Canvas reference
 * @param data Array with data
 * @param paddings Object with paddings
 * @param xAxisDistance Distance of X Axis
 * @param minYTick Minimum Y tick value
 * @param maxYTick Maximum Y tick value
 * @returns Object with coordinates calculated
 */
export function calculateCoordinates(
  canvasRef: React.RefObject<HTMLCanvasElement>,
  data: number[],
  paddings: PaddingsType,
  xAxisDistance: number,
  minYTick: number,
  maxYTick: number,
) {
  const xCoordinates: number[] = []
  const yCoordinates: number[] = []

  data.forEach((data, index) => {
    const percentageOfValues = ((data - minYTick) / (maxYTick - minYTick)) * 100

    const yCoordinate =
      canvasRef.current!.height -
      paddings.paddingTop -
      paddings.paddingBottom -
      (percentageOfValues *
        (canvasRef.current!.height -
          paddings.paddingTop -
          paddings.paddingBottom)) /
        100 +
      paddings.paddingTop

    xCoordinates.push(xAxisDistance * index + paddings.paddingLeft)
    yCoordinates.push(yCoordinate)
  })

  const chartFloorCoordinate =
    canvasRef.current!.height - paddings.paddingBottom

  return { xCoordinates, yCoordinates, chartFloorCoordinate }
}
