import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { CommentsService } from '../../services/comments';

@Component({
  selector: 'app-comments-section',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comments-section.html',
  styleUrl: './comments-section.scss'
})
export class CommentsSectionComponent implements OnInit {
  @Input() postId: string = '';
  public commentsList: string[] = [];
  public newComment: string = '';

  constructor(private commentsService: CommentsService) {}

  ngOnInit(): void {
    this.refreshComments();
  }

  refreshComments() {
    this.commentsList = this.commentsService.getComments(this.postId);
  }

  add() {
    if (this.newComment.trim()) {
      this.commentsService.addComment(this.postId, this.newComment);
      this.newComment = '';
      this.refreshComments();
    }
  }
}