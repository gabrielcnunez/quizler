import jsv from 'jsverify'
import _ from 'underscore'

import { chooseRandom, createPrompt, createQuestions } from '../src/lib'

describe('chooseRandom', () => {
  it('Should return an array', () => {
    jsv.assertForall('array nat', arr => {
      return Array.isArray(chooseRandom(arr))
    })
  })
  it('Should not mutate the array', () => {
    jsv.assertForall('array nat', arr => {
      const arrBefore = arr
      chooseRandom(arr)
      return arrBefore.length === arr.length && arrBefore.every((val, index) => val === arr[index])
    })
  })
  it('Should return an array of the given numItems length (if provided)', () => {
    jsv.assertForall('array nat', arr => {
      if (arr.length === 0 || arr.length === 1) {
        // Here the numItems value given to chooseRandom is irrelevent as
        // an array of length 0 or 1 should just return the given array
        // with no possibility of randomization.
        const test1 = chooseRandom(arr, 948672894968)
        const test2 = chooseRandom(arr, 0)
        const test3 = chooseRandom(arr)
        return (arr.length === test1.length) && (arr.length === test2.length) && (arr.length === test3.length) && (arr.every((val, index) => val === test1[index] && val === test2[index] && val === test3[index]))
      }
      const random = chooseRandom(arr, 2)
      return random.length === 2
    })
  })
})

describe('createPrompt', () => {
  const options = { tests: 1 }
  it('Should return an array even if passed in undefined or no object', () => {
    jsv.assert(() => Array.isArray(createPrompt()), options)
    jsv.assert(() => Array.isArray(createPrompt({})), options)
    jsv.assert(() => Array.isArray(createPrompt(undefined)), options)
  })
  it('Should always have at least one question and two choices with it', () => {
    jsv.assert(() => createPrompt().length === 3, options)
    jsv.assert(() => createPrompt({}).length === 3, options)
    jsv.assert(() => createPrompt(undefined).length === 3, options)
  })
  it('Should default to 1 question and 2 choices', () => {
    const prompts = [
      {
        type: 'input',
        name: 'question-1',
        message: 'Enter question 1'
      },
      {
        type: 'input',
        name: 'question-1-choice-1',
        message: 'Enter answer choice 1 for question 1'
      },
      {
        type: 'input',
        name: 'question-1-choice-2',
        message: 'Enter answer choice 2 for question 1'
      }
    ]
    jsv.assert(() => {
      return (
        _.isEqual(createPrompt(), prompts) &&
        _.isEqual(createPrompt({}), prompts) &&
        _.isEqual(createPrompt(undefined), prompts)
      )
    }, options)
  })
  it('Should always return an array of length numQuestions + (numQuestions * numChoices)', () =>
    jsv.assertForall(
      '{ numQuestions: nat; numChoices: nat }',
      r =>
        createPrompt(r).length ===
        r.numQuestions + r.numQuestions * r.numChoices
    ))
})

describe('createQuestions', () => {
  const options = { tests: 1 }
  it('Should return an array even if passed in undefined or no object', () => {
    jsv.assert(() => Array.isArray(createQuestions()), options)
    jsv.assert(() => Array.isArray(createQuestions({})), options)
    jsv.assert(() => Array.isArray(createQuestions(undefined)), options)
  })
  it('Should return an empty array if no object is provided', () => {
    jsv.assert(() => createQuestions().length === 0, options)
    jsv.assert(() => createQuestions({}).length === 0, options)
    jsv.assert(() => createQuestions(undefined).length === 0, options)
  })
  it('Should return question objects with their corresponding question and choices', () =>
    jsv.assertForall(
      jsv.record({
        'question-1': jsv.string,
        'question-1-choice-1': jsv.string,
        'question-1-choice-2': jsv.string,
        'question-2': jsv.string,
        'question-2-choice-1': jsv.string,
        'question-2-choice-2': jsv.string
      }),
      r =>
        _.isEqual(createQuestions(r), [
          {
            type: 'list',
            name: 'question-1',
            message: r['question-1'],
            choices: [r['question-1-choice-1'], r['question-1-choice-2']]
          },
          {
            type: 'list',
            name: 'question-2',
            message: r['question-2'],
            choices: [r['question-2-choice-1'], r['question-2-choice-2']]
          }
        ])
    ))
})
