import {createState} from './engine.mjs';
// Never resume repaired resources on a new entry. Only the learning mode survives.
export function beginAttempt(lab, saved){
 let mode=null;try{const value=typeof saved==='string'?JSON.parse(saved):saved;if(value?.mode==='guided'||value?.mode==='challenge')mode=value.mode;}catch{}
 return {state:createState(lab),mode,hint:false};
}
