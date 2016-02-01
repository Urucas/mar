# mar
Extend **Se**lenium Webdriver to use with **A**ngular apps.

#Install 
```bash
npm install --save-dev marjs
```

#Usage
Let's say you have a simple angular app that hides or shows an ```<h1>``` element 
```html
<!doctype html>
<html lang="en" ng-app="MarApp">
<head>
  <meta charset="utf-8">
</head>
<body ng-controller="MarController">
  <div ng-show="mustShow">
    <h1 id="show">Show must go on!</h1>
  </div>
  <script src="./tests/angular/angular.min.js"></script>
  <script src="./tests/controller.js"></script>
</body>
</html>
```
And your angular app is simple as;
```javascript
angular.module("MarApp", [])
.controller("MarController", ["$scope", function($scope){
  $scope.mustShow = false
}])
```

Here's an example on how to test this angular app changes with selenium using mar
```javascript
import webdriver from 'selenium-webdriver'
import chai from 'chai'
import mar from 'marjs'
const controllerName = "MarController"
let should = chai.should()
describe("Testing angular scope changes with mar", () => {
  
  let By = webdriver.By, until = webdriver.until
  let driver = new webdriver.Builder()
    .withCapabilities(webdriver.Capabilities.chrome())
    .build()
  mar(webdriver, driver, controllerName)

  after( () => {
    return driver.quit()
  })

  it("Test that changing scope bar mustShow, change UI", (done) => {
    // assuming you are running a server in the port 5000
    driver
    .get("http://localhost:5000")
    // when the app starts the <h1> tab should be hidden, since in our scope the mustShow var is false
    driver
    .findElement(By.id("show"))
    .isDisplayed()
    .then( (is) => {
      is.should.equal(false)
    })
    // now we'll apply a change on the angular scope, and test that the <h1> is showing
    driver
    .$apply({mustShow:true})
    .then( () => {
      driver
      .findElement(By.id("show")
      .then( (el) => {
        el
        .isDisplayed()
        .then( (is) => {
          is.should.equal(true)
        })
      })
    })
  })
})
```
The full example is on [test.js](https://github.com/Urucas/mar/blob/master/tests/test.js) file.

Opinions and help are welcome. 
