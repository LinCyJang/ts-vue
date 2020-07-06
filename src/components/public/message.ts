import Vue from 'vue'
import Main from './Message.vue'

export class MessageBox {
  public MessageConstructor: any
  public instance: any

  public create (options: any, typeClass: string, position: string) {
    this.MessageConstructor = Vue.extend(Main)
    options = options || {}
    if (typeof options === 'string') {
      options = {
        message: options,
        classType: typeClass,
        position: position
      }
    }
    this.instance = new this.MessageConstructor({
      data: options
    })
    this.instance.vm = this.instance.$mount()
    document.body.appendChild(this.instance.vm.$el)
    this.instance.vm.visible = true
    this.instance.dom = this.instance.vm.$el
    this.instance.dom.style.zIndex = 10000
  }
}

export class Message {
  public messageBox: any
  constructor () {
    this.messageBox = new MessageBox().create
  }

  public error (option: string, position: string) {
    this.messageBox(option, 'message--error', position)
  }

  public success (option: string, position: string) {
    this.messageBox(option, 'message--success', position)
  }
}
