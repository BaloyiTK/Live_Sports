import React from "react";

const Competitions = ({
  selectedLeague,
  handleCompetitionClick,
  countryFlag,
}) => {
  const uniqueCompetitionNames = new Set();

  return (
    <div className="mt-2">
      {selectedLeague.map((competition, index) => {
        if (!uniqueCompetitionNames.has(competition.Sdn)) {
          uniqueCompetitionNames.add(competition.Sdn);
          if (competition.Shi === 0) {
            return (
              <div
                className="flex items-center cursor-pointer mb-2"
                key={index}
                onClick={() => handleCompetitionClick(competition)}
              >
                <div className="w-[10%]">
                  <img
                    className="w-[20px] h-[10px] rounded-sm"
                    src={`https://static.livescore.com/i2/fh/${countryFlag}.jpg`}
                    alt={competition.Sdn}
                  />
                </div>
                <li className="list-none w-[80%] ml-2 overflow-hidden whitespace-nowrap">
                  {competition.Sdn.length > 22
                    ? `${competition.Sdn.substring(0, 22)}...`
                    : competition.Sdn}
                </li>
              </div>
            );
          }
        }
        return null;
      })}
    </div>
  );
};

export default Competitions;
