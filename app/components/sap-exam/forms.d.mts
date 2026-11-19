export type SapDomain = '1' | '2' | '3' | '4' | '5';
export type FormQuestion = {
  id: string;
  domain: string;
  stem: string;
  options: string[];
  correct: number[];
  explanation: string;
  image: string;
  reviewStatus?: string;
  revision?: string;
  preserveChoiceOrder?: boolean;
  optionReasons?: string[];
};
export type FormMode = 'practice' | 'exam';
export type FormSlot = {id:string; revision:string; choiceOrder:number[]; scored:boolean};
export type FormDescriptor = {version:1; kind:'diagnostic'|'full-mock'; mode:FormMode; durationMs:number|null; slots:FormSlot[]};
export type Form<T extends FormQuestion> = {descriptor:FormDescriptor; questions:T[]};
export type FormAttempt = {
  schema:number; mode:FormMode; questionIds:string[]; form:FormDescriptor; startedAt:number; deadline:number|null;
  answers:Record<string,number[]>; checked:string[]; flagged:string[]; submittedAt:number|null; submissionReason:string|null;
};
export type MockReadiness = {
  available:boolean; eligible:number; excluded:number; byDomain:Record<SapDomain,number>; missingByDomain:Record<SapDomain,number>; missingTotal:number; minimumAdditional:number;
};
export const SAP_C03_WEIGHTS: Readonly<Record<SapDomain, number>>;
export const DIAGNOSTIC_COUNT: 28;
export const DIAGNOSTIC_MINUTES: 90;
export const FULL_MOCK_COUNT: 75;
export const FULL_MOCK_SCORED: 65;
export const FULL_MOCK_MINUTES: 180;
export const FULL_MOCK_QUOTAS: Readonly<Record<SapDomain, number>>;
export function assessFullMock(bank: unknown): MockReadiness;
export function createDiagnosticForm<T extends FormQuestion>(questions:readonly T[],mode:FormMode):Form<T>;
export function createFullMockForm<T extends FormQuestion>(bank:readonly T[],seed:string,mode?:FormMode):Form<T>;
export function hydrateForm<T extends FormQuestion>(descriptor:unknown,bank:readonly T[]):Form<T>;
export function startFormAttempt<T extends FormQuestion>(form:Form<T>,now?:number):FormAttempt;
export function scoreForm<T extends FormQuestion>(attempt:Pick<FormAttempt,'mode'|'submittedAt'|'questionIds'|'answers'> & Partial<Pick<FormAttempt,'form'>>,form:Form<T>):{
  correct:number; total:number; unanswered:number; unansweredAll:number; percentage:number;
  domains:Partial<Record<SapDomain,{correct:number;total:number}>>;
  results:{id:string; correct:boolean; answered:boolean; scored:boolean}[];
};
