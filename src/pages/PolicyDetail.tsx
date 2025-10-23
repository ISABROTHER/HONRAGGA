import { ArrowLeft } from 'lucide-react';
import { Button } from '../components/Button';
import { ReactNode } from 'react';

// Define the props interface that App.tsx will pass to this component
interface PolicyDetailProps {
  title: string;
  content: ReactNode;
  onBack: () => void;
}

export function PolicyDetail({ title, content, onBack }: PolicyDetailProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            {/* The "Back" button that uses the onBack function prop */}
            <Button
              onClick={onBack}
              variant="outline"
              size="sm"
              className="border-white text-white hover:bg-white hover:text-blue-900 mb-6 group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
              Back to All Policies
            </Button>
            {/* The title prop is used here */}
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 md:p-12">
            {/* The content prop is rendered here */}
            <div className="prose max-w-none text-gray-700 leading-relaxed">
              {content}
            </div>
          </div>
        </div>
      </section>

      {/* Simple prose styling to make the h3 and p tags 
        from App.tsx look good inside this component.
      */}
      <style>{`
        .prose h3 {
          font-size: 1.5rem; /* 24px */
          line-height: 2rem; /* 32px */
          font-weight: 600;
          margin-top: 2rem; /* 32px */
          margin-bottom: 1rem; /* 16px */
          color: #111827; /* gray-900 */
        }
        .prose p {
          margin-bottom: 1rem; /* 16px */
        }
      `}</style>
    </div>
  );
}