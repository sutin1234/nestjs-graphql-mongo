import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BookService } from './book.service';
import { BookDto } from './dto/book.dto';
import {
  BookInput,
  CriteriaBookInput,
  IdBookInput,
  UpdateBookInput,
} from './input/book.input';

@Resolver()
export class BookResolver {
  constructor(private bookService: BookService) {}

  @Query(() => [BookDto])
  async getBooks() {
    return this.bookService.findAll();
  }

  @Query(() => [BookDto])
  async getBook(@Args('input') input: IdBookInput) {
    return this.bookService.findOne(input);
  }

  @Query(() => [BookDto])
  async getBookByCriteria(@Args('input') input: CriteriaBookInput) {
    return this.bookService.findByCriteria(input);
  }

  @Mutation(() => [BookDto])
  async deleteBook(@Args('input') input: IdBookInput) {
    return this.bookService.deleteBook(input);
  }

  @Mutation(() => BookDto)
  async createBook(@Args('input') input: BookInput) {
    return this.bookService.createBook(input);
  }

  @Mutation(() => BookDto)
  private async updateBook(@Args('input') input: UpdateBookInput) {
    return this.bookService.updateBook(input);
  }
}
