import { Injectable } from '@angular/core';

import { Post } from './post.model';
import { Subject } from 'rxjs';

// It will ONLT create one instance for the entire app
@Injectable({providedIn: 'root'})

export class PostsService {
  // an instance of subject just as the event emitter
  // By default: GENERIC type: passing a list of posts
  private posts: Post[] = [];

  private postsUpdated =  new Subject<Post[]>();

  getPosts() {
    return this.posts;
  }

  // Add a Listener as postUpdated is PRIVATE
  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = {title: title, content: content};
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
  }

}
