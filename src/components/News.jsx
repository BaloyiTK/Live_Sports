import React, {memo} from "react";
import moment from "moment/moment";
import BallBouncingLoader from "./BallBouncingLoader";

const News = memo(({ news, loading }) => {

  return (
    <div className="hidden md:block min-h-screen mx-auto p-1 bg-gray-900 rounded shadow-2xl text-white">
      <h1 className="text-lg flex justify-center items-center font-semibold mb-5">
        Football News
      </h1>
      {loading ? (
        <div className="h-screen flex justify-center items-center text-black">
          <BallBouncingLoader />
        </div>
      ) : news &&
        news.map((news, i) => {
          if (news.categoryLabel === "Football") {
            return (
              <div key={i}>
                <a
                  href={`https://www.livescore.com/${news.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white text-gray-900 rounded-md shadow-md mb-4 hover:shadow-lg transition-transform transform hover:scale-105 hover:border hover:border-blue-500 hover:text-gray-500"
                >
                  <div className=" grid bg-white items-center mb-5 border">
                    {}
                    <img
                      src={news.mainMedia[0].gallery.url}
                      alt={"n.mainMedia.gallery.alt"}
                      className="w-full h-48 object-cover rounded-t-md"
                    />
                    <div className="p-4">
                      <span className="text-sm text-gray-400">
                        {moment(news.publishedAt).format("yyyy-MM-DD")}
                      </span>
                      <p className="text-xl font-bold mt-2">{news.title}</p>
                    </div>
                  </div>
                </a>
              </div>
            );
          }
        })}
    </div>
  );
});

export default News;