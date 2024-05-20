import dayjs from 'dayjs';
import { useMemo, useState, useContext, useEffect, useCallback } from 'react';
import { getMonthItems, getMonthOptions, getYearOptions } from '../../services/calendar/calenderMappers.service';
import { UserContext } from '../../context/UserContext';
import { getUserResources } from '../../services/resource/getResource.service';
import Modal from 'react-modal';
import CalendarModal from './calendar/CalendarModal';
import { style } from '../../styles/CalendarModal';

export default function Calendar() {
  const { user, userTokenRefresh } = useContext(UserContext);
  const [userResources, setUserResources] = useState({ userCategories: [], userExpenses: [] });
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldRefresh, setShouldRefresh] = useState(false);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  // Initialize state with current date
  const [dateOptions, setDateOptions] = useState({ year: dayjs().year(), month: dayjs().month() + 1 });
  const date = dayjs(`${dateOptions.year}-${dateOptions.month}`);

  const memoizedYearOptions = useMemo(() => getYearOptions(), []);
  const memoizedMonthOptions = useMemo(() => getMonthOptions(), []);

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

  const handleDateChange = (e) => {
    const { name, value } = e.target;

    setDateOptions((prevDates) => ({
      ...prevDates,
      [name]: value,
    }));
  };

  const openModal = (modalSetup) => {
    setModalContent(modalSetup);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);

    if (shouldRefresh) {
      setShouldRefresh(false);
      fetchResources();
    }
  };

  const expenseMapOptions = {
    userExpenses: userResources.userExpenses,
    date: date,
    timeUnit: 'month',
    requireSubUnit: true,
    constantProperty: 'date',
    sumProperty: 'total',
  };

  const monthItems = getMonthItems(expenseMapOptions, openModal);

  // Set modal app element to root for screenreader accessibility
  Modal.setAppElement('#root');

  return (
    isLoaded && (
      <>
        <div className="calendar__container">
          <div className="calendar-options__container">
            <select name="year" value={dateOptions.year} onChange={handleDateChange}>
              {memoizedYearOptions}
            </select>
            <select name="month" value={dateOptions.month} onChange={handleDateChange}>
              {memoizedMonthOptions}
            </select>
          </div>
          <ul className="calendar-items__container">{monthItems}</ul>
        </div>
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={style}>
          <CalendarModal
            closeModal={closeModal}
            setShouldRefresh={setShouldRefresh}
            date={modalContent?.date}
            expenses={modalContent?.expenses}
            categories={userResources.userCategories}
          />
        </Modal>
      </>
    )
  );
}
