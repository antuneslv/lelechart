import ReactDOM from 'react-dom/client'

import { Chart, CfgType } from '.'

const cfg: CfgType = {
  dimensions: {
    maxWidth: 800,
    maxHeight: 400,
    paddingX: 0,
  },
  data: [
    { x: '07:00', y: 1385 },
    { x: '07:30', y: 1410 },
    { x: '08:00', y: 1390 },
    { x: '08:30', y: 1407 },
    { x: '09:00', y: 1395 },
    { x: '09:30', y: 1402 },
    { x: '10:00', y: 1390 },
    { x: '10:30', y: 1400 },
    { x: '11:30', y: 1413 },
    { x: '12:00', y: 1399 },
  ],
  dataFormat: 'USD',
  lineWidth: 2,
  color: '#0e9cff',
  animation: {
    isEnable: true,
    speed: 4,
  },
  backgroundColor: '#fff',
  fill: {
    display: true,
    color: '#0e9cff33',
  },
  tooltip: {
    fontFamily: 'Arial',
    fontSize: '14px',
    color: '#1e1e1e',
    borderRadius: '8px',
    backgroundColor: '#1e1e1e33',
  },
  responsive: true,
  x: {
    label: {
      display: true,
      fontSize: '14px',
      fontFamily: 'Arial',
      color: '#1e1e1e',
      offset: 8,
    },
    grids: {
      display: true,
      color: '#1e1e1e80',
      lineWidth: 0.5,
    },
    ticks: {
      display: true,
      color: '#1e1e1e80',
      lineWidth: 0.5,
      length: 8,
    },
  },
  y: {
    label: {
      display: true,
      fontSize: '14px',
      fontFamily: 'Arial',
      color: '#1e1e1e',
      offset: 8,
    },
    grids: {
      display: true,
      color: '#1e1e1e80',
      lineWidth: 0.5,
    },
    ticks: {
      display: true,
      color: '#1e1e1e80',
      lineWidth: 0.5,
      length: 8,
    },
  },
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <div>
    <h1>LeleChart Test</h1>
    <div
      style={{ display: 'flex', justifyContent: 'center', marginTop: '200px' }}
    >
      <Chart {...cfg} />
    </div>
  </div>,
)
