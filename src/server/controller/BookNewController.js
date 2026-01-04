import Book from '../model/BookModel.js'

export const createBook = async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDashBoardData = async (req, res) => {
  try {
    const books = await Book.find({});
    const totalBooks = books.length;
    const paidBooks = books.filter((book) => book.price > 0);
    const freeBooks = books.filter((book) => book.price === 0);
    res.status(200).json({
      result:{
        totalBooks,
        paidBooks:paidBooks.length,
        freeBooks:freeBooks.length,
      },
      books: books,
    });
  } catch (error) { 
      res.status(500).json({ message: "Get Book Error" });
  }
};


export const getBooks = async (req, res) => {
  const { page,pageSize } = req.query;
  if (!page) {
    return res.status(400).json({ message: "Page number is required" });
  }
  const currentPage=Number(page);
  try {
    const limit = pageSize ? parseInt(pageSize) : 25;
    const offset = (page - 1) * limit;
    const totalBooks = await Book.find();
    const totalPages = Math.ceil(totalBooks.length / limit);

    const books = await Book.find({})
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit);

    res.status(200).json(
     
        {
        success: true,
           books: books,
        totalPages,
        currentPage: currentPage,
       }
      
    );
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ message: "Server Error" });

    }
};
export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedBook = await Book.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: updatedBook,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
