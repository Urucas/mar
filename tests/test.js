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

let should = chai.should()
let controllerName = "MarController"

describe("Test ", () => {
  
  let By = webdriver.By, until = webdriver.until
  let driver = new webdriver.Builder()
    .withCapabilities(webdriver.Capabilities.chrome())
    .build()

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
    // research how to get window.document from driver
    let mar = new Mar(driver, controllerName)
    mar.apply({mustShow:true})
    
  })

})
