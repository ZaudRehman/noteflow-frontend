import { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

interface LegalPageLayoutProps {
    children: ReactNode;
    title: string;
    lastUpdated?: string;
}

export function LegalPageLayout({ children, title, lastUpdated }: LegalPageLayoutProps) {
    return (
        <div className="min-h-screen flex flex-col bg-dark-bg">
            <Header />

            <main className="flex-1 pt-32 pb-20">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-12">
                        <h1 className="text-4xl md:text-5xl font-display-bold text-gray-100 mb-4">
                            {title}
                        </h1>
                        {lastUpdated && (
                            <p className="text-gray-500 text-sm">
                                Last updated: {lastUpdated}
                            </p>
                        )}
                        <div className="mt-8 h-1 w-20 bg-gradient-to-r from-pastel-lavender to-pastel-mint rounded-full" />
                    </div>

                    {/* Content */}
                    <div className="prose prose-invert prose-pastel max-w-none">
                        {children}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
