import { Request, Response } from 'express';

import booksService from '@apis/books/books.service';

const getBook = async (req: Request, res: Response) => {
  const bookId = Number(req.params.bookId);
  const bookData = await booksService.getBookData(bookId);

  // 쿠키에서 유저아이디 검출 미들웨어 추가 -> req.userId -> 북마크 확인

  res.status(200).send(bookData);
};

const getBooks = async (req: Request, res: Response) => {
  const { order, take } = req.query as unknown as {
    order: 'newest' | 'bookmark';
    take: number;
  };

  const books = await booksService.findBooks({ order, take: +take, userId: res.locals?.user.id });

  res.status(200).send(books);
};

export default {
  getBook,
  getBooks,
};
