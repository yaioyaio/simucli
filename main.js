const commander = require("commander")
const fs = require("fs")
const _ = require("lodash")
const chalk = require("chalk")
const child_process = require("child_process")

const iosSelector = require("./lib/ios-selector")
const runIosList = require("./lib/run-ios-list")

var Progress = require("progress"),
  bar = new Progress("running [:bar] :percent :etas", {
    complete: "=",
    incomplete: " ",
    width: 100,
    total: 1
  })

const run = async deviceList => {
  let selector = await iosSelector.iosSelector(deviceList)
  let cmd = `xcrun instruments -w "${selector.device}"`
  let exe = child_process.exec(cmd)
}

commander
  .action(function() {
    bar.tick()

    let cmd =
      "xcrun simctl list | grep -Ev 'Unavailable|unavailable|com.apple.CoreSimulator|Watch:|Phone:|disconnected'"
    runIosList
      .runIosList(cmd)
      .then(data => {
        run(data)
      })
      .catch(err => console.log(err))
  })
  .parse(process.argv)
