import { LoadingSpinner } from "@/components/Loading";
import {
  GET_TOTAL_POST,
  GET_TOTAL_PUBLISHED_POST,
  GET_TOTAL_UNPUBLISHED_POST,
} from "@/graphQL/query";
import { useQuery } from "@apollo/client";

const Dashboard = () => {
  const { data: totalPost, loading } = useQuery(GET_TOTAL_POST);
  const { data: totalPublishedPost } = useQuery(GET_TOTAL_PUBLISHED_POST);
  const { data: totalUnpublishedPost } = useQuery(GET_TOTAL_UNPUBLISHED_POST);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-5 gap-5 grid grid-cols-1 lg:grid-cols-3">
      <div className="border  h-28 font-semibold  rounded p-5">
        <h1 className="text-lg text-gray-700">Total Blogs</h1>
        <p className="text-2xl">{totalPost?.totalPosts || 0}</p>
      </div>
      <div className="border  h-28 font-semibold  rounded p-5">
        {" "}
        <h1 className="text-lg text-gray-700">Published Blogs</h1>
        <p className="text-2xl">{totalPublishedPost?.publishedPosts || 0}</p>
      </div>
      <div className="border  h-28 font-semibold  rounded p-5">
        {" "}
        <h1 className="text-lg text-gray-700">Unpublished Blogs</h1>
        <p className="text-2xl">
          {totalUnpublishedPost?.unpublishedPosts || 0}
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
