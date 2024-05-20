import { useContext, useState, useEffect, useCallback } from 'react';
import { UserContext } from '../../context/UserContext';
import { getUserResources } from '../../services/resource/getResource.service';
// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from 'chart.js/auto';
import 'chartjs-adapter-dayjs-4/dist/chartjs-adapter-dayjs-4.esm';
import LineChart from './statistics/LineChart';
import PieChart from './statistics/PieChart';

export default function Statistics() {
  const { user, userTokenRefresh } = useContext(UserContext);
  const [userResources, setUserResources] = useState({ userCategories: [], userExpenses: [] });
  const [isLoaded, setIsLoaded] = useState(false);

  const fetchResources = useCallback(async () => {
    setIsLoaded(false);

    try {
      const response = await getUserResources(user.accessToken);

      setUserResources(response.data);
    } catch (err) {
      console.log(err);
      userTokenRefresh();
    }

    setIsLoaded(true);
  }, [user.accessToken, userTokenRefresh]);

  useEffect(() => {
    fetchResources();
  }, [fetchResources]);

  return (
    isLoaded && (
      <div className="statistics__container">
        <section className="line-chart__container">
          <LineChart userExpenses={userResources.userExpenses} />
        </section>
        <section className="pie-chart__container">
          <PieChart userExpenses={userResources.userExpenses} />
        </section>
      </div>
    )
  );
}
