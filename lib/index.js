export default class Mar{

  constructor(driver, controllerName) {
    this.driver = driver
    this.controllerName = controllerName
  }

  getScopeSelector() {
    return `[ng-controller="${this.controllerName}"]`
  }

  getScript(selector, obj) {
    let cname = this.controllerName
    let script = [
      `var scope = angular.element(document.querySelectorAll('${selector}'))`,
      `.scope();`,
      `scope.$apply(function() {`
    ]
    Object.keys(obj).map( (key) => {
      let str = JSON.stringify(obj[key])
      script.push(`scope['${key}'] = ${str};`)
      return key
    })
    script.push(`});`)
    return script.join('')
  }

  apply(obj){
    return new Promise( (res,rej) => {
      try {
        let selector = this.getScopeSelector()
        let script = this.getScript(selector, obj)
        this.driver.executeScript(script)
        .then( () => {
          res(null)
        })
      }catch(e){ 
        console.log(e)
        rej(e) 
      }
    })
  }
  
}
