import { RefObject, useEffect } from "react";
import _ from "lodash";

interface Props {
  targetRef: RefObject<HTMLElement>;
  onIntersecting: Function;
  requiredCondition: boolean;
  deps: unknown[];
}

const options = {
  root: null,
  rootMargin: "0px",
  threshold: 1.0,
};

const useIntersectionObserver = ({
  targetRef,
  onIntersecting,
  requiredCondition,
  deps,
}: Props) => {
  const onIntersectingDebounce = _.debounce(() => {
    // console.log("intersecting");
    onIntersecting();
  }, 1000);

  useEffect(() => {
    let observer: IntersectionObserver;
    if (targetRef.current && requiredCondition) {
      // console.log("useIntersectionObserver useEffect ran...");
      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          document.querySelector("html")!.style.overflow = "hidden";
          setTimeout(() => {
            document.querySelector("html")!.style.overflow = "scroll";
          }, 2000);
          onIntersectingDebounce();
        }
      }, options);

      if (observer) {
        observer.observe(targetRef.current);
      }
    }

    return () => {
      if (targetRef.current && requiredCondition && observer) {
        console.log("useIntersectionObserver useEffect clenaup ran...");
        observer.unobserve(targetRef.current);
      }
    };
  }, [targetRef, [...deps]]);
};

export default useIntersectionObserver;
