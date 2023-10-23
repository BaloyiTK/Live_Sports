import BallBouncingLoader from "./BallBouncingLoader";
import MatchCard from "./MatchCard";

const AllMatches = ({ allMatches, loading }) => {
  return (
    <div className="bg-gray-200 w-[100%] rounded-lg md:p-4 shadow-2xl min-h-screen text-sm">
      {loading ? (
        <div className="h-screen flex justify-center items-center text-black">
          <BallBouncingLoader />
        </div>
      ) : (
        allMatches &&
        allMatches.map((match, index) => {
          return <MatchCard key={index} match={match} />;
        })
      )}
    </div>
  );
};

export default AllMatches;
