import React, { useEffect } from "react";
import Player from "../components/video/Player";
import VideoDescription from "../components/video/VideoDescription";
import RelatedVideoList from "../components/video/RelatedVideoList";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideo } from "../features/video/videoSlice";
import { useParams } from "react-router-dom";
import Loading from "../utils/Loading";

const Video = () => {
  const dispatch = useDispatch();
  const { video, isLoading, isError, error } = useSelector(
    (state) => state.video
  );

  const { videoId } = useParams();

  const { link, title, id, tags } = video || {};

  useEffect(() => {
    dispatch(fetchVideo(videoId));
  }, [dispatch, videoId]);

  console.log(video);
  // console.log(likes, unlikes);

  let content = null;
  if (isLoading) content = <Loading />;
  if (!isLoading && isError)
    content = <div className="col-span-12">{error}</div>;
  if (!isError && !isLoading && !video?.id)
    content = <div className="col-span-12">No Video Found</div>;
  if (!isError && !isLoading && video?.id) {
    content = (
      <div className="col-span-full w-full space-y-8 lg:col-span-2">
        <Player link={link} title={title} />
        <VideoDescription video={video} />
      </div>
    );
  }

  return (
    <>
      <section className="pt-6 pb-20">
        <div className="mx-auto max-w-7xl px-2 pb-20 min-h-[400px]">
          <div className="grid grid-cols-3 gap-2 lg:gap-8">
            {content}
            <RelatedVideoList currentVideoId = {id} tags={tags}/>
          </div>
        </div>
      </section>
    </>
  );
};

export default Video;
