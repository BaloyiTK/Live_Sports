import React from "react";
import moment from "moment";
import { useSelector } from "react-redux";

const imageUrl = "https://lsm-static-prod.livescore.com/medium/";

const MatchCard = ({ match }) => {
  const selectedTab = useSelector((state) => state.selectedTab);

  console.log(selectedTab);

  return (
    <div className="w-[100%]">
      <div className="m-3 flex items-center">
        <img
          className="w-[30px] h-[15px] rounded-sm pr-2 shadow-2xl mt-2"
          src={`https://static.livescore.com/i2/fh/${match.Ccd}.jpg`}
          alt=""
          onError={(e) => {
            e.target.src = "/placeholder.png";
          }}
        />

        <div className="grid mt-2">
          <span className="font-bold text-gray-800">{match.Cnm}</span>
          <span className="text-xs text-gray-500">{match.Snm}</span>
        </div>
      </div>

      <div className="m-3">
        <div className="grid">
          {match.Events.map((event, index) => {
            return (
              <div key={index}>
                <div
                  className="mb-2 flex items-center bg-slate-900 w-[100%] rounded-lg text-gray-300 hover:bg-slate-500"
                  key={index}
                >
                  <div className="flex justify-center w-[30%]">
                    {event.Eps === "NS" ? (
                      <span>
                        {moment(
                          event.Esd.toString().slice(0, 8) +
                            "T" +
                            event.Esd.toString().slice(8, 15)
                        ).format("HH:mm")}
                      </span>
                    ) : (
                      <span
                        className={
                          event.Eps === "FT" || event.Eps === "HT"  || event.Eps === "AET" || event.Eps === "AP"  || event.Eps === "Canc."
                          
                            ? "text-red-500"
                            : event.Eps === "NS" || event.Eps === "Aband." || event.Eps === "Postp."
                            ? "text-orange-400"
                            :"text-green-500 "
                        }
                      >
                        {event.Eps}
                      </span>
                    )}
                  </div>

                  <div className="grid w-[100%] overflow-x-hidden">
                    <div className="flex items-center mb-2">
                      <img
                        className="w-[20px] h-[20px] mr-2"
                        src={imageUrl + event.T1[0].Img}
                        alt=""
                      />
                      <span className="whitespace-nowrap">
                        {event.T1[0].Nm}
                      </span>
                    </div>

                    <div className="flex items-center">
                      <img
                        className="w-[20px] h-[20px] mr-2"
                        src={imageUrl + event.T2[0].Img}
                        alt=""
                      />
                      <span className="whitespace-nowrap">
                        {event.T2[0].Nm}
                      </span>
                    </div>
                  </div>

                  <div className="w-[25%] md:w-[50%]  flex justify-end mr-5 md:mr-10">
                    <div className="grid">
                      <div className=" text-base items-center mb-2">
                        <span className="text-red-400 m-1">{event.Trp1}</span>
                        <span> {event.Tr1}</span>
                      </div>
                      <div className=" text-base items-center">
                        <span className="text-red-400 p-1">{event.Trp2}</span>
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
};

export default MatchCard;
