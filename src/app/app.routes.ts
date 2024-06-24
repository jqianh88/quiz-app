import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { QuizQuestionsComponent } from './quiz/quiz-questions/quiz-questions.component';
import { HeaderComponent } from './header/header.component';
import { NgModule } from '@angular/core';
import { QuizResultsComponent } from './quiz/quiz-results/quiz-results.component';

export const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'quiz-questions', component: QuizQuestionsComponent },
  { path: 'quiz-results', component: QuizResultsComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: '**', redirectTo: 'welcome' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
