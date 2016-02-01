import webdriver from 'selenium-webdriver'
import Mar from "../lib/index.js"
import chai from 'chai'
import express from 'express'
import path from 'path'

let app = express()
app.use(express.static(process.cwd()))
app.get("/", (req, res) => {
  res.sendFile(path.join(process.cwd(), 'tests', 'index.html'))
})
app.listen(5000)

let should = chai.should(), expect = chai.expect
let controllerName = "MarController"

describe("Test ", () => {
  
  let By = webdriver.By, until = webdriver.until
  let driver = new webdriver.Builder()
    .withCapabilities(webdriver.Capabilities.chrome())
    .build()
  let mar = new Mar(driver, controllerName)


  after( () => {
    return driver.quit()
  })

  it("Test getScopeSelector", (done) => {
    let mar = new Mar(driver, controllerName)
    let selector = mar.getScopeSelector()
    selector.should.not.equal(null)
    selector.should.not.equal(undefined)
    expect(selector).to.be.a("string")
    expect(selector).to.match(/\[ng\-controller\=\"[\w\d\-]+\"\]/)
    done()
  })

  it("Test getExecpScript", (done) => {
    let mar = new Mar(driver, controllerName)
    let selector = mar.getScopeSelector()
    let obj = {q:"query"}
    let script = mar.getScript(selector, obj)
    script.should.not.equal(null)
    script.should.not.equal(undefined)
    expect(script).to.be.a("string")
    done()
    // expect(script).to.match(new RegExp(`^var scope \= angular\.element(document\.querySelectorAll(\'${selector}'))\.scope\;.+`))
  })
  
  it("Test using Mar", (done) => {
    driver
    .get("http://localhost:5000")
    driver
    .findElement(By.id("sopa"))
    .isDisplayed()
    .then( (is) => {
      is.should.equal(true)
    })
    driver
    .findElement(By.id("show"))
    .isDisplayed()
    .then( (is) => {
      is.should.equal(false)
    })

    // make mar to extend webdriver prototype
    mar.apply({mustShow:true})
    .then( () => {
      driver
        .findElement(By.id("sopa"))
        .isDisplayed()
        .then( (is) => {
        is.should.equal(false)
      })
      driver
        .findElement(By.id("show"))
        .isDisplayed()
        .then( (is) => {
        is.should.equal(true)
        done()
      })
    })
    
  })


})
