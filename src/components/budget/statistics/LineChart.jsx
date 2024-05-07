import dayjs from "dayjs"
import { useState } from "react"
import { Line } from "react-chartjs-2"
import { mapExpensesByTimeUnit } from "../../../services/resource/mapExpensesByTimeUnit"



export default function LineChart({ userExpenses }) {
  const [timeUnit, setTimeUnit] = useState('year')

  const data = {
    datasets: [
      {
        label: "Total Expenses",
        data: mapExpensesByTimeUnit(userExpenses, dayjs(), timeUnit),
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
      <Line options={options} data={data} />
    </>
  )
}