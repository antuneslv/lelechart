import { useRef, useEffect, useState } from 'react'
import { aggregateCalculatedData } from './aggregateCalculatedData'
import { resizeCanvas } from './resizeCanvas'
import { CfgType, aggregateCalculatedDataType } from './sharedTypes'
import { Tooltip } from './components/Tooltip'
import { drawAnimatedLineChart } from './drawAnimatedLineChart'
import { drawLineChart } from './drawLineChart'

export function Chart(cfg: CfgType) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  let ctx = canvasRef.current?.getContext('2d') as CanvasRenderingContext2D
  const [aCData, setACData] = useState<aggregateCalculatedDataType | null>(null)

  if (
    typeof cfg.dimensions.maxWidth !== 'number' ||
    typeof cfg.dimensions.maxHeight !== 'number' ||
    typeof cfg.dimensions.paddingX !== 'number'
  ) {
    cfg.dimensions.maxWidth = 1200
    cfg.dimensions.maxHeight = 600
    cfg.dimensions.paddingX = 40
  }

  if (cfg.dimensions.paddingX < 0) cfg.dimensions.paddingX = 0

  if (cfg.dimensions.maxWidth - cfg.dimensions.paddingX < 300) {
    cfg.dimensions.maxWidth = 300
    cfg.dimensions.paddingX = 0
  }
  if (cfg.dimensions.maxHeight < 150) cfg.dimensions.maxHeight = 150

  const aspectRatio = cfg.dimensions.maxWidth / cfg.dimensions.maxHeight

  useEffect(() => {
    if (canvasRef.current) {
      ctx = canvasRef.current.getContext('2d') as CanvasRenderingContext2D
      if (innerWidth >= cfg.dimensions.maxWidth) {
        canvasRef.current.width =
          cfg.dimensions.maxWidth - cfg.dimensions.paddingX
        canvasRef.current.height = cfg.dimensions.maxHeight
      } else if (innerWidth - cfg.dimensions.paddingX < 300) {
        canvasRef.current.width = 300
        canvasRef.current.height =
          300 / aspectRatio < 150 ? 150 : 300 / aspectRatio
      } else if (innerHeight < 150) {
        canvasRef.current.height = 150
        canvasRef.current.width =
          150 * aspectRatio < 300 ? 300 : 150 * aspectRatio
      } else {
        canvasRef.current.width = innerWidth - cfg.dimensions.paddingX
        canvasRef.current.height = innerWidth / aspectRatio
      }
    }
    generateChart(cfg)
  }, [cfg, canvasRef.current?.width])

  function drawChart(
    canvasRef: React.RefObject<HTMLCanvasElement>,
    ctx: CanvasRenderingContext2D,
    aCData: aggregateCalculatedDataType,
    cfg: CfgType,
  ) {
    if (cfg.animation?.isEnable) {
      drawAnimatedLineChart(
        canvasRef,
        ctx,
        aCData.yLabelsFormatted,
        aCData.xCoordinates,
        aCData.chartFloorCoordinate,
        aCData.paddings,
        aCData.animationsCfg,
        aCData.drawCfg,
        aCData.elementsCfg,
      )
      return
    }
    drawLineChart(
      canvasRef,
      ctx,
      aCData.yLabelsFormatted,
      aCData.xCoordinates,
      aCData.yCoordinates,
      aCData.chartFloorCoordinate,
      aCData.paddings,
      aCData.drawCfg,
      aCData.elementsCfg,
    )
  }

  function generateChart(cfg: CfgType) {
    const aCData = aggregateCalculatedData(canvasRef, ctx, cfg)
    setACData(aCData)
    drawChart(canvasRef, ctx, aCData, cfg)
    cfg.responsive && resize()
  }

  function resize() {
    const aCData = aggregateCalculatedData(canvasRef, ctx, cfg)
    setACData(aCData)
    resizeCanvas(drawChart, canvasRef, ctx, cfg)
    window.addEventListener('resize', resize)
  }

  return (
    <div style={{ position: 'relative' }}>
      <canvas ref={canvasRef} />
      {aCData && (
        <Tooltip
          canvasRef={canvasRef}
          data={aCData.data}
          tooltipCfg={aCData.tooltip}
          xCoordinates={aCData.xCoordinates}
          yCoordinates={aCData.yCoordinates}
          dataFormat={aCData.dataFormat}
        />
      )}
    </div>
  )
}
