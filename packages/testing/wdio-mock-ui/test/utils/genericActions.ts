// import allure from '@wdio/allure-reporter';
import { assert, expect } from 'chai'
import fs from 'fs'
import moment from 'moment'

export async function checkSizeOfList(locator, expectedSize) {
  const expSize = expectedSize
  const elemArray = await browser.$$(locator)
  console.log('Funds in list: ' + elemArray.length)
  assert.equal(elemArray.length, expSize)
  console.log('List has ' + expSize + ' elements')
}

export function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max))
}

export function getCustomDate(stringLimit) {
  switch (stringLimit) {
    case 'second':
      stringLimit = 20
      break
    case 'minute':
      stringLimit = 18
      break
    case 'day':
      stringLimit = 13
      break
  }

  var customDate = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000)
    .toISOString()
    .slice(0, stringLimit)
  customDate = customDate.replace(/-/g, '')
  customDate = customDate.replace(/:/g, '')
  customDate = customDate.replace(/T/g, '_')
  customDate = customDate.slice(0, stringLimit - 5)
  console.log('Custom date: ' + customDate)
  return customDate
}
export async function checkTextContains(elem: () => any, expectedValue: string) {
  expect(await (await elem()).waitForDisplayed()).to.be.true
  const text = await (await elem()).getText()
  console.info('Text: ', text)
  return expect(text).to.contain(expectedValue, 'Match not found')
}
export async function checkTextEquals(elem: () => any, expectedValue: string) {
  expect(await (await elem()).waitForDisplayed()).to.be.true
  const text = await (await elem()).getText()
  console.info('Text: ', text)
  return expect(text).to.equal(expectedValue, 'Match not found')
}

export async function checkTitle(elem: () => any, expectedValue: string) {
  expect(await (await elem()).waitForClickable()).to.be.true
  const title = await (await elem()).getAttribute('title')
  console.info('Title: ', title)
  return expect(title).to.equal(expectedValue, 'Match not found')
}

export function scrollToElement(elem) {
  console.log('Value: ' + elem)
  browser.execute(async function () {
    return document.querySelector(elem).scrollIntoView()
  })
}

export function takeScreenshot(name, failure = false) {
  const stamp = moment().format('YYYYMMDD_THmmss')
  if (!name) name = stamp
  const path = 'output'
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true })
  }

  if (failure) {
    name = name + '_fail'
  }
  name = stamp + name.replace(/ /g, '_') + '.png'
  browser.saveScreenshot(path + name)
  const data = fs.readFileSync(`${path}/${name}`)
  // allure.addAttachment(name, data, 'image/png');
}
