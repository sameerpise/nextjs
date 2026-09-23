import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';

// Centralize or export this data so both pages can read from the same source
const posts = [
    {
        slug: 'nextjs-app-router-guide',
        title: 'Next.js App Router Guide',
        description: 'Learn dynamic routing and server components from scratch.',
        date: 'March 20, 2026',
        readTime: '5 min read',
        author: 'Sarah Johnson',
        content: 'Full article content for the Next.js guide goes here. In this extensive guide, we explore the intricate details of the Next.js App Router, understanding how server components redefine rendering paradigms, and how dynamic routing can be elegantly structured to build scalable web applications.',
    },
    {
        slug: 'styling-with-tailwind-css',
        title: 'Styling with Tailwind CSS',
        description: 'Build modern responsive cards and UI layouts quickly.',
        date: 'March 18, 2026',
        readTime: '4 min read',
        author: 'Alex Chen',
        content: 'Full article content for Tailwind CSS goes here. Utility-first CSS allows developers to compose complex designs without leaving the HTML file. We will walk through setting up custom themes, using arbitrary values, and leveraging Tailwind for dark mode implementations seamlessly.',
    },
    {
        slug: 'seo-friendly-slugs',
        title: 'Creating SEO-Friendly Slugs',
        description: 'Why clean URL parameters improve indexing and user experience.',
        date: 'March 12, 2026',
        readTime: '6 min read',
        author: 'Elena Rodriguez',
        content: 'Full article content for SEO slugs goes here. A well-structured URL isn\'t just good for search engines; it provides immediate context to the user. We will discuss best practices for generating robust slugs, handling internationalization, and managing redirects for deprecated URLs.',
    },
];

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: PageProps) {
    const { slug } = await params;

    // Find the post matching the URL slug
    const post = posts.find((item) => item.slug === slug);

    // Trigger Next.js 404 page if no post matches
    if (!post) {
        notFound();
    }

    return (
        <main className="min-h-screen pt-24 pb-16 px-6">
            <article className="max-w-3xl mx-auto">
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors mb-10 group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to all articles
                </Link>

                <header className="mb-12 border-b border-zinc-200/80 dark:border-zinc-800/80 pb-10">
                    <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-6">
                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800/80">
                            <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                            {post.date}
                        </div>
                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800/80">
                            <Clock className="w-3.5 h-3.5 text-purple-500" />
                            {post.readTime}
                        </div>
                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800/80">
                            <User className="w-3.5 h-3.5 text-pink-500" />
                            {post.author}
                        </div>
                    </div>
                    
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 mb-6 leading-[1.15]">
                        {post.title}
                    </h1>
                    
                    <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
                        {post.description}
                    </p>
                </header>

                <div className="prose prose-zinc dark:prose-invert prose-lg max-w-none text-zinc-700 dark:text-zinc-300 leading-relaxed selection:bg-indigo-200 dark:selection:bg-indigo-900">
                    <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-indigo-600 dark:first-letter:text-indigo-400 first-letter:mr-3 first-letter:float-left">
                        {post.content}
                    </p>
                    
                    {/* Placeholder for more content to make it look like a real blog post */}
                    <p className="mt-6">
                        When building modern applications, the architecture decisions you make early on have compounding effects. As we delve deeper into this topic, remember that flexibility and standard compliance should remain at the forefront of your strategy.
                    </p>
                    
                    <h3 className="text-2xl font-bold mt-10 mb-4 text-zinc-900 dark:text-zinc-100">Key Takeaways</h3>
                    <ul className="list-disc pl-6 space-y-2 marker:text-indigo-500">
                        <li>Understand the core principles before jumping into implementation.</li>
                        <li>Utilize the tools the framework provides to optimize performance.</li>
                        <li>Always keep accessibility and user experience in mind.</li>
                    </ul>
                </div>
                
                <div className="mt-16 pt-8 border-t border-zinc-200/80 dark:border-zinc-800/80 flex justify-between items-center">
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        Share this article
                    </p>
                    <div className="flex gap-3">
                        {/* Mock social icons */}
                        <button className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center hover:bg-indigo-100 dark:hover:bg-indigo-900/50 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                        </button>
                        <button className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center hover:bg-indigo-100 dark:hover:bg-indigo-900/50 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                        </button>
                    </div>
                </div>
            </article>
        </main>
    );
}