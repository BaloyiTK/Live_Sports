import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchLeagueTable } from "../api";
import BallBouncingLoader from "./BallBouncingLoader";

const Table = () => {
  const competitionName = useSelector((state) => state.competitionName.name);
  const [table, setTable] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cachedTableData = localStorage.getItem("tables");
        if (cachedTableData) {
          const tableData = JSON.parse(cachedTableData);
          if (isValidTableData(tableData)) {
            setTable(tableData.LeagueTable.L[0].Tables[0].team);
          }
        } else {
          const tableData = await fetchLeagueTable(competitionName);
          if (isValidTableData(tableData)) {
            setTable(tableData.LeagueTable.L[0].Tables[0].team);
            localStorage.setItem("table", JSON.stringify(tableData));
          } else {
            console.error("Data structure is invalid:", tableData);
          }
        }
      } catch (error) {
        console.error("Error fetching table data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [competitionName]);

  const isValidTableData = (data) => {
    return (
      data &&
      data.LeagueTable &&
      data.LeagueTable.L &&
      data.LeagueTable.L[0] &&
      data.LeagueTable.L[0].Tables &&
      data.LeagueTable.L[0].Tables[0] &&
      data.LeagueTable.L[0].Tables[0].team
    );
  };

  return (
    <div className="border border-gray-500 rounded-t-lg min-h-screen">
      {loading ? (
        <div className="h-screen flex justify-center items-center text-black">
             <BallBouncingLoader/>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-t-lg">
          <table className="min-w-full table-fixed border-b rounded-y-lg">
            <thead className="text-white bg-slate-600">
              <tr>
                <th className="py-1 text-center">#</th>
                <th className="py-1">Team</th>
                <th className="py-1 text-center">P</th>
                <th className="py-1 text-center">W</th>
                <th className="py-1 text-center">D</th>
                <th className="py-1 text-center">L</th>
                <th className="py-1 text-center hidden md:table-cell">F</th>
                <th className="py-1 text-center hidden md:table-cell">A</th>
                <th className="py-1 text-center">GD</th>
                <th className="py-1 text-center">PTS</th>
              </tr>
            </thead>
            <tbody>
              {table.map((team, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-700 transition-all border-b border-gray-500 text-gray-400 hover:text-gray-200 cursor-pointer"
                >
                  <td className="py-1 text-center">{team.rnk}</td>
                  <td className="py-1 whitespace-nowrap">{team.Tnm}</td>
                  <td className="py-1 text-center">{team.pld}</td>
                  <td className="py-1 text-center">{team.win}</td>
                  <td className="py-1 text-center">{team.drw}</td>
                  <td className="py-1 text-center">{team.lst}</td>
                  <td className="py-1 text-center hidden md:table-cell">{team.gf}</td>
<td className="py-1 text-center hidden md:table-cell">{team.ga}</td>

                  <td className="py-1 text-center">{team.gd}</td>
                  <td className="py-1 text-center">{team.pts}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Table;
