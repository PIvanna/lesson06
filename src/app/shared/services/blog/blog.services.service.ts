import { Injectable } from '@angular/core';
import { IBlog } from '../../interfaces/blog.interface';

@Injectable({
  providedIn: 'root'
})
export class BlogServicesService {
  private blogs: Array<IBlog> = [
    {
      id: 1,
      postedBy: 'admin',
      topic: 'First post',
      date: new Date(),
      message: 'Sign up to create your account and to start to use Angular Blog',
    }
  ];

  constructor() { }

  getBlogs(): Array<IBlog> {
    return this.blogs;
  }

  addBlog(blog: IBlog): void {
    this.blogs.push(blog);
  }

  updateBlod(blog: IBlog, id: number): void {
    const index = this.blogs.findIndex(blog => blog.id === id);
    this.blogs.splice(index, 1, blog);
  }

  deleteBlog(id: number): void {
    const index = this.blogs.findIndex(blog => blog.id === id);
    this.blogs.splice(index, 1);
  }
}
