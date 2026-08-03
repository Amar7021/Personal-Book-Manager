"use client";

import { useSelector } from "react-redux";
import DashboardStats from "./_components/DashboardStats";
import { useBooks } from "@/hooks/book";
import Loader from "@/components/loader/Loader";
import { useEffect, useState } from "react";
import DashboardFilters from "./_components/DashboardFilters";
import BookDialog from "./_components/BookDialog";
import BookList from "./_components/BookList";
import DeleteBookDialog from "./_components/DeleteBookDialog";
import BookSkeleton from "./_components/BookSkeleton";
import DashboardPagination from "./_components/DashboardPagination";
import { useDebounce } from "@/hooks/useDebounce";

export default function DashboardPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [tag, setTag] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [deleteBook, setDeleteBook] = useState(null);

  const [page, setPage] = useState(1);

  const { user } = useSelector((state) => state.auth);
  const debouncedSearch = useDebounce(search);
  const debouncedTagSearch = useDebounce(tag);

  const { data, isLoading } = useBooks({
    page,
    limit: 5,
    search: debouncedSearch,
    status,
    tag: debouncedTagSearch,
  });
  // need to yse in after filters in jsx
  // if (isLoading) {
  //   return <Loader text="Loading your library..." />;
  // }

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, status, debouncedTagSearch]);

  const pagination = data?.paginationObj;

  const books = data?.books || [];
  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">
          Welcome back, {user?.username}
        </h1>
        <p className="mt-2 text-muted-foreground">
          Manage and organize your personal library.
        </p>
      </div>
      <DashboardStats books={books} />
      <DashboardFilters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        tag={tag}
        setTag={setTag}
        onAddBook={() => {
          setSelectedBook(null);
          setOpen(true);
        }}
      />
      {isLoading ?
        <div className="space-y-4">
          {[...Array(5)].map((_, index) => (
            <BookSkeleton key={index} />
          ))}
        </div>
        : <><BookList
          books={books}
          onEdit={(book) => {
            setSelectedBook(book);
            setOpen(true);
          }}
          onDelete={(book) => {
            setDeleteBook(book);
          }}
        /><DashboardPagination
            pagination={pagination}
            onPageChange={setPage}
          /></>}
      {
        open && <BookDialog
          open={open}
          onOpenChange={setOpen}
          book={selectedBook}
        />
      }
      <DeleteBookDialog
        open={Boolean(deleteBook)}
        onOpen={() => setDeleteBook(null)}
        book={deleteBook}
      />
    </section>
  );
}
