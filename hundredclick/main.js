class Clicker{
    constructor(clockElement, clickElement, options={}){
        this.timer = 0
        this.clicks = 0
        this.now = Date.now()
        this.started = false
        this.clockElement = clockElement
        this.clickElement = clickElement
        this.options = options
        this.options?.initOptions ? this.options.initOptions(this) : 0
        this.clockElement.innerText = "0.00"
        this.clickElement.innerText = "0"
        this.updateInterval = false
    }
    start(){
        this.now = Date.now()
        this.updateInterval = setInterval(() => this.update(), 10)
        this.started = true
    }
    stop(){
        clearInterval(this.updateInterval)
        this.clicks = 0
        this.clockElement.innerText = "0.00"
        this.clickElement.innerText = "0"
    }
    update(){
        this.timer += Date.now() - this.now
        this.now = Date.now()
        this.clockElement.innerText = String((this.timer/1000).toFixed(2)).padStart(2, '0')
        this.clickElement.innerText = this.clicks
        this.options?.updateEvent ? this.options.updateEvent(this) : 0
    }
    click(){
        this.clicks += 1
        if(this.clicks == 100){
            clearInterval(this.updateInterval)
            this.update()
            this.win()
            return 0
        }
        if(this.clicks > 100){
            return 1
        }
        this.options?.clickEvent ? this.options.clickEvent(this) : 0
    }
    getCPS(){
        return this.clicks / this.timer
    }
    isRunning(){
        return this.started
    }
    win(){
        clearInterval(this.updateInterval)
        this.timer += Date.now() - this.now
    }
}

let options = {
    initOptions: (object) => {
        object.fontSize = 16
        object.clickElement.style.fontSize = object.fontSize + "px"
    },
    clickEvent: (object) => {
        object.clickElement.style.fontSize = "35px"
        object.fontSize = 35
    },
    updateEvent: (object) => {
        if(object.fontSize > 16){
            object.fontSize--
            object.clickElement.style.fontSize = object.fontSize + "px"
        }
    }
}
let clockElement = document.getElementById('time')
let clickElement = document.getElementById('clicks')
let currentTest = new Clicker(clockElement, clickElement, options)
currentTest.update()

document.addEventListener('keydown', () => {
    if(currentTest.isRunning()){
        currentTest.stop()
        currentTest = new Clicker(clockElement, clickElement, options)
    }
})
document.addEventListener('contextmenu', e => {
    e.preventDefault()
})

document.addEventListener('click', () => {
    if(!currentTest.isRunning()){
        currentTest.start()
    }
    currentTest.click()
})
