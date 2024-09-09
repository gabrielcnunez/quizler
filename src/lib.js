import fs from 'fs'

export const chooseRandom = (array = [], numItems) => {
  if (array.length <= 1) {
    return array
  }
  if (!numItems || numItems < 1 || numItems > array.length) {
    numItems = Math.floor(Math.random() * array.length + 1)
  }
  const usedIndices = new Set();

  return [...Array(numItems)].map(() => {
    let randomInd
    do {
      randomInd = Math.floor(Math.random() * array.length)
    } while (usedIndices.has(randomInd))
    usedIndices.add(randomInd)

    return array[randomInd]
  })
}

export const createPrompt = ({ numQuestions = 1, numChoices = 2 } = {}) => {
  const prompts = [];

  for (let i = 1; i <= numQuestions; i++) {
    prompts.push({
      type: 'input',
      name: `question-${i}`,
      message: `Enter question ${i}`,
    });

    for (let j = 1; j <= numChoices; j++) {
      prompts.push({
        type: 'input',
        name: `question-${i}-choice-${j}`,
        message: `Enter answer choice ${j} for question ${i}`,
      });
    }
  }

  return prompts;
}

export const createQuestions = () => {
  // TODO implement createQuestions
}

export const readFile = path =>
  new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => (err ? reject(err) : resolve(data)))
  })

export const writeFile = (path, data) =>
  new Promise((resolve, reject) => {
    fs.writeFile(path, data, err =>
      err ? reject(err) : resolve('File saved successfully')
    )
  })
