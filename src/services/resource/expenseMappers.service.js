import dayjs from "dayjs"
import isBetween from "dayjs/plugin/isBetween"
import quarterOfYear from "dayjs/plugin/quarterOfYear"
import weekOfYear from "dayjs/plugin/weekOfYear"

// Day.js plugins
dayjs.extend(isBetween)
dayjs.extend(quarterOfYear)
dayjs.extend(weekOfYear)

const getTimeSubUnit = (timeUnit) => {
  switch (timeUnit) {
    case 'week':
      return 'day'
    case 'month':
      return 'day'
    case 'quarter':
      return 'week'
    case 'year':
      return 'month'
  }
}

// Take a date and the type of timescale it will be displayed on
// Return the timescale relative value
const getComparisonDate = (date, timeUnit, timeValue) => {
    switch (timeUnit) {
      case 'week':
        return date.day(timeValue)
      case 'month':
        // Days in month, unlike other units, are 1 indexed
        return date.date(timeValue + 1)
      case 'quarter':
        return date.week(timeValue)
      case 'year':
        return date.month(timeValue)
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
// Returns an array of expenses within the provided date's time unit
export const mapExpenseTotalsLinearly = (options) => {
  const {
    userExpenses,
    date,
    timeUnit,
    requiredSubUnit,
    constant,
    constantProperty,
    sumProperty 
  } = options

  const startOfRange = date.startOf(timeUnit)

  // Initialize loop iterator with first week of quarter, otherwise 0
  const startOfUnit = timeUnit === "quarter" ? startOfRange.week() : 0
  const endOfUnit = getEndOfUnit(date, timeUnit)
  
  const mappedExpenses = []

  // For every day/week/month (range dependent) filter expenses to match said unit,
  // and add together filtered expense sums
  for (let i = startOfUnit; i <= endOfUnit; i++) {
    const filterByRange = userExpenses.filter(({ expenseDate }) => {
      const convertedDate = dayjs(Number(expenseDate))
      const comparisonUnit = requiredSubUnit ? getTimeSubUnit(timeUnit) : timeUnit
      const comparisonDate = getComparisonDate(date, timeUnit, i)

      return convertedDate.isSame(comparisonDate, comparisonUnit)
    })
    
    const sumExpenses = filterByRange.reduce((accumulator, currentExpense) => ({
      ...currentExpense,
      [constantProperty]: accumulator[constantProperty],
      [sumProperty]: accumulator[sumProperty] + Number(currentExpense.expenseSum)
    }),
    // Initial value in case of empty array
    {
      ...constant,
      [constantProperty]: getDefaultOfUnit(date, timeUnit, i),
      [sumProperty]: 0
    })

    mappedExpenses.push(sumExpenses)
  }
  return mappedExpenses
}

export const mapExpenseTotalsByCategory = (userExpenses, date, timeUnit) => {
  const startOfRange = date.startOf(timeUnit)
  const endOfRange = date.endOf(timeUnit)

  const categoryTotals = []
  const categoryColors = []

  const filterByRange = userExpenses.filter(({ expenseDate }) => dayjs(Number(expenseDate)).isBetween(startOfRange, endOfRange))
  
  // Get unique expense categories
  const categoryLabels = [...new Set(filterByRange.map(({ categoryName }) => categoryName))]

  // Ensure each label has a value and color at a similar position in their respective arrays
  for (const label of categoryLabels) {
    const filterByCategory = userExpenses.filter(({ categoryName }) => categoryName === label)

    const sumExpenses = filterByCategory.reduce((accumulator, currentExpense) => ({
      sum: accumulator.sum + Number(currentExpense.expenseSum),
      color: currentExpense.categoryColor
    }),
    {
      sum: 0,
      color: "7A797B"
    }
  )

    categoryTotals.push(sumExpenses.sum)
    categoryColors.push("#" + sumExpenses.color)
  }

  return [categoryLabels, categoryColors, categoryTotals]
}