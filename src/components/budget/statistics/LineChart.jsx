import dayjs from "dayjs"
import { useState } from "react"
import { Line } from "react-chartjs-2"
import { mapExpenseTotalsLinearly } from "../../../services/resource/expenseMappers.service"



export default function LineChart({ userExpenses }) {
  const [timeUnit, setTimeUnit] = useState('month')

  const handleUnitChange = (e) => {
    const { value } = e.target

    setTimeUnit(value)
  }

  console.log(userExpenses)

  const expenseMapOptions = {
    userExpenses,
    date: dayjs(),
    timeUnit,
    requiredSubUnit: true,
    constant: {},
    constantProperty: 'x',
    sumProperty: 'y'
  }

  const data = {
    datasets: [
      {
        label: "Total Expenses",
        data: mapExpenseTotalsLinearly(expenseMapOptions),
        borderColor: "#0c9bed",
        backgroundColor: "#0c9bed99"
      }
    ]
  }

  const options = {
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: "Total Expenses"
      }
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: timeUnit
        },
        min: dayjs().startOf(timeUnit).valueOf(),
        max: dayjs().endOf(timeUnit).valueOf()
      }
    }
  }

  return (
    <>
      <select value={timeUnit} onChange={handleUnitChange}>
        <option value="week">This Week</option>
        <option value="month">This Month</option>
        <option value="quarter">This Quarter</option>
        <option value="year">This Year</option>
      </select>
      <Line options={options} data={data} />
    </>
  )
}