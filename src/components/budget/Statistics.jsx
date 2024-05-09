import { useContext, useState, useEffect } from "react"
import { UserContext } from "../../context/UserContext"
import { getUserResources } from "../../services/resource/getResource.service"
import { Chart as ChartJS } from 'chart.js/auto'
import 'chartjs-adapter-dayjs-4/dist/chartjs-adapter-dayjs-4.esm'
import LineChart from "./statistics/LineChart"
import PieChart from "./statistics/PieChart"

export default function Statistics() {
  const { user, setUser } = useContext(UserContext)
  const [userResources, setUserResources] = useState({ userCategories: [], userExpenses: [] })
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const fetchResources = async () => {
      const response = await getUserResources(user.accessToken)

      if (!response?.success)
        setUser(null)

      // Update user context access token if it was refreshed in request
      if (response.data?.user)
        setUser(response.data.user)

      setUserResources(response.data)
      setIsLoaded(true)
    }
    fetchResources()
  }, [])

  return isLoaded && (
    <div className="statistics__container">
      <section className="line-chart__container">
        <LineChart userExpenses={userResources.userExpenses}/>
      </section>
      <section className="pie-chart__container">
        <PieChart userExpenses={userResources.userExpenses}/>
      </section>
    </div>
  )
}