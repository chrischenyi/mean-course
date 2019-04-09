import { Component, Input, OnInit, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy{
  posts: Post[] = [];
  private postSub: Subscription;
  // Keyword: public
  // Helps to create a property and store the incoming value in that property
  constructor(public postsService: PostsService) {}

  ngOnInit() {
    this.posts = this.postsService.getPosts();

    /**
     * RETURN observable
     * subscribe() takes in 3 args
     * 1st arg -> fucntions executed whenever new data is emitted
     * 2nd arg -> whenever an error is emitted
     * 3rd arg -> whenever the observable is completed and no more values are expected
     * (This is a infinitely living subject so 3rd arg would not happen )
     */
    this.postSub = this.postsService.getPostUpdateListener().subscribe((posts: Post[]) => {
        this.posts = posts;
    });
  }

  /**
   * Remove subscription and prevent memory leak
   */
  ngOnDestroy() {
    this.postSub.unsubscribe();
  }
}

