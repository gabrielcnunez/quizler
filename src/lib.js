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

export const createPrompt = () => {
  // TODO implement createPrompt
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
