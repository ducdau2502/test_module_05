import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.prod";
import {Observable} from "rxjs";
import {Book} from "./book";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private API_BOOK = environment.API_LOCAL;

  constructor(private http: HttpClient) { }

  getAllBook(): Observable<Book[]> {
    return this.http.get<Book[]>(this.API_BOOK);
  }

  getBookById(id: any): Observable<Book> {
    return this.http.get<Book>(this.API_BOOK +`/${id}`);
  }

  deleteBookById(id: any): Observable<Book> {
    return this.http.delete<Book>(this.API_BOOK +`/${id}`);
  }

  saveBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.API_BOOK, book);
  }

  updateBook(book: Book, id: any): Observable<Book> {
    return this.http.put<Book>(this.API_BOOK +`/${id}`, book);
  }
}
