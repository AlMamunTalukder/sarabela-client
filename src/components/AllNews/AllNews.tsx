
'use client'
import Education from "../News/Education";
import Jobs from "../News/Jobs";
import Technology from "../News/Technology";

const AllNews = () => {

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-10">
        <Education />
        <Jobs />
        <Technology />
      </div>
    </div>
  );
};

export default AllNews;
