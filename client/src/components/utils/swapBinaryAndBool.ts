type BinaryOrBool = 1 | 0 | '1' | '0' | true | false | 'true' | 'false';

export default (val: BinaryOrBool) => {
  if (val === true) return 1;
  if (val === false) return 0;
  if (val === 'true') return 1;
  if (val === 'false') return 0;
  if (val === 1) return true;
  if (val === 0) return false;
  if (val === '1') return true;
  if (val === '0') return false;
  return undefined;
};
