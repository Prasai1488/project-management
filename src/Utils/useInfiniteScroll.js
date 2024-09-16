import { useDispatch } from "react-redux";

export const useInfinteScroll = ({ loadingNext, next, getNext, setPostsPerPage, setPage }) => {
  const dispatch = useDispatch();

  const scrollToEnd = () => {
    console.log("sdfkljdsflkdsj");
    // setPage((prev) => prev + 1);
    dispatch(getNext(next));
  };
  const handleScroll = (event) => {
    if (event.currentTarget.scrollTop + event.currentTarget.offsetHeight + 10 >= event.currentTarget.scrollHeight) {
      if (!loadingNext && next) {
        scrollToEnd();
      }
    }
  };
  return { handleScroll };
};
