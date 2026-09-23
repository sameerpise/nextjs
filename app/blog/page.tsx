import Link from 'next/link';
import { ArrowRight, Calendar, BookOpen } from 'lucide-react';

interface Post {
    slug: string;
    title: string;
    description: string;
    date: string;
}

const posts: Post[] = [
    {
        slug: 'nextjs-app-router-guide',
        title: 'Next.js App Router Guide',
        description: 'Learn dynamic routing and server components from scratch. A comprehensive look into building modern web applications.',
        date: 'March 20, 2026',
    },
    {
        slug: 'styling-with-tailwind-css',
        title: 'Styling with Tailwind CSS',
        description: 'Build modern responsive cards and UI layouts quickly using utility classes and utility-first CSS principles.',
        date: 'March 18, 2026',
    },
    {
        slug: 'seo-friendly-slugs',
        title: 'Creating SEO-Friendly Slugs',
        description: 'Why clean URL parameters improve indexing and user experience. A deep dive into SEO basics for developers.',
        date: 'March 12, 2026',
    },
];

export default function BlogPage() {
    return (
        <main className="min-h-screen pt-24 pb-12 px-6">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60 shadow-sm mb-6">
                        <BookOpen className="w-4 h-4" />
                        Insights & Guides
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 mb-4">
                        Latest{" "}
                        <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                            Articles
                        </span>
                    </h1>
                    <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                        Discover the latest trends, tips, and best practices in modern web development.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {posts.map((post) => (
                        <article
                            key={post.slug}
                            className="group flex flex-col justify-between p-6 rounded-3xl bg-white/60 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm hover:shadow-md hover:border-indigo-500/30 dark:hover:border-indigo-400/30 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
                        >
                            <Link href={`/blog/${post.slug}`} className="absolute inset-0 z-10">
                                <span className="sr-only">View Article</span>
                            </Link>
                            
                            <div className="relative z-20 pointer-events-none">
                                <div className="flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-4">
                                    <Calendar className="w-3.5 h-3.5" />
                                    <time dateTime={post.date}>{post.date}</time>
                                </div>
                                <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                    {post.title}
                               </h2>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6 line-clamp-3">
                                    {post.description}
                                </p>
                            </div>
                            
                            <div className="relative z-20 flex items-center text-sm font-semibold text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors mt-auto pt-2">
                                Read Article 
                                <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </main>
    );
}