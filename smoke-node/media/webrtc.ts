/*--------------------------------------------------------------------------

smoke-node

The MIT License (MIT)

Copyright (c) 2020 Haydn Paterson (sinclair) <haydn.developer@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

---------------------------------------------------------------------------*/

export class WebRTC {

  /** Generates a live MediaStream test pattern. */
  public static createTestPattern(): MediaStream {
    const canvas  = document.createElement('canvas')
    canvas.width  = 256
    canvas.height = 256
    const context = canvas.getContext('2d')!
    context.translate(128, 128)
    setInterval(() => {
      const r = Math.floor(Math.random() * 255)
      const g = Math.floor(Math.random() * 255)
      const b = Math.floor(Math.random() * 255)
      context.fillStyle = `#333`
      context.fillRect(-256, -256, 512, 512)
      context.fillStyle = `rgb(${r}, ${g}, ${b})`
      context.fillRect(-128, -64, 196, 32)
      context.fillStyle = `white`

      context.font = '30px Arial'
      context.fillText("smoke-node", -128, 10)
      context.font = '20px Arial'
      context.fillText(new Date().toString(), -128, 40)
      context.rotate(0.01)
    }, 10)
    const facade = canvas as any
    return facade['captureStream'](30)
  }
}