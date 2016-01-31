
export default class Mar{

  constructor(doc, controllerName) {
    this.document = doc
    this.controllerName = controllerName
    this.scope
    console.log(doc)
  }

  getScope() {
    if(!this.scope) 
      this.scope = this.document.querySelectorAll(`[ng-controller="${this.controllerName}"]`)[0]
    return this.scope
  }

  apply(obj){
    return new Promise( (res,rej) => {
      try {
        let scope = this.getScope()
        scope.$apply( () => {
          Object.keys(obj).map( (key) => {
            scope[key] = obj[key]
            return key
          })
          res(null)
        }) 
      }catch(e){ 
        console.log(e)
        rej(e) 
      }
    })
  }
  
}
