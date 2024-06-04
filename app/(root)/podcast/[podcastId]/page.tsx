const PodCastDetails = ({ params }: { params: { podcastId: string } }) => {
  return <p className="text-white-1">Podcast Details {params.podcastId}</p>;
};

export default PodCastDetails;
