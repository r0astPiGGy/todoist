import { Guid } from "js-guid"
import { allSeverities } from "./App"

export const mapIdToSeverity = (id) => allSeverities.find((s) => s.id === id)

export const getSeveritiesFromTodos = (todos) => [
  ...new Set(todos.map((t) => t.severity.id)),
]

export const filterAbsentSeverities = (
  availableSeverities,
  severitiesToFilter
) => severitiesToFilter.filter((s) => availableSeverities.includes(s))

const createRandomTodo = (_, i) => ({
  id: Guid.newGuid(),
  name: `${i} todo`,
  description: `${i} description`,
  done: false,
  date: new Date(),
  severity: allSeverities[0],
})

export const generateTodos = (amount = 1000) =>
  Array.from({ length: amount }).map(createRandomTodo)
