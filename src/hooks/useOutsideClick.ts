import { useEffect } from "react";

const useOutsideClick = (inputSearchRef: any, callback: () => void) => {
  const handleClick = (e: any) => {
    if (inputSearchRef && !inputSearchRef.contains(e.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [inputSearchRef]);
};

export default useOutsideClick;
