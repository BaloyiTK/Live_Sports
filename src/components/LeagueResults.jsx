import React, { useState, useEffect } from "react";
import moment from "moment";
import { fetchMatchesByLeague } from "../api";
import BallBouncingLoader from "./BallBouncingLoader";

const LeagueResults = ({ competitionCountry, competitionLeague }) => {
  const [matches, setMatches] = useState();
  const [table, setTable] = useState();
  const imageUrl = "https://lsm-static-prod.livescore.com/medium/";
  const [loading, setLoading] = useState(false);

  // console.log(matches && matches.length > 0 && matches[0].Events)

  if (matches && matches.length > 0 && matches[0].Events) {
    matches[0].Events.sort((a, b) => b.Esd - a.Esd); // or b.Esd - a.Esd for descending order
  } else {
    console.error("No valid data to sort.");
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const cachedMatchesData = localStorage.getItem("matchesbyleagues");
      if (cachedMatchesData) {
        const leagueData = JSON.parse(cachedMatchesData);
        console.log(leagueData);
        setMatches(leagueData.Stages);
        setTable(leagueData.Stages);
        setLoading(false);
      } else {
        const leagueData = await fetchMatchesByLeague(
          competitionCountry,
          competitionLeague
        );
        setMatches(leagueData.Stages);
        setTable(leagueData.Stages);
        console.log(leagueData);
        localStorage.setItem("matchesbyleague", JSON.stringify(leagueData));
        setLoading(false);
      }
    };

    fetchData();
  }, [competitionLeague]);

  return (
    <div className="bg-gray-200 w-[100%] rounded-lg md:p-4 shadow-2xl min-h-screen text-sm ">
      {loading ? (
        <div className="h-screen flex justify-center items-center text-black">
             <BallBouncingLoader/>
        </div>
      ) : (
        matches &&
        matches.map((match, index) => {
          return (
            <div className="w-[100%]" key={index}>
              <div className="m-3 flex items-center">
                {/* Your team logo and name rendering */}
              </div>

              <div className="m-3">
                <div className="grid">
                  {match.Events.filter(
                    (event) => event.Eps !== "NS" && event.Eps !== "Postp."
                  ).map((event, index) => {
                    return (
                      <div key={index}>
                        {/* <span className="text-black m-1">{`Round ${event.Pid + 1}`}</span> */}
                        <span className="text-gray-600 text-xs font-semibold">
                          {moment(
                            event.Esd.toString().slice(0, 8) +
                              "T" +
                              event.Esd.toString().slice(8, 15)
                          ).format("YYYY-MM-DD")}
                        </span>
                        <div
                          className="mb-2 flex items-center bg-slate-900 w-[100%] rounded-lg text-gray-300 hover-bg-slate-500"
                          key={index}
                        >
                           <div className="flex justify-center w-[30%]">
                          
                                <span>{event.Eps}</span>
                      
                           
                          </div>
                          {/* Rest of your event rendering code */}
                          <div className="grid w-[100%] overflow-x-hidden ">
                            <div className="flex items-center mb-2">
                              <img
                                className="w-[20px] h-[20px] mr-2 "
                                src={imageUrl + event.T1[0].Img}
                                alt=""
                              />
                              <span className="whitespace-nowrap">
                                {event.T1[0].Nm}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <img
                                className="w-[20px] h-[20px] mr-2 "
                                src={imageUrl + event.T2[0].Img}
                                alt=""
                              />
                              <span className="whitespace-nowrap">
                                {event.T2[0].Nm}
                              </span>
                            </div>
                          </div>
                        
                          <div className="w-[25%] md:w-[50%]  flex justify-end mr-5 md:mr-10 ">
                            <div className="grid">
                              <div className="font-bold text-base items-center mb-2">
                                <span className="text-red-400 m-1">
                                  {event.Trp1}
                                </span>
                                <span> {event.Tr1}</span>
                              </div>
                              <div className=" font-bold text-base items-center">
                                <span className="text-red-400 p-1">
                                  {event.Trp2}
                                </span>
                                <span> {event.Tr2}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default LeagueResults;
