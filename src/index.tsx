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

  const aspectRatio = cfg.dimensions.maxWidth / cfg.dimensions.maxHeight

  let debounceTimeout: number

  useEffect(() => {
    ctx = canvasRef.current?.getContext('2d') as CanvasRenderingContext2D
    if (canvasRef.current) {
      if (innerWidth >= cfg.dimensions.maxWidth) {
        canvasRef.current.width =
          cfg.dimensions.maxWidth - cfg.dimensions.paddingX
        canvasRef.current.height = cfg.dimensions.maxHeight
      } else {
        canvasRef.current.width = innerWidth - cfg.dimensions.paddingX
        canvasRef.current.height = innerWidth / aspectRatio
      }
    }
    generateChart(cfg)
  }, [cfg])

  function generateChart(cfg: CfgType) {
    drawChart(canvasRef, ctx, cfg)
    cfg.responsive && debouncedResize()
  }

  function debouncedResize() {
    if (!cfg.responsive) {
      window.removeEventListener('resize', debouncedResize)
      return
    }

    clearTimeout(debounceTimeout)

    debounceTimeout = setTimeout(
      () => resizeCanvas(drawChart, canvasRef, ctx, cfg),
      100,
    )

    window.addEventListener('resize', debouncedResize)
  }

  return <canvas ref={canvasRef} />
}
