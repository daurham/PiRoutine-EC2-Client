export default function range(s: number, e:number, st = 1): number[] {
  let result = [s];
  if (s === e) { return [e]; }
  if (s < e) { result = [...result, ...range(s + st, e)]; }
  return result;
}
