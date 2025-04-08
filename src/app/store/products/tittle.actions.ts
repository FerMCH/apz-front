import { createActionGroup, props } from '@ngrx/store';

export const TittleActions = createActionGroup({
  source: 'Layout',
  events: {
    'Update Layout': props<{ tittle: string }>()
  }
});
