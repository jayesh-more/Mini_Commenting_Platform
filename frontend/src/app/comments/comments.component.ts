import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommentService, Comment } from '../comment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent implements OnInit {
  comments: Comment[] = [];
  newComment = '';
  replyTo: string | null = null;
  replyContent = '';
  currentUser = '';

  constructor(private commentService: CommentService, private router: Router) {}

  ngOnInit() {
    this.currentUser = localStorage.getItem('username') || '';
    this.loadComments();
  }

  loadComments() {
    this.commentService.getComments().subscribe(comments => {
      this.comments = comments;
    });
  }

  get topLevelComments() {
    return this.comments.filter(c => !c.parent_id);
  }

  getReplies(parentId: string) {
    return this.comments.filter(c => c.parent_id === parentId);
  }

  addComment() {
    if (!this.newComment.trim()) return;
    const comment: Comment = {
      id: '',
      content: this.newComment,
      author: this.currentUser
    };
    this.commentService.addComment(comment).subscribe(() => {
      this.newComment = '';
      this.loadComments();
    });
  }

  showReplyBox(commentId: string) {
    this.replyTo = commentId;
    this.replyContent = '';
  }

  addReply(parentId: string) {
    if (!this.replyContent.trim()) return;
    const reply: Comment = {
      id: '',
      content: this.replyContent,
      parent_id: parentId,
      author: this.currentUser
    };
    this.commentService.addComment(reply).subscribe(() => {
      this.replyContent = '';
      this.replyTo = null;
      this.loadComments();
    });
  }

  cancelReply() {
    this.replyTo = null;
    this.replyContent = '';
  }

  deleteComment(commentId: string) {
    this.commentService.deleteComment(commentId).subscribe(() => {
      this.loadComments();
    });
  }

  goToLogin() {
    this.router.navigate(['/']);
  }
}