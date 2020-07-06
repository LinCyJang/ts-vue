import anime from 'animejs/lib/anime.min.js';

export class Particles {
  el: any
  defaults = {
    type: 'circle',
    style: 'fill',
    canvasPadding: 150,
    duration: 1500,
    easing: 'easeInOutCubic',
    direction: 'left',
    size: function () {
      return Math.floor((Math.random() * 3) + 1)
    },
    speed: function () {
      return Math.random() * 4 - 4 / 2
    },
    particlesAmountCoefficient: 3,
    oscillationCoefficient: 20
  }
  is = {
    arr: function (a: Array<number>) {
      return Array.isArray(a)
    },
    str: function (a: string) {
      return typeof a === 'string'
    },
    fnc: function (a: Function) {
      return typeof a === 'function'
    }
  }
  t = 'transform'
  transformString = (this.getCSSValue(document.body, this.t) ? this.t : '-webkit-' + this.t)
  options: {};
  particles: any;
  frame: any;
  canvas!: HTMLCanvasElement;
  ctx: any;
  wrapper!: HTMLDivElement | null;
  parentWrapper!: HTMLDivElement;
  o: any;
  disintegrating: any;
  lastProgress!: number;
  width: any;
  height: any;
  rect: any;

  constructor(element: any, options: {}) {
    this.el = this.getElement(element)
    this.options = this.extend({
      color: this.getCSSValue(this.el, 'background-color')
    }, this.defaults, options)
    this.init()
  }

  init() {
    this.particles = []
    this.frame = ''
    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d')
    this.canvas.className = 'particles-canvas'
    this.canvas.style = 'display:none;'
    this.wrapper = document.createElement('div')
    this.wrapper.className = 'particles-wrapper'
    this.el.parentNode.insertBefore(this.wrapper, this.el)
    this.wrapper.appendChild(this.el)
    this.parentWrapper = document.createElement('div')
    this.parentWrapper.className = 'particles'
    this.wrapper.parentNode.insertBefore(this.parentWrapper, this.wrapper)
    this.parentWrapper.appendChild(this.wrapper)
    this.parentWrapper.appendChild(this.canvas)
  }
  loop() {
    this.updateParticles()
    this.renderParticles()
    if (this.isAnimating()) {
      this.frame = requestAnimationFrame(this.loop.bind(this))
    }
  }
  updateParticles() {
    let p
    for (let i = 0; i < this.particles.length; i++) {
      p = this.particles[i]
      if (p.life > p.death) {
        this.particles.splice(i, 1)
      } else {
        p.x += p.speed
        p.y = this.o.oscillationCoefficient * Math.sin(p.counter * p.increase)
        p.life++
        p.counter += this.disintegrating ? 1 : -1
      }
    }
    if (!this.particles.length) {
      this.pause()
      this.canvas.style.display = 'none'
      if (this.is.fnc(this.o.complete)) {
        this.o.complete()
      }
    }
  }
  renderParticles() {
    this.ctx.clearRect(0, 0, this.width, this.height)
    let p
    for (let i = 0; i < this.particles.length; i++) {
      p = this.particles[i]
      if (p.life < p.death) {
        this.ctx.translate(p.startX, p.startY)
        this.ctx.rotate(p.angle * Math.PI / 180)
        this.ctx.globalAlpha = this.disintegrating ? 1 - p.life / p.death : p.life / p.death
        this.ctx.fillStyle = this.ctx.strokeStyle = this.o.color
        this.ctx.beginPath()

        if (this.o.type === 'circle') {
          this.ctx.arc(p.x, p.y, p.size, 0, 2 * Math.PI)
        } else if (this.o.type === 'triangle') {
          this.ctx.moveTo(p.x, p.y)
          this.ctx.lineTo(p.x + p.size, p.y + p.size)
          this.ctx.lineTo(p.x + p.size, p.y - p.size)
        } else if (this.o.type === 'rectangle') {
          this.ctx.rect(p.x, p.y, p.size, p.size)
        }

        if (this.o.style === 'fill') {
          this.ctx.fill()
        } else if (this.o.style === 'stroke') {
          this.ctx.closePath()
          this.ctx.stroke()
        }

        this.ctx.globalAlpha = 1
        this.ctx.rotate(-p.angle * Math.PI / 180)
        this.ctx.translate(-p.startX, -p.startY)
      }
    }
  }  
  play() {
    this.frame = requestAnimationFrame(this.loop.bind(this))
  }
  pause() {
    cancelAnimationFrame(this.frame)
    this.frame = ''
  }
  addParticle(options: { x: any; y: any }) {
    const frames = this.o.duration * 60 / 1000
    const speed = this.is.fnc(this.o.speed) ? this.o.speed() : this.o.speed
    this.particles.push({
      startX: options.x,
      startY: options.y,
      x: this.disintegrating ? 0 : speed * -frames,
      y: 0,
      angle: this.rand(360),
      counter: this.disintegrating ? 0 : frames,
      increase: Math.PI * 2 / 100,
      life: 0,
      death: this.disintegrating ? (frames - 20) + Math.random() * 40 : frames,
      speed: speed,
      size: this.is.fnc(this.o.size) ? this.o.size() : this.o.size
    })
  }

  addTransforms(value: number) {
    const translateProperty = this.isHorizontal() ? 'translateX' : 'translateY'
    const translateValue = this.o.direction === 'left' || this.o.direction === 'top' ? value : -value
    this.wrapper.style[(this.transformString)] = translateProperty + '(' + translateValue + '%)'
    this.el.style[this.transformString] = translateProperty + '(' + -translateValue + '%)'
  }

  disintegrate(options: any) {
    if (!this.isAnimating()) {
      this.disintegrating = true
      this.lastProgress = 0
      this.setup(options)
      this.animate((anim: { animatables: { target: { value: any } }[] }) => {
        const value = anim.animatables[0].target.value
        this.addTransforms(value)
        if (this.o.duration) {
          this.addParticles(this.rect, value / 100)
        }
      })
    }
  }
  integrate(options: any) {
    if (!this.isAnimating()) {
      this.disintegrating = false
      this.lastProgress = 1
      this.setup(options)
      this.animate((anim: { animatables: { target: { value: any } }[] }) => {
        const value = anim.animatables[0].target.value
        setTimeout(() => {
          this.addTransforms(value)
        }, this.o.duration)
        if (this.o.duration) {
          this.addParticles(this.rect, value / 100)
        }
      })
    }
  }
  setup(options: any) {
    this.o = this.extend({}, this.options, options)
    if (this.wrapper) this.wrapper.style.visibility = 'visible'
    if (this.o.duration) {
      this.rect = this.el.getBoundingClientRect()
      this.width = this.canvas.width = this.o.width || this.rect.width + this.o.canvasPadding * 2
      this.height = this.canvas.height = this.o.height || this.rect.height + this.o.canvasPadding * 2
    }
  }
  addParticles(rect: any, progress: number) {
    const progressDiff = this.disintegrating ? progress - this.lastProgress : this.lastProgress - progress
    this.lastProgress = progress
    let x = this.defaults.canvasPadding
    let y = this.defaults.canvasPadding
    const progressValue = (this.isHorizontal() ? rect.width : rect.height) * progress + progressDiff * (this.disintegrating ? 100 : 220)
    if (this.isHorizontal()) {
      x += this.o.direction === 'left' ? progressValue : rect.width - progressValue
    } else {
      y += this.o.direction === 'top' ? progressValue : rect.height - progressValue
    }
    let i = Math.floor(this.o.particlesAmountCoefficient * (progressDiff * 100 + 1))
    if (i > 0) {
      while (i--) {
        this.addParticle({
          x: x + (this.isHorizontal() ? 0 : rect.width * Math.random()),
          y: y + (this.isHorizontal() ? rect.height * Math.random() : 0)
        })
      }
    }
    if (!this.isAnimating()) {
      this.canvas.style.display = 'block'
      this.play()
    }
  }
  animate(update: any) {
    anime({
      targets: {
        value: this.disintegrating ? 0 : 100
      },
      value: this.disintegrating ? 100 : 0,
      duration: this.o.duration,
      easing: this.o.easing,
      begin: this.o.begin,
      update: update,
      complete:  () => {
        if (this.disintegrating) {
          if (this.wrapper) this.wrapper.style.visibility = 'hidden'
        }
      }
    })
  }
  isAnimating() {
    return !!this.frame
  }
  isHorizontal() {
    return this.o.direction === 'left' || this.o.direction === 'right'
  }
  stringToHyphens(str: string) {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
  }
  getCSSValue(el: any, prop: string) {
    if (prop in el.style) {
      return getComputedStyle(el).getPropertyValue(this.stringToHyphens(prop)) || '0'
    }
  }
  extendSingle(target: { [x: string]: object }, source: { [x: string]: object }) {
    for (const key in source) {
      target[key] = this.is.arr(source[key]) ? source[key].slice(0) : source[key]
    }
    return target
  }
  extend(...target: any) {
    if (!target) target = {}
    for (let i = 1; i < 3; i++) {
      this.extendSingle(target, target[i])
    }
    return target
  }
  rand(value: number) {
    return Math.random() * value - value / 2
  }
  getElement(element: string) {
    return this.is.str(element) ? document.querySelector(element) : element
  }
}
