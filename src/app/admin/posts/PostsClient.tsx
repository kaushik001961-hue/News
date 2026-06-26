"use client";

import FilterBar from "./FilterBar";
import { useState } from "react";
import SearchBar from "./SearchBar";
import PostsTable from "./PostsTable";


type Post = {
  id: string;
  title: string;
  image: string | null;
  status: string;
  featured: boolean;
 breaking: boolean;
  views: number;
  createdAt: Date;
  author: {
    name: string;
  };
  category: {
    name: string;
  } | null;
};

interface Props {
  posts: Post[];
}

export default function PostsClient({ posts }: Props) {
  const [search, setSearch] = useState("");

const [status, setStatus] = useState("");
const [category, setCategory] = useState("");
const [featured, setFeatured] = useState("");
const [breaking, setBreaking] = useState("");

function resetFilters() {
  setSearch("");
  setStatus("");
  setCategory("");
  setFeatured("");
  setBreaking("");
}



  return (
    <div className="space-y-6">
      <SearchBar onSearch={setSearch} />

<FilterBar
  status={status}
  category={category}
  featured={featured}
  breaking={breaking}
  setStatus={setStatus}
  setCategory={setCategory}
  setFeatured={setFeatured}
  setBreaking={setBreaking}
  onReset={resetFilters}
/>

<PostsTable
  posts={posts}
  search={search}
  status={status}
  category={category}
  featured={featured}
  breaking={breaking}
/>
    </div>

    
  );
}