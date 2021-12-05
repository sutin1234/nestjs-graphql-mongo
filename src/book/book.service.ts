import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from './book.schema';
import {
  BookInput,
  CriteriaBookInput,
  IdBookInput,
  UpdateBookInput,
} from './input/book.input';

@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}

  async findAll(): Promise<Book[]> {
    return await this.bookModel.find().exec();
  }

  async findOne(input: IdBookInput) {
    return await this.bookModel.find({ _id: input._id }).exec();
  }

  async findByCriteria(input: CriteriaBookInput): Promise<Book[]> {
    console.log('input ', input);
    if (Object.keys(input).length === 0) {
      return await this.bookModel.find().exec();
    }
    const foundBook = await this.bookModel.find().exec();
    return foundBook.filter((item) => {
      return (
        item._id == input._id ||
        item.title == input.title ||
        item.author == input.author
      );
    });
  }

  async deleteBook(input: IdBookInput) {
    const foundBook = await this.findOne(input);
    await this.bookModel.findByIdAndRemove({ _id: input._id }).exec();
    return foundBook;
  }

  public async updateBook(input: UpdateBookInput): Promise<any> {
    return await this.bookModel
      .findByIdAndUpdate(
        { _id: input._id },
        {
          title: input.title,
          author: input.author,
        },
      )
      .exec();
  }

  async createBook(input: BookInput): Promise<Book> {
    const book = new this.bookModel(input);
    return await book.save();
  }
}
