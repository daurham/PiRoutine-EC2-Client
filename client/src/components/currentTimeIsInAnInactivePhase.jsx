import React from 'react';

export default function (ct, at, h = null, m = null, op = null) {
  let getCol = (t) => Number(t.indexOf(':')); // get collin
  let getHr = (t) => Number(t.slice(0, col)); // get current hour
  let getMin = (t) => Number(t.slice(getCol(t) + 1, getCol(t) + 3)); // get current min
  let getTod = (t) => Number(t.slice(- 2, t.length - 1)); // get current AM or PM

  // ct 6:00am & at 6:05am
  if (getTod(ct) === getTod(at)) {// __:__:-- =M
    if (getHr(ct) === getHr(at)) {// ==:__:-- =M
      if (getMin(ct) > getMin(at)) {// ==:>>:-- =M
        return true; // we are in an Inactive phase
      } else if (getMin(ct) < getMin(at)) {
        return false;
      }
    } else if (getHr(ct) > getHr(at)) {//

    }
  } else { return true }
};

