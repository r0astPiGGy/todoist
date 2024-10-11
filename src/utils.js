import { Guid } from "js-guid"
import { allSeverities } from "./App"
import { Chance } from "chance"

const chance = new Chance()

export const mapIdToSeverity = (id) => allSeverities.find((s) => s.id === id)

export const getSeveritiesFromTodos = (todos) => [
  ...new Set(todos.map((t) => t.severity.id)),
]

export const filterAbsentSeverities = (
  availableSeverities,
  severitiesToFilter
) => severitiesToFilter.filter((s) => availableSeverities.includes(s))

const sentenceOf = ({ minWords, maxWords }) =>
chance.sentence({ words: chance.integer({ min: minWords, max: maxWords }) })

const randomIn = (array) =>
  array[chance.integer({ min: 0, max: array.length - 1 })]

const createRandomTodo = (_, i) => ({
  id: Guid.newGuid(),
  name: sentenceOf({ minWords: 3, maxWords: 7 }),
  description: sentenceOf({ minWords: 10, maxWords: 15 }),
  done: chance.bool(),
  date: new Date(),
  severity: randomIn(allSeverities),
})

export const generateTodos = (amount = 5000) =>
  Array.from({ length: amount }).map(createRandomTodo)
