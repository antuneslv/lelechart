# LeleChart

<br/>

LeleChart is a React chart library that enables you to create custom charts for your applications.

<br/>

## Quick Start

<br/>

```sh
npm i lelechart
```

<br/>

## Initial setup

```js
import { Chart, CfgType } from 'lelechart'
```

<br/>

Create a variable with the configurations.

```js
 const cfg: CfgType = {
  dimensions: {
    maxWidth: 1200, // maxWidth: number
    maxHeight: 600, // maxHeight: number
    paddingX: 40, // paddingX: number
  },
  data: [
    { x: 'AA/AA/AA', y: 5 }, // { x?: string | number; y: number }
    { x: 'BB/BB/BB', y: 6 },
    { x: 'CC/CC/CC', y: 9 },
    { x: 'DD/DD/DD', y: 14 },
    { x: 'EE/EE/EE', y: 6 },
    { x: 'FF/FF/FF', y: 11 },
    { x: 'GG/GG/GG', y: 7 },
    { x: 'HH/HH/HH', y: 8 },
    { x: 'II/II/II', y: 9 },
    { x: 'JJ/JJ/JJ', y: 19 },
  ],
  dataFormat: '', // dataFormat?: 'US' | 'BR' | '%' | 'º' | ''
  lineWidth: 2, // lineWidth?: number
  color: '#0e9cff', // color?: string
  animation: { // optional
    isEnable: true, // isEnable: boolean
    speed: 4, // speed: number - min 1 max 10
  },
  backgroundColor: '#fff', // backgroundColor?: string
  fill: { // optional
    display: true, // display: boolean
    color: '#0e9cff33', // color: string
  },
  responsive: true, // responsive?: boolean
  x: { // optional
    label: { // optional
      display: true, // display: boolean
      fontSize: '14px', // fontSize?: string
      fontFamily: 'Arial', // fontFamily?: string
      color: '#1e1e1e', // color?: string
      offset: 8, // offset?: number
    },
    grids: { // optional
      display: true, // display: boolean
      color: '#1e1e1e80', // color?: string
      lineWidth: 0.5, // lineWidth?: number
    },
    ticks: { // optional
      display: true, // display: boolean
      color: '#1e1e1e80', // color?: string
      lineWidth: 0.5, // lineWidth?: number
      length: 8, // length?: number
    },
  },
  y: { // optional
    label: { // optional
      display: true, // display: boolean
      fontSize: '14px', // fontSize?: string
      fontFamily: 'Arial', // fontFamily?: string
      color: '#1e1e1e', // color?: string
      offset: 8, // offset?: number
    },
    grids: { // optional
      display: true, // display: boolean
      color: '#1e1e1e80', // color?: string
      lineWidth: 0.5, // lineWidth?: number
    },
    ticks: { // optional
      display: true, // display: boolean
      color: '#1e1e1e80', // color?: string
      lineWidth: 0.5, // lineWidth?: number
      length: 8, // length?: number
    },
  },
}
```

Call the component passing the configurations.

```js
<Chart {...cfg}/>
```
