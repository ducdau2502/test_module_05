import { Component, OnInit } from '@angular/core';
import {BookService} from "../book.service";
import {Book} from "../book";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  book!: Book;
  books!: Book[];
  id!: number;

  bookForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    author: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  })

  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.getAllBook();
  }

  getAllBook() {
    this.bookService.getAllBook().subscribe(data => {
      this.books = data;
    })
  }

  getBook(id: any) {
    this.bookService.getBookById(id).subscribe(data => {
      this.id = id;
      this.openModal();
      // @ts-ignore
      document.getElementById("updateBook").style.display = "block";
      // @ts-ignore
      document.getElementById("saveBook").style.display = "none";
      // @ts-ignore
      document.getElementById("modalHeader").innerHTML = "Update Book";
      this.bookForm = new FormGroup({
        title: new FormControl(data.title, [Validators.required]),
        author: new FormControl(data.author, [Validators.required]),
        description: new FormControl(data.description, [Validators.required]),
      });
    })
  }

  updateBook() {
    const form = this.bookForm.value;
    const book = {
      title: form.title,
      author: form.author,
      description: form.description
    }
    this.bookService.updateBook(book, this.id).subscribe(data => {
      this.cloneModal();
      this.showSuccessToast(data, "Update")
      this.getAllBook();
    });
  }

  saveBook() {
    const form = this.bookForm.value;
    const book = {
      title: form.title,
      author: form.author,
      description: form.description
    }
    this.bookService.saveBook(book).subscribe(data => {
        this.cloneModal();
        this.getAllBook();
        this.showSuccessToast(book, "Create")
      }
    );
  }

  deleteBook(id: any) {
    this.bookService.deleteBookById(id).subscribe(data => {
        this.getAllBook();
        this.cloneDeleteModal();
        this.showSuccessToast(data, "Delete")
      }
    )
  }


  openModal() {
    // @ts-ignore
    document.getElementById("myModal").style.display = "block";
    // @ts-ignore
    document.getElementById("saveBook").style.display = "block";
    // @ts-ignore
    document.getElementById("updateBook").style.display = "none";
  }

  cloneModal() {
    this.bookForm.reset();
    // @ts-ignore
    document.getElementById("myModal").style.display = "none";
    window.onclick = function (ev) {
      if (ev.target == document.getElementById("myModal")) {
        // @ts-ignore
        document.getElementById("myModal").style.display = "none";
      }
    }
  }

  viewProduct(id: any) {
    this.bookService.getBookById(id).subscribe(data => {
      this.book = data;
      this.books = [];
      this.books.push(this.book);

    });
  }

  deleteModal(id: any) {
    // @ts-ignore
    document.getElementById("deleteModal").style.display = "block";
    this.bookService.getBookById(id).subscribe( data => {
      this.book = data;

    });
  }

  cloneDeleteModal() {
    // @ts-ignore
    document.getElementById("deleteModal").style.display = "none";
    window.onclick = function (ev) {
      if (ev.target == document.getElementById("deleteModal")) {
        // @ts-ignore
        document.getElementById("deleteModal").style.display = "none";
      }
    }
  }

  toast({ title = "", message = "" }) {
    const main = document.getElementById("toast");
    if (main) {
      const toast = main;

      // Auto remove toast
      const autoRemoveId = setTimeout(function () {
        main.style.display= "none";
      }, 3000 + 1000);

      const delay = (3000 / 1000).toFixed(2);

      toast.classList.add("toast", `toast--success`);
      toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`;

      toast.innerHTML = `
                    <div class="toast__body">
                        <h3 class="toast__title">${title}</h3>
                        <p class="toast__msg">${message}</p>
                    </div>
                `;
      main.style.display= "block";
    }
  }

  showSuccessToast(data: Book, str: String) {
    if (data != undefined) {
      this.toast({
        title: `${str} Success!`,
        message: `${str} ${data.title} successful!!!`,
      });
    } else {
      this.toast({
        title: `${str} Success!`,
        message: `${str} successful!!!`,
      });
    }

  }

  get title() {
    return this.bookForm?.get('title');
  }

  get author() {
    return this.bookForm?.get('author');
  }

  get description() {
    return this.bookForm?.get('description');
  }

}
