import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://root:123456@localhost:27017'),
    BookModule,
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      // subscriptions: {
      //   'graphql-ws': true,
      // },
      autoSchemaFile: true,
      debug: false,
      playground: true,
      context: ({ req }) => ({ headers: req.headers }),
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
