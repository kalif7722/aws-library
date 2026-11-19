type Lecture={id:string;title:string;start:number;end:number};
type Result={status:"processing"}|{status:"ready";title:string;chapters:ReadonlyArray<{slide:number}>};
export function isPartId(id:unknown):id is string;
export function discoveryPartIds(moduleId:string,known:ReadonlyArray<Lecture>,requestedPart:string|null):string[];
export function discoveredLectures(known:ReadonlyArray<Lecture>,results:Readonly<Record<string,Result>>):Lecture[];
export function readyRequestedPart(requestedPart:string|null,entries:ReadonlyArray<Lecture>,results:Readonly<Record<string,Result>>):string|null;
