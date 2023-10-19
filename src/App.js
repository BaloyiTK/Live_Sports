import React, { useState, useEffect } from "react";
import Navbar from "./components/NavBar";
import MainContent from "./components/MainContent";
import Footer from "./components/Footer";
import Leagues from "./components/Leagues";
import { fetchLeagues, fetchNews } from "./api";
import News from "./components/News";
import { useDispatch, useSelector } from "react-redux";
import { competitionNameActions, menuActions } from "./store";

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [leagues, setLeagues] = useState();
  const [news, setNews] = useState();

  const dispatch = useDispatch();

  const isMenuOpen = useSelector((state) => state.menu.isMenuOpen);
  const isCompetition = useSelector((state) => state.competitionName.name);

  console.log(leagues);
  

  useEffect(() => {
    setLeagues({})
    if (isCompetition && isMenuOpen) {
      dispatch(menuActions.closeMenu());
      dispatch(competitionNameActions.setCompetitionName(""));
   
   
    }
  }, [isCompetition]);

  // Callback function to receive the selected date from MainContent
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    const fetchData = async () => {
      const cachedLeagueData = localStorage.getItem("leagues");
      if (cachedLeagueData) {
        const matchesData = JSON.parse(cachedLeagueData);

        setLeagues(matchesData.Ccg);
      } else {
        const matchesData = await fetchLeagues();
        setLeagues(matchesData.Ccg);

        localStorage.setItem("leagues", JSON.stringify(matchesData));
      }

      const cachedNewsData = localStorage.getItem("newss");
      if (cachedNewsData) {
        const newsData = JSON.parse(cachedNewsData);
        setNews(newsData.topStories);
      } else {
        const newsData = await fetchNews();
        setNews(newsData.topStories);
        localStorage.setItem("news", JSON.stringify(newsData));
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main className="container w-full md:w-[80%] mx-auto">
        <div className="flex md:mt-5">
          {/* <div className={`w-[20%] hidden md:block`}>
            <Leagues leagues={leagues} />
          </div> */}
          <div
            className={`md:w-[20%] md:block ${
               isMenuOpen
                ? "block absolute z-50 w-full"
                : "hidden"
            }`}
          >
            <Leagues leagues={leagues} />
          </div>

          {/* <div
            className={`md:w-[20%] md:block ${
              isCompetition
                ? "hidden"
                : isMenuOpen
                ? "block absolute z-50 w-full"
                : "hidden"
            }`}
          >
            <Leagues leagues={leagues} />
          </div> */}

          <div className="w-full md:w-[50%]">
            <MainContent onDateChange={handleDateChange} />
          </div>
          <div className="w-[30%] hidden md:block">
            <News news={news} />
          </div>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
