'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import DementiaResults from '@/components/DementiaResults';

// Define the type for the form data
interface FormData {
  [key: string]: string | number | string[];
}

const ResultsPage: React.FC = () => {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState<FormData | null>(null);

  useEffect(() => {
    const data = searchParams.get('data');
    if (data) {
      try {
        const parsedData: FormData = JSON.parse(decodeURIComponent(data));
        setFormData(parsedData);
      } catch (error) {
        console.error('Error parsing form data:', error);
      }
    }
  }, [searchParams]);

  if (!formData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Assessment Results</h1>
      <DementiaResults formData={formData} />
    </div>
  );
};

export default ResultsPage;