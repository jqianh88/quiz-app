import {createAction, props} from '@ngrx/store';

export const setAbc = createAction('[Quiz] Set Abc', props<{ abc: string }>());
export const abcSet = createAction('[Quiz] Abc Set', props<{ abc: string }>());

export const defSet = createAction('[Quiz] Def Set', props<{ def: string }>());
