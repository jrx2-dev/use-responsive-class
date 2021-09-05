import { RefObject, useState } from "react";
import useResizeObserver from '@react-hook/resize-observer'
import { createMediaBreakpoints, getCurrentSizeClass } from "../helpers/mediaBreakpoints";
import { MEDIA_BREAKPOINTS } from "../models/constants";
import { breakpointsInput } from "../models/interfaces";

const useResponsiveClass = (
  ref: RefObject<HTMLElement>,
  breakpoints: breakpointsInput = MEDIA_BREAKPOINTS
) => {
  const [sizeClass, setSizeClass] = useState<string>('');
  const mediaBreakpoints = createMediaBreakpoints(breakpoints);

  useResizeObserver(ref, (entry) => setSizeClass(getCurrentSizeClass(entry.contentRect.width, mediaBreakpoints)));

  return [sizeClass];
};

export { useResponsiveClass };
