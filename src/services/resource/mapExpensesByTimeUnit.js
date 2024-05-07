import dayjs from "dayjs"
import isBetween from "dayjs/plugin/isBetween"
import quarterOfYear from "dayjs/plugin/quarterOfYear"
import weekOfYear from "dayjs/plugin/weekOfYear"

// Day.js plugins
dayjs.extend(isBetween)
dayjs.extend(quarterOfYear)
dayjs.extend(weekOfYear)

// Take a date and the type of timescale it will be displayed on
// Return the timescale relative value
const getTimeUnit = (date, timeUnit) => {
    switch (timeUnit) {
      case 'week':
        return date.day()
      case 'month':
        // Days in month, unlike other units, are 1 indexed
        return date.date() - 1
      case 'quarter':
        return date.week()
      case 'year':
        return date.month()
    }
}

const getEndOfUnit = (date, timeUnit) => {
  switch (timeUnit) {
    case 'week':
      // 7 days in a week, 0 indexed
      return 6
    case 'month':
      // Subtract 1 for 0 indexation
      return date.daysInMonth() - 1
    case 'quarter':
      return date.endOf(timeUnit).week()
    case 'year':
      // 12 months in a year, 0 indexed
      return 11
  }
}

const getDefaultOfUnit = (date, timeUnit, timeValue) => {
  let unitDefault

  switch (timeUnit) {
    case 'week':
      unitDefault = date.day(timeValue)
      break;
    case 'month':
      // timeValue comes as a 0 indexed day of the month, while date method expects 1 indexed
      unitDefault = date.date(timeValue + 1)
      break;
    case 'quarter':
      unitDefault = date.week(timeValue)
      break;
    case 'year':
      unitDefault = date.month(timeValue)
      break;
  }

  return unitDefault.startOf('day').valueOf()
}

export const mapExpensesByTimeUnit = (userExpenses, date, timeUnit) => {
  const startOfRange = date.startOf(timeUnit)
  const endOfRange = date.endOf(timeUnit)

  // Initialize loop iterator with first week of quarter, otherwise 0
  const startOfUnit = timeUnit === "quarter" ? startOfRange.week() : 0
  const endOfUnit = getEndOfUnit(date, timeUnit)
  
  const mappedExpenses = []

  for (let i = startOfUnit; i <= endOfUnit; i++) {
    const filterByUnit = userExpenses.filter(({ x }) => {
      const convertedDate = dayjs(x)

      return convertedDate.isBetween(startOfRange, endOfRange) && getTimeUnit(convertedDate, timeUnit) === i
    })
    
    const sumExpenses = filterByUnit.reduce((accumulator, currentExpense) => ({
      x: currentExpense.x,
      y: accumulator.y + currentExpense.y
    }),
    // Initial value in case of empty array
    {
      x: getDefaultOfUnit(date, timeUnit, i),
      y: 0
    })

    mappedExpenses.push(sumExpenses)
  }

  return mappedExpenses
}