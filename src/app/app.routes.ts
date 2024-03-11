import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { QuizQuestionsComponent } from './quiz-questions/quiz-questions.component';
import { HeaderComponent } from './header/header.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  {path: "welcome", component: WelcomeComponent},
  {path: "header", component: HeaderComponent},
  {path: "quiz-questions", component: QuizQuestionsComponent},
  {path: "", redirectTo: "welcome", pathMatch: "full"},
  {path: "**", redirectTo: "welcome"}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
