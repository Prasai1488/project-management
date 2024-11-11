import { useDispatch } from "react-redux";

export const useInfinteScroll = ({ loadingNext, next, getNext }) => {
  const dispatch = useDispatch();

  const scrollToEnd = () => {
    console.log("sdfkljdsflkdsj");
    //  setPage((prev) => prev + 1);
    getNext(next);
  };
  const handleScroll = (event) => {
    if (event.currentTarget.scrollTop + event.currentTarget.offsetHeight  <= event.currentTarget.scrollHeight) {
      if (!loadingNext && next) {
        scrollToEnd();
      }
    }
  };
  return { handleScroll };
};
