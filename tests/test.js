import webdriver from 'selenium-webdriver'
import mar from "../lib/index.js"
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
  mar(webdriver, driver, controllerName)

  after( () => {
    return driver.quit()
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
    driver
    .$apply({mustShow:true})
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
