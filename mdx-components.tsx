import type { MDXComponents } from 'mdx/types'
import Image, { ImageProps } from 'next/image'
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardDescription, CardTitle } from '@/components/ui/card';
import { CardContent } from '@/components/ui/card';
import Link from 'next/link';

export function ErrorAlert({ title, children }: { title?: string, children: React.ReactNode }) {
  return (
    <div className="bg-red-50 border-s-4 border-red-500 p-4 dark:bg-red-800/20 mb-4" role="alert">
      <div className="flex">
        <div className="shrink-0">
          <span className="inline-flex justify-center items-center size-8 rounded-full border-4 border-red-100 bg-red-200 text-red-800 dark:border-red-950 dark:bg-red-800 dark:text-red-100">
            <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </span>
        </div>
        <div className="ms-4">
          <h3 id="hs-bordered-red-style-label" className="text-gray-800 font-semibold dark:text-white mb-2">
            {title || 'Error!'} {/* Use the title prop, with a fallback */}
          </h3>
          <div className="text-lg text-gray-700 dark:text-neutral-300 m-0">
            {children} {/* Render children as the body */}
          </div>
        </div>
      </div>
    </div>
  );
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold mb-3">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold mb-2">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-bold mb-2">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="text-lg my-2">{children}</p>
    ),
    img: (props) => (
      <Image
        sizes="100vw"
        style={{ width: '100%', height: 'auto' }}
        {...(props as ImageProps)}
      />
    ),
    ErrorAlert,
    Button,
    Card,
    CardHeader,
    CardDescription,
    CardContent,
    CardTitle,
    Link,
    ...components,
  }
}