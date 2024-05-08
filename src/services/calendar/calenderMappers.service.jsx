export const getYearOptions = () => {
  const yearOptions = []

  for (let year = 1900; year <= 2100; year++){
    const yearOption = <option key={year} value={year}>{year}</option>
    
    yearOptions.push(yearOption)
  }

  return yearOptions
}

export const getMonthOptions = () => {
  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"]
  const monthOptions = []

  for (let month = 1; month <= 12; month++) {
    const monthOption = <option key={month} value={month}>{monthNames[month-1]}</option>

    monthOptions.push(monthOption)
  }

  return monthOptions
}

export const getMonthItems = (date) => {
  const daysInMonth = date.daysInMonth()
  const monthItems = []

  for (let day = 1; day <= daysInMonth; day++) {
    // WIP
    const dayItem = <li key={day}>{day}</li>

    monthItems.push(dayItem)
  }

  return monthItems
}