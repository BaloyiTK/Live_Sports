import React from "react";
import moment from "moment";

const LiveMatches = ({ liveMatches }) => {
  const imageUrl = "https://lsm-static-prod.livescore.com/medium/";

  return (
    <div className="bg-gray-200 w-[100%] rounded-lg p-4 shadow-2xl min-h-screen">
      {liveMatches && liveMatches.length === 0 ? (
        <div className="h-screen
        flex justify-center items-center text-black">No match is being played at the momemt.</div>
      ) : (
        liveMatches &&
        liveMatches.map((match, index) => {
          return (
            <div className="w-[100%]" key={index}>
              <div className="m-3 flex items-center">
                <img
                  className="w-[30px] h-[15px] rounded-sm pr-2"
                  src={`https://static.livescore.com/i2/fh/${match.Ccd}.jpg`}
                  alt=""
                />
                <div className="grid">
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
                          className="mb-2 flex items-center bg-slate-800 w-[100%] rounded-lg text-gray-300 hover:bg-slate-500"
                          key={index}
                        >
                          <div className="p-5 w-[30%] ">
                            <div>
                              {event.Eps === "NS" ? (
                                <span>
                                  {moment(
                                    event.Esd.toString().slice(0, 8) +
                                      "T" +
                                      event.Esd.toString().slice(8, 15)
                                  ).format("HH:mm")}
                                </span>
                              ) : event.Eps === "HT" ? (
                                <div className="items-center flex ">
                                  <span className=" mr-2  w-2 h-2"></span>
                                  <span className="text-red-500 ">
                                    {event.Eps}
                                  </span>
                                </div>
                              ) : (
                                <div className="items-center flex ">
                                  <span className="text-green-500 animate-ping opacity-100 rounded-full mr-2 bg-green-500 w-2 h-2"></span>
                                  <span className="text-green-500 ">
                                    {event.Eps}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="grid w-[100%] ">
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

                          <div className="w-[50%]  flex justify-end mr-10 ">
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

export default LiveMatches;
