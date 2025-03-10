import { useState, useEffect } from "react";
import { GLOBAL_LOAD_DELAY } from "../../_config/consts.config";

const useAssetsLoaded = (delay: number = GLOBAL_LOAD_DELAY) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleLoad = () => {
      setTimeout(() => setIsLoaded(true), delay);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, [delay]);

  return isLoaded;
};

export default useAssetsLoaded;