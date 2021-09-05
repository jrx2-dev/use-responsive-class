import { breakpointsInput, mediaBreakpoints } from "../models/interfaces";

const createMediaBreakpoints = (
  _breakpoints: breakpointsInput
): mediaBreakpoints[] => {
  // transform object property/values to array
  let breakpointsArray: [string, number][] = Object.entries(
    _breakpoints
  ).map(([key, value]) => [key, value]);
  // sort asc
  breakpointsArray = breakpointsArray.sort((a, b) => a[1] - b[1]);
  // remove duplicated value breakpoints
  const prevArray: [string, number][] = [];
  breakpointsArray = breakpointsArray.reduce((prev, curr) => {
    if (!prev.find((bp) => bp[1] === curr[1])) {
      return [...prev, curr];
    }
    return prev;
  }, prevArray);
  const mediaBreakpoints: mediaBreakpoints[] = [];
  const lastBreakpointsIndex: number = breakpointsArray.length - 1;
  let lastmediaBreakPointKeyFinded: string = "";
  breakpointsArray.forEach((currentBreakPoint, index) => {
    const [currentBreakpointKey, currentBreakpointValue] = currentBreakPoint;
    if (lastmediaBreakPointKeyFinded) {
      const [previousBreakpointKey, previousBreakpoinValue] = breakpointsArray[
        index - 1
      ];
      mediaBreakpoints.push({
        class: `from-${previousBreakpointKey}-to-under-${currentBreakpointKey}`,
        from: previousBreakpoinValue,
        toUnder: currentBreakpointValue,
      });
    } else {
      mediaBreakpoints.push({
        class: `to-${currentBreakpointKey}`,
        from: 0,
        toUnder: currentBreakpointValue,
      });
    }
    if (index === lastBreakpointsIndex) {
      mediaBreakpoints.push({
        class: `from-${currentBreakpointKey}`,
        from: currentBreakpointValue,
        toUnder: Infinity,
      });
    }
    lastmediaBreakPointKeyFinded = currentBreakpointKey;
  });
  return mediaBreakpoints;
};

const getCurrentSizeClass = (
  _width: number,
  _mediaBreakpoints: mediaBreakpoints[]
): string => {
  let currentSizeClass: string = "";
  for (let mbp of _mediaBreakpoints) {
    if (_width >= mbp.from && _width < mbp.toUnder) {
      currentSizeClass = mbp.class;
      break;
    }
  }
  return currentSizeClass;
};

export { createMediaBreakpoints, getCurrentSizeClass };
