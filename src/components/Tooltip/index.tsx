import { useState } from 'react'

import { formatData } from '../../formatData'
import { DataFormatType, tooltipCfgType } from '../../sharedTypes'

type TooltipType = {
  canvasRef: React.RefObject<HTMLCanvasElement>
  tooltipCfg: tooltipCfgType
  data: number[]
  xCoordinates: number[]
  yCoordinates: number[]
  dataFormat: DataFormatType | null
}

export function Tooltip({
  canvasRef,
  tooltipCfg,
  data,
  xCoordinates,
  yCoordinates,
  dataFormat,
}: TooltipType) {
  const canvas = canvasRef.current as HTMLCanvasElement
  const formattedData = formatData(data, dataFormat)

  const [tooltip, setTooltip] = useState(false)
  const [tooltipElement, setTooltipElement] = useState(<></>)

  const handleMouseMove = (event: MouseEvent) => {
    const x = event.offsetX
    const y = event.offsetY

    function getPointIndex(
      x: number,
      y: number,
      xCoordinates: number[],
      yCoordinates: number[],
    ) {
      for (let i = 0; i < xCoordinates.length; i++) {
        const distance = Math.sqrt(
          (x - xCoordinates[i]) ** 2 + (y - yCoordinates[i]) ** 2,
        )
        if (distance < 5) {
          return i
        }
      }
      return -1
    }

    const pointIndex = getPointIndex(x, y, xCoordinates, yCoordinates)

    if (pointIndex === -1) {
      if (tooltip !== false) {
        setTooltip(false)
      }
    } else if (tooltip === false) {
      const canvasRect = canvas.getBoundingClientRect()
      const distanceToCanvasBorderY = canvasRect.bottom - event.pageY
      const distanceToCanvasBorderX = event.pageX - canvasRect.left

      const lastXCoordinate = xCoordinates[xCoordinates.length - 1]
      const maxYCoordinate = Math.max(...yCoordinates)

      const topPosition =
        maxYCoordinate < distanceToCanvasBorderY ? `${y + 24}px` : `${y - 24}px`

      const leftPosition =
        distanceToCanvasBorderX + 16 > lastXCoordinate
          ? `${x - 40}px`
          : `${x + 16}px`

      setTooltipElement(
        <span
          style={{
            position: 'absolute',
            top: topPosition,
            left: leftPosition,
            padding: '4px 8px',
            fontFamily: tooltipCfg.fontFamily,
            fontSize: tooltipCfg.fontSize,
            color: tooltipCfg.color,
            borderRadius: tooltipCfg.borderRadius,
            backgroundColor: tooltipCfg.backgroundColor,
          }}
        >
          {formattedData[pointIndex]}
        </span>,
      )
      setTooltip(true)
    }
  }

  canvas.addEventListener('mousemove', handleMouseMove)

  return <>{tooltip && tooltipElement}</>
}
