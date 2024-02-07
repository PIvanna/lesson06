import { Component, OnInit } from '@angular/core';
import { IUser } from '../shared/interfaces/user.interface';
import { IBlog } from '../shared/interfaces/blog.interface';
import { UserServicesService } from '../shared/services/user/user.services.service';
import { BlogServicesService } from '../shared/services/blog/blog.services.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public adminUser!: IUser[];
  public adminBlog!: IBlog[];
  public signInStatus = false;
  public nameUser!: string;
  public profileStatus = false;
  public inputEmailSignIn!: string;
  public inputPasswordSignIn!: string;
  public isColorEmailSignIn = true;
  public isColorPasswordSignIn = true;
  public activeStatus = false;
  public activeStatusBut = false;
  public addPostStatus = false;
  public inputTitle = '';
  public textarea = '';
  public isColorTitle = true;
  public isColorTextarea = true;
  public EditStatus = false;
  public editID!: number;
  public SignUpStatus = false;
  public isColorUsername = true;
  public inputUsername = '';
  public isColorEmailSignUp = true;
  public inputEmailSignUp = '';
  public isColorPasswordSignUp = true;
  public inputPasswordSignUp: string = '';
  public author = '';
  public nameUserAfterEdit = '';




  constructor(
    private UserService: UserServicesService,
    private BlogService: BlogServicesService,
  ) { }

  ngOnInit(): void {
    this.getUsers();
    this.getBlogs();
  }

  getUsers(): void {
    this.adminUser = this.UserService.getUsers();
  }

  getBlogs(): void {
    this.adminBlog = this.BlogService.getBlogs();
  }

  SignIn(): void {
    this.signInStatus = true;
  }

  closeFormSignIn(): void {
    this.signInStatus = false;
    this.inputPasswordSignIn = '';
    this.inputEmailSignIn = '';
  }

  submitSignIn(): void {
    const regPassword = /^[a-zA-Z0-9$&]{2,15}$/;
    const regEmail = /^[a-zA-Z]+[a-zA-Z0-9]{0,15}@((gmail\.com)|(ukr\.net))$/;
    if (regPassword.test(this.inputPasswordSignIn) && regEmail.test(this.inputEmailSignIn)) {
      this.isColorPasswordSignIn = true;
      this.isColorEmailSignIn = true;
      const foundUser = this.adminUser.find(user => user.email === this.inputEmailSignIn && user.password === this.inputPasswordSignIn);
      if (foundUser) {
        if (foundUser.username == 'admin') {
          this.profileStatus = true;
          this.nameUser = foundUser.username;
          this.activeStatus = true;
          this.activeStatusBut = true;
          this.inputPasswordSignIn = '';
          this.inputEmailSignIn = '';
          this.signInStatus = false;
        }
        else if (foundUser.username != 'admin') {
          this.author = foundUser.username;
          this.profileStatus = true;
          this.nameUser = foundUser.username;
          this.activeStatus = true;
          this.inputPasswordSignIn = '';
          this.inputEmailSignIn = '';
          this.signInStatus = false;
        }
        else {
          this.isColorPasswordSignIn = false;
          this.isColorEmailSignIn = false;
        }
      }



    }
    else {
      if (!regPassword.test(this.inputPasswordSignIn)) {
        this.isColorPasswordSignIn = false;
      }
      else {
        this.isColorPasswordSignIn = true;
      }
      if (!regEmail.test(this.inputEmailSignIn)) {
        this.isColorEmailSignIn = false;
      }
      else {
        this.isColorEmailSignIn = true;
      }
    }
  }

  addPost(): void {
    this.addPostStatus = true;
  }

  closeFormAddPost(): void {
    this.inputTitle = '';
    this.textarea = '';
    this.addPostStatus = false;
    this.EditStatus = false;
    this.nameUserAfterEdit = '';
    this.editID = 0;
  }

  submitAddPost(): void {
    if (this.inputTitle !== '' && this.textarea !== '') {
      this.isColorTitle = true;
      this.isColorTextarea = true;
      const newBlog: IBlog = {
        id: 1,
        postedBy: this.nameUser,
        topic: this.inputTitle,
        date: new Date(),
        message: this.textarea,
      };
      if (this.adminBlog.length > 0) {
        const id = this.adminBlog.slice(-1)[0].id;
        newBlog.id = id + 1;
      }
      this.BlogService.addBlog(newBlog);
      this.inputTitle = '';
      this.textarea = '';
      this.addPostStatus = false;
    }
    else {
      if (this.inputTitle == '') {
        this.isColorTitle = false;
      }
      else {
        this.isColorTitle = true;
      }
      if (this.textarea == '') {
        this.isColorTextarea = false;
      }
      else {
        this.isColorTextarea = true;
      }
    }
  }


  edit(blog: IBlog) {
    this.addPostStatus = true;
    this.EditStatus = true;
    this.inputTitle = blog.topic;
    this.textarea = blog.message;
    this.editID = blog.id;
    this.nameUserAfterEdit = blog.postedBy
  }

  SaveEditPost() {
    if (this.inputTitle != '' && this.textarea != '') {
      this.isColorTitle = true;
      this.isColorTextarea = true;
      const updateBlog: IBlog = {
        id: this.editID,
        postedBy: this.nameUserAfterEdit,
        topic: this.inputTitle,
        date: new Date(),
        message: this.textarea,
      };
      this.BlogService.updateBlod(updateBlog, this.editID);
      this.inputTitle = '';
      this.textarea = '';
      this.nameUserAfterEdit = '';
      this.addPostStatus = false;
      this.EditStatus = false;
      this.editID = 0;
    }
    else {
      if (this.inputTitle == '') {
        this.isColorTitle = false;
      }
      else {
        this.isColorTitle = true;
      }
      if (this.textarea == '') {
        this.isColorTextarea = false;
      }
      else {
        this.isColorTextarea = true;
      }
    }

  }

  delete(blog: IBlog) {
    this.BlogService.deleteBlog(blog.id);
  }

  SignOut() {
    this.nameUser = '';
    this.profileStatus = false;
    this.activeStatus = false;
    this.activeStatusBut = false;
    this.author = '';
  }

  closeFormSignUp(): void {
    this.SignUpStatus = false;
    this.isColorUsername = true;
    this.inputUsername = '';
    this.isColorEmailSignUp = true;
    this.inputEmailSignUp = '';
    this.isColorPasswordSignUp = true;
    this.inputPasswordSignUp = '';
  }

  signOutOn(): void {
    this.SignUpStatus = true;
  }

  submitSignUp() {
    const regLogin = /^\w{2,15}$/;
    const regPassword = /^[a-zA-Z0-9$&]{2,15}$/;
    const regEmail = /^[a-zA-Z]+[a-zA-Z0-9]{0,15}@((gmail\.com)|(ukr\.net))$/;
    if (regLogin.test(this.inputUsername) && regPassword.test(this.inputPasswordSignUp) && regEmail.test(this.inputEmailSignUp)) {
      this.isColorUsername = true;
      this.isColorEmailSignUp = true;
      this.isColorPasswordSignUp = true;
      if ((!(this.adminUser.some(user => user.email === this.inputEmailSignUp))) && (!(this.adminUser.some(user => user.username === this.inputUsername)))) {
        const user: IUser = {
          id: 1,
          username: this.inputUsername,
          email: this.inputEmailSignUp,
          password: this.inputPasswordSignUp
        }
        if (this.adminUser.length > 0) {
          const id = this.adminUser.slice(-1)[0].id;
          user.id = id + 1;
        }
        this.UserService.addUser(user);
        this.inputPasswordSignIn = user.password;
        this.inputEmailSignIn = user.email;
        this.submitSignIn();
        this.SignUpStatus = false;
        this.inputUsername = '';
        this.inputEmailSignUp = '';
        this.inputPasswordSignUp = '';
      }
      else {
        if (this.adminUser.some(user => user.email === this.inputEmailSignUp)) {
          this.isColorEmailSignUp = false;
        }
        else {
          this.isColorEmailSignUp = true;
        }
        if (this.adminUser.some(user => user.username === this.inputUsername)) {
          this.isColorUsername = false;
        }
        else {
          this.isColorUsername = true;
        }
      }
    }
    else {
      if (!regLogin.test(this.inputUsername)) {
        this.isColorUsername = false;
      }
      else {
        this.isColorUsername = true;
      }
      if (!regPassword.test(this.inputPasswordSignUp)) {
        this.isColorPasswordSignUp = false;
      }
      else {
        this.isColorPasswordSignUp = true;
      }
      if (!regEmail.test(this.inputEmailSignUp)) {
        this.isColorEmailSignUp = false;
      }
      else {
        this.isColorEmailSignUp = true;
      }
    }
  }
}


