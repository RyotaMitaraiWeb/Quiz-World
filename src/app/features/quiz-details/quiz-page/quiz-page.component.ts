import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Data } from '@angular/router';
import { Observable, Subscription, map } from 'rxjs';
import { SharedModule } from '../../../shared/shared.module';
import { MatTabsModule } from '@angular/material/tabs';
import { IQuizDetails } from '../../../../types/responses/quiz.types';
import { IAppStore } from '../../../../types/store/store.types';
import { Store } from '@ngrx/store';
import { RoleService } from '../../../core/role-service/role.service';
import { selectUser } from '../../../store/user/user.selector';
import { MatChipsModule } from '@angular/material/chips';
import { QuizSessionComponent } from '../session/quiz-session/quiz-session.component';
@Component({
  selector: 'app-quiz-page',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    MatTabsModule,
    MatChipsModule,
    QuizSessionComponent,
  ],
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.scss']
})
export class QuizPageComponent implements OnInit, OnDestroy {
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly store: Store<IAppStore>,
    private readonly roleService: RoleService,
  ) { }

  private quizSub = new Subscription();
  private user = this.store.select(selectUser);

  protected get canEdit(): Observable<boolean> {
    console.log(this.roleService.isModerator());
    
    return this.user.pipe(
      map(u => this.roleService.isModerator() || this.quiz.creatorId === u.id));
  }

  protected get canDelete(): Observable<boolean> {
    return this.user.pipe(
      map(u => this.roleService.isModerator() || this.quiz.creatorId === u.id));
  }

  ngOnInit(): void {
    this.quizSub = this.getResolvedData().subscribe(data => {
      
      
      this.quiz = data['quiz'];
      console.log(this.quiz);
      
    });
  }

  getResolvedData(): Observable<Data> {
    return this.activatedRoute.data;
  }

  public quiz: IQuizDetails = {
    id: 0,
    title: '',
    description: '',
    instantMode: false,
    questions: [],
    creatorId: ''
  }

  ngOnDestroy(): void {
    this.quizSub.unsubscribe();
  }
}
