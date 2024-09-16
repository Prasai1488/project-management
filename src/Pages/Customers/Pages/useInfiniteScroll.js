import { useDispatch } from "react-redux";

export const useInfinteScroll = (loadingNext, next, getNext) => {
  const dispatch = useDispatch();
  const scrollToEnd = (next) => {
    dispatch(getNext(next));
  };

  const handleScroll = (event) => {
    if (event.currentTarget.scrollTop + event.currentTarget.offsetHeight === event.currentTarget.scrollHeight) {
      if (!loadingNext && next !== null) {
        scrollToEnd(next);
      }
    }
  };

  return { handleScroll };
};
