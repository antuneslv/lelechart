import { useRef, useEffect } from 'react'
import { drawChart } from './drawChart'
import { resizeCanvas } from './resizeCanvas'
import { CfgType } from './sharedTypes'

export type { CfgType }

export function Chart(cfg: CfgType) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  let ctx = canvasRef.current?.getContext('2d') as CanvasRenderingContext2D

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
    ctx = canvasRef.current?.getContext('2d') as CanvasRenderingContext2D
    if (canvasRef.current) {
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
  }, [cfg])

  function generateChart(cfg: CfgType) {
    drawChart(canvasRef, ctx, cfg)
    cfg.responsive && resize()
  }

  function resize() {
    resizeCanvas(drawChart, canvasRef, ctx, cfg)
    window.addEventListener('resize', resize)
  }

  return <canvas ref={canvasRef} />
}
