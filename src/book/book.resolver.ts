import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { BookService } from './book.service';
import { BookDto } from './dto/book.dto';
import {
  BookInput,
  CriteriaBookInput,
  IdBookInput,
  UpdateBookInput,
} from './input/book.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';

@Resolver('Book')
export class BookResolver {
  private pubSub: PubSub;

  constructor(private bookService: BookService) {
    this.pubSub = new PubSub();
  }

  @UseGuards(new AuthGuard())
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
    const bookDeleted = await this.bookService.deleteBook(input);
    await this.pubSub.publish('bookDeleted', { bookDeleted });
    return bookDeleted;
  }

  @Mutation(() => BookDto)
  async createBook(@Args('input') input: BookInput) {
    const bookAdded = await this.bookService.createBook(input);
    await this.pubSub.publish('bookAdded', { bookAdded });
    return bookAdded;
  }

  @Mutation(() => BookDto)
  private async updateBook(@Args('input') input: UpdateBookInput) {
    const bookUpdated = await this.bookService.updateBook(input);
    await this.pubSub.publish('bookUpdated', { bookUpdated });
    return bookUpdated;
  }

  @Subscription(() => BookDto, {
    filter: (payload, variables) => {
      return payload.bookAdded.title == variables.title;
    },
  })
  async bookAdded(@Args('title') title: string) {
    return this.pubSub.asyncIterator('bookAdded');
  }

  @Subscription(() => BookDto, {
    filter: (payload, variables) => {
      return payload.bookAdded.title == variables.title;
    },
  })
  async bookUpdated(@Args('title') title: string) {
    return this.pubSub.asyncIterator('bookUpdated');
  }

  @Subscription(() => BookDto, {
    filter: (payload, variables) => {
      return payload.bookAdded.title == variables.title;
    },
  })
  async bookDeleted(@Args('title') title: string) {
    return this.pubSub.asyncIterator('bookDeleted');
  }
}
