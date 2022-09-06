// 1.
const num: number = 10;
const fiveTimes = (n: number): number => 5 * n;

// 2.
type PowerStatusType = boolean | 'off';
let powerStatus: PowerStatusType = true;
const togglePower = (isOn: PowerStatusType): void => {
  isOn === 'off' ? console.log('Power is Permanently OFF') : console.log(`Power is ${isOn ? 'On' : 'Off'}`);
  isOn === true ? isOn = false : isOn = true;
};

// 3.
const permanentlyPowerOff = (): void => {
  powerStatus = 'off';
};

/* 
// 1.
const num = 10; // or const num: number = 10;
function fiveTimes(n: number): number {
  return 5 * n
};

// 2.
let powerStatus: boolean | string = true;
function togglePower(isOn: boolean | string) {
  isOn === true ? isOn = false : isOn = true;
  isOn === 'off' ? console.log('Power is Permanently OFF') : console.log(`Power is ${isOn ? 'On' : 'Off'}`);
};

// 3.
function permanentlyPowerOff() {
  powerStatus = 'off';
};
// */