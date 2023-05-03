import { formatData } from '../formatData'
import { DataFormatType } from '../sharedTypes'

/**
 * Show tooltip when mouse over data point
 * @param canvasRef Canvas reference
 * @param data Array with data
 * @param xCoordinates X coordinates
 * @param yCoordinates Y coordinates
 * @param dataFormat Formatted data
 */
export function showTooltipOnData(
  canvasRef: React.RefObject<HTMLCanvasElement>,
  data: number[],
  xCoordinates: number[],
  yCoordinates: number[],
  dataFormat: DataFormatType,
) {
  let tooltip: HTMLElement | null = null

  const formattedData = formatData(data, dataFormat)

  canvasRef.current!.addEventListener('mousemove', event => {
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

    function showTooltip(x: number, y: number, content: string) {
      if (tooltip !== null) {
        removeTooltip(tooltip)
      }

      const tooltipElement = document.createElement('span')
      tooltipElement.className = 'tooltip'
      tooltipElement.style.position = 'absolute'
      tooltipElement.style.top = `${y - 16}px`
      tooltipElement.style.left = `${x + 16}px`
      tooltipElement.style.backgroundColor = '#1e1e1e33'
      tooltipElement.style.padding = '4px 8px'
      tooltipElement.style.borderRadius = '8px'
      tooltipElement.style.fontFamily = 'Arial'
      tooltipElement.style.fontSize = '14px'
      tooltipElement.textContent = content

      document.body.appendChild(tooltipElement)

      return tooltipElement
    }

    function removeTooltip(tooltip: HTMLElement) {
      tooltip.remove()
    }

    function removeTooltips() {
      const tooltips = document.querySelectorAll('.tooltip')
      tooltips.forEach(tooltip => {
        tooltip.remove()
      })
    }

    const pointIndex = getPointIndex(x, y, xCoordinates, yCoordinates)

    if (pointIndex === -1) {
      if (tooltip !== null) {
        removeTooltip(tooltip)
        tooltip = null
      }
    } else {
      const content = `${formattedData[pointIndex]}`
      if (tooltip === null) {
        removeTooltips()
        tooltip = showTooltip(event.pageX, event.pageY, content)
      }
    }
  })
}
