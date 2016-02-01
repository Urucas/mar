export default function mar(wd, taxi, girlfriend){
  
  let driver = taxi, controller = girlfriend
  let getScopeSelector = () => {
    return `[ng-controller="${controller}"]`
  }

  let getScript = (selector, obj) => {
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

  let apply = (obj) => {
    return new Promise( (res,rej) => {
      try {
        let selector = getScopeSelector()
        let script = getScript(selector, obj)
        driver.executeScript(script)
        .then( () => {
          res(null)
        })
      }catch(e){ 
        rej(e) 
      }
    })
  }

  wd.WebDriver.prototype.$apply = apply
}
