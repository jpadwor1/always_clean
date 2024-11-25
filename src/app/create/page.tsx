import React from 'react'
import Dynamic from 'next/dynamic'

// Dynamic import for the component
// This is done to avoid SSR for the component
const BlogEditor = Dynamic(() => import('@/components/blogeditor/editor/blog-editor'), {
  ssr: false
})

const Page = () => {
  return (
    <div className="min-h-[calc(100dvh-20rem)] flex-col md:flex">
      <div className="flex-1 space-y-0 pt-2 sm:space-y-4 sm:pt-6">
        <div className="hidden items-center justify-between space-y-2 sm:flex sm:flex-row">
          <h2 className="text-3xl font-bold tracking-tight sm:p-4">
            Dashboard
          </h2>
        </div>
        <div className='px-8'>
          <BlogEditor />

        </div>
      </div>
    </div>
  )
}

export default Page