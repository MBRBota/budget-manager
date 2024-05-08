import { useState } from "react";
import { Pie } from "react-chartjs-2";
import { mapExpenseTotalsByCategory } from "../../../services/resource/expenseMappers.service";
import dayjs from "dayjs";


export default function PieChart({ userExpenses }) {
  const [timeUnit, setTimeUnit] = useState('month')

  const handleUnitChange = (e) => {
    const { value } = e.target

    setTimeUnit(value)
  }

  const [pieLabels, pieColors, pieValues] = mapExpenseTotalsByCategory(userExpenses, dayjs(), timeUnit)

  const data = {
    labels: pieLabels,
    datasets: [
      { 
        label: 'Total',
        data: pieValues,
        backgroundColor: pieColors
      }
    ]
  }

  return (
    <>
      <select value={timeUnit} onChange={handleUnitChange}>
        <option value="week">This Week</option>
        <option value="month">This Month</option>
        <option value="quarter">This Quarter</option>
        <option value="year">This Year</option>
      </select>
      <Pie data={data} />
    </>
  )
}