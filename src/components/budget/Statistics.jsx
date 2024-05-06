import { useContext, useState, useEffect } from "react"
import { UserContext } from "../../context/UserContext"
import { getUserResources } from "../../services/resource/getResource.service"
import LineChart from "./statistics/LineChart"
import PieChart from "./statistics/PieChart"
import dayjs from "dayjs"

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

      response.data.userCategories = convertUnixToDate(response.data.userCategories)

      setUserResources(response.data)
      setIsLoaded(true)
      console.log(userResources)
    }
    fetchResources()
  }, [])

  // Convert all UNIX expense timestamps to Day.js objects
  function convertUnixToDate (expenses) {
    return expenses.map(expense => expense.expenseDate = dayjs(expense.expenseDate))
  }

  return isLoaded && (
    <div className="statistics__container">
      <section className="line-chart__container">
        <LineChart userCategories={userResources.userCategories}/>
      </section>
      <section className="pie-chart__container">
        <PieChart />
      </section>
    </div>
  )
}