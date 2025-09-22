"use client";

import { useState, useEffect, useMemo } from "react";
import { Search, X, ExternalLink } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTranslations, useLocale } from "next-intl";
import Fuse from "fuse.js";

interface SearchResult {
  id: string;
  title: string;
  path: string;
  content: string;
  searchable: string;
  language: 'en' | 'fa';
  category: string;
}

export default function SearchBar() {
  const t = useTranslations("Header");
  const locale = useLocale() as 'en' | 'fa';
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [index, setIndex] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetch('/search-index.json')
      .then((res) => res.json())
      .then((data) => setIndex(data))
      .catch((err) => console.error('Error loading search index:', err));
  }, []);

  const fuse = useMemo(() => {
    if (!index.length) return null;
    return new Fuse(index, {
      keys: ['title', 'searchable'],
      threshold: 0.4,
      includeScore: true,
      ignoreLocation: true,
    });
  }, [index]);

  const handleSearch = (value: string) => {
    setQuery(value);
    if (!value.trim() || !fuse) {
      setResults([]);
      return;
    }
    const searchResults = fuse
      .search(value)
      .map(({ item }) => item)
      .filter((item) => item.language === locale);
    setResults(searchResults);
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setQuery("");
      setResults([]);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" aria-label={t("search.ariaLabel")}>
          <Search className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent
        className="max-w-[90vw] sm:max-w-[600px] max-h-[80vh] p-0 rounded-lg"
        dir={locale === 'fa' ? 'rtl' : 'ltr'}
        closeButton={false}
      >
        <div className="sticky top-0 bg-background p-4 border-b flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="h-5 w-5 text-muted-foreground absolute left-3 top-1/2 transform -translate-y-1/2" />
            <Input
              type="text"
              placeholder={t("search.placeholder") || "Search..."}
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              className="flex-1 pl-10"
              autoFocus
            />
          </div>
          {query && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setQuery("");
                setResults([]);
              }}
            >
              <X className="h-5 w-5 text-primary" />
            </Button>
          )}
        </div>
        <ScrollArea className="h-[calc(80vh-72px)] p-4">
          {results.length > 0 ? (
            <ul className="space-y-3">
              {results.map((result) => (
                <li
                  key={result.id}
                  className="p-4 bg-card rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer group border border-border"
                >
                  <a href={result.path} className="block group-hover:underline">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-base text-primary">
                        {result.title}
                      </h3>
                      <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                        {result.category}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                      {result.content}
                    </p>
                    <div className="flex items-center gap-2 mt-3 text-sm text-primary/80 hover:text-primary transition-colors duration-200">
                      <ExternalLink className="h-4 w-4" />
                      {t("search.goToPage") || "Go to page"}
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          ) : query ? (
            <p className="text-muted-foreground text-center py-8">
              {t("search.noResults") || "No results found."}
            </p>
          ) : (
            <p className="text-muted-foreground text-center py-8">
              {t("search.startTyping") || "Start typing to search..."}
            </p>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}