import { useEffect, useState } from "react";

const useIsFirstRender = () => {
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
    }
  }, [isFirstRender]);

  return isFirstRender;
};

export default useIsFirstRender;
