import {provideHttpClient, withFetch} from '@angular/common/http';
import {ApplicationConfig} from '@angular/core';
import {provideClientHydration} from '@angular/platform-browser';
import {provideRouter} from '@angular/router';
import {provideEffects} from '@ngrx/effects';
import {provideState, provideStore} from '@ngrx/store';
import {provideStoreDevtools} from '@ngrx/store-devtools';

import {QuizEffects} from './+state/quiz.effects';
import {QUIZ_FEATURE_KEY, quizReducer} from './+state/quiz.reducer';
import {routes} from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideClientHydration(),
    provideStore([]),
    provideState(QUIZ_FEATURE_KEY, quizReducer),
    provideEffects([QuizEffects]),
    provideStoreDevtools(),
  ],
};
