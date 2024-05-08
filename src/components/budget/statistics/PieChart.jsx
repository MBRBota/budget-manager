import { useState } from "react";
import { Pie } from "react-chartjs-2";
import { mapExpenseTotalsByCategory } from "../../../services/resource/expenseMappers.service";
import dayjs from "dayjs";


export default function PieChart({ userExpenses }) {
  const [timeUnit, setTimeUnit] = useState('month')

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
      <Pie data={data} />
    </>
  )
}