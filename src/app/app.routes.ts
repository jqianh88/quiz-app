import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {WelcomeComponent} from './welcome/welcome.component';

export const routes: Routes = [
  {path: 'welcome', component: WelcomeComponent},
  // { path: 'header', component: HeaderComponent },
  {
    path: 'quiz-questions',
    loadComponent: () => import('./quiz/quiz-questions/quiz-questions.component').then(m => m.QuizQuestionsComponent),
  },
  {path: 'quiz-results', loadComponent: () => import('./quiz/quiz-results/quiz-results.component').then(m => m.QuizResultsComponent)},
  {path: '', redirectTo: 'welcome', pathMatch: 'full'},
  {path: '**', redirectTo: 'welcome'},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
