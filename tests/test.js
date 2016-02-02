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
const controllerName = "MarController"

describe("Test ", () => {
  
  let By = webdriver.By, until = webdriver.until
  let driver = new webdriver.Builder()
    .withCapabilities(webdriver.Capabilities.chrome())
    .build()
  
  after( () => {
    return driver.quit()
  })

  it("Test $apply method is added to the driver", (done) => {
    expect(driver.$apply).to.equal(undefined)
    mar(webdriver, driver, controllerName)
    driver.$apply.should.not.equal(undefined)
    done()
  })

  it("Test using Mar", (done) => {
    mar(webdriver, driver, controllerName)
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
      })
    })
    let user = {id:1, name:"vruno", email:"some@email.com", dogs: ["kurt", "filo", "yoko", "isaac"]}
    driver.$apply({user:user})
    .then( () => {
      driver
      .findElement(By.id("user-id"))
      .then( (el) => {
        el.getText()
        .then( (val) => {
          val.should.equal(user.id.toString())
        })
      })
      driver
      .findElement(By.id("user-name"))
      .then( (el) => {
        el.getText()
        .then( (val) => {
          val.should.equal(user.name)
        })
      })
      driver
      .findElement(By.id("user-email"))
      .then( (el) => {
        el.getText()
        .then( (val) => {
          val.should.equal(user.email)
        })
      })
      let len = user.dogs.length, last = len-1
      for(let i=0; i<len;i++) {
        let dog = user.dogs[i]
        driver
        .findElement(By.className(`dog-${i}`))
        .then( (el) => {
          el.getText()
          .then( (val) => {
            val.should.equal(dog)
            if(i==last) done()
          })
        })
      }
    })
  })
})
