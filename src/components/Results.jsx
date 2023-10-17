import React from "react";

const Results = ({ results }) => {
  const imageUrl = "https://lsm-static-prod.livescore.com/medium/";

  return (
    <div className="bg-gray-200 w-[100%] rounded-lg md:p-4 shadow-2xl min-h-screen text-sm ">
      {results &&
        results.map((match, index) => {
          const relevantEvents = match.Events.filter(
            (event) =>
              event.Eps === "FT" || event.Eps === "AET" || event.Eps === "AP"
          );

          return (
            <div className="w-[100%]" key={index}>
              {relevantEvents.length > 0 && (
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
              )}

              <div className="m-3">
                <div className="grid">
                  {relevantEvents.map((event, index) => {
                    return (
                      <div key={index}>
                        <div
                          className="mb-2 flex items-center bg-slate-900 w-[100%] rounded-lg text-gray-300 hover:bg-slate-500"
                          key={index}
                        >
                          <div className="flex justify-center w-[30%]">
                            {event.Eps === "FT" ||
                            event.Eps === "Postp." ||
                            event.Eps === "AET" ||
                            event.Eps === "AP" ||
                            event.Eps === "Canc." ||
                            event.Eps === "AAW" ||
                            event.Eps === "Aband." ? (
                              <span>{event.Eps}</span>
                            ) : (
                              null
                            )}
                          </div>

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
        })}
    </div>
  );
};

export default Results;
