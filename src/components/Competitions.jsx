import React from "react";

const Competitions = ({ selectedLeague, handleCompetitionClick, countryFlag }) => {
  if (!selectedLeague || !Array.isArray(selectedLeague)) {
    console.error("selectedLeague is not a valid array:", selectedLeague);
    return null; // Handle this situation appropriately
  }

  // Compute unique competition names before rendering
  const uniqueCompetitionNames = Array.from(
    new Set(selectedLeague.map((competition) => competition.Sdn))
  );

  return (
    <div className="mt-2">
      {uniqueCompetitionNames.map((competitionName, index) => {
        const competition = selectedLeague.find(
          (comp) => comp.Sdn === competitionName
        );

        if (competition && competition.Shi === 0) {
          const truncatedName =
            competition.Sdn.length > 22
              ? `${competition.Sdn.substring(0, 22)}...`
              : competition.Sdn;
          const imageUrl = `https://static.livescore.com/i2/fh/${countryFlag}.jpg`;

          return (
            <div
              className="flex items-center cursor-pointer mb-2"
              key={index}
              onClick={() => handleCompetitionClick(competition)}
            >
              <div className="w-[10%]">
                <img
                  className="w-[20px] h-[10px] rounded-sm"
                  src={imageUrl}
                  alt={competition.Sdn}
                />
              </div>
              <li className="list-none w-[80%] ml-2 overflow-hidden whitespace-nowrap">
                {truncatedName}
              </li>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default Competitions;
