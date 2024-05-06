import dayjs from "dayjs"
import { useState } from "react"
import isBetween from "dayjs/plugin/isBetween"
import duration from "dayjs/plugin/duration"
import quarterOfYear from "dayjs/plugin/quarterOfYear"


export default function LineChart({ userExpenses }) {
  const [range, setRange] = useState('month')

  // Day.js plugins
  dayjs.extend(isBetween)
  dayjs.extend(duration)
  dayjs.extend(quarterOfYear)

  const startOfRange = dayjs().startOf(range)
  const endOfRange = daysjs().endOf(range)

  const mapWeekExpenses = () => {
    const mappedExpenses = []

    for (let i = 0; i <= 6; i++) {
      const filterByDay = userExpenses.filter(({ expenseDate }) => expenseDate.isBetween(startOfRange, endOfRange) && expenseDate.day() === i)
      const sumExpenses = filterByDay.reduce((accumulator, currentExpense) => accumulator + currentExpense.expenseSum, 0)

      mappedExpenses.push(sumExpenses)
    }

    return mappedExpenses
  }

  const mapMonthExpenses = () => {
    const daysInMonth = dayjs().daysInMonth()
    const mappedExpenses = []

    for (let i = 0; i < daysInMonth; i++) {
      const filterByDay = userExpenses.filter(({ expenseDate }) => expenseDate.isBetween(startOfRange, endOfRange) && expenseDate.date() - 1 === i)
      const sumExpenses = filterByDay.reduce((accumulator, currentExpense) => accumulator + currentExpense.expenseSum, 0)

      mappedExpenses.push(sumExpenses)
    }

    return mappedExpenses
  }

  const mapQuarterExpenses = () => {
    const mappedExpenses = []

    for (let i = startOfRange.week(); i <= endOfRange.week(); i++) {
      const filterByWeek = userExpenses.filter(({ expenseDate }) => expenseDate.isBetween(startOfRange, endOfRange) && expenseDate.week() === i)
      const sumExpenses = filterByWeek.reduce((accumulator, currentExpense) => accumulator + currentExpense.expenseSum, 0)

      mappedExpenses.push(sumExpenses)
    }

    return mappedExpenses
  }

  const mapYearExpenses = () => {
    const mappedExpenses = []

    for (let i = 0; i <= 11; i++) {
      const filterByMonth = userExpenses.filter(({ expenseDate }) => expenseDate.isBetween(startOfRange, endOfRange) && expenseDate.month() === i)
      const sumExpenses = filterByMonth.reduce((accumulator, currentExpense) => accumulator + currentExpense.expenseSum, 0)

      mappedExpenses.push(sumExpenses)
    }

    return mappedExpenses
  }

  const getMappedExpenses = () => {
    switch (range) {
      case 'week':
        return mapWeekExpenses()
      case 'month':
        return mapMonthExpenses()
      case 'quarter':
        return mapQuarterExpenses()
      case 'year':
        return mapYearExpenses()
    }
  }

  const options = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: range
        }
      }
    }
  }

  return (
    <>

    </>
  )
}