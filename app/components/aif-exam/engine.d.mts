type Q={id:string;domain:string;type:string;correct:number[]};
export const DURATION:number;
export function correct(q:Q,a?:number[]):boolean;
export function results(bank:Q[],answers:Record<string,number[]>):{correct:number;total:number;domains:Record<string,{correct:number;total:number}>};
export function expired(deadline:number|null,now:number):boolean;
