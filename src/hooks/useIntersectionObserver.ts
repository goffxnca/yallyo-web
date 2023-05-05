import { RefObject, useEffect } from "react";
import * as _ from "lodash";

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
    onIntersecting();
  }, 500);

  useEffect(() => {
    let observer: IntersectionObserver;
    if (targetRef.current && requiredCondition) {
      console.log("useIntersectionObserver useEffect ran...");
      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
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
