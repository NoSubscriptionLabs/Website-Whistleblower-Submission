import React, { useState } from 'react';
import { FileUpload } from './FileUpload';
import { supabase } from '../utils/supabaseClient';
import { encryptData, generateReference } from '../utils/encryption';
import toast from 'react-hot-toast';

export const SubmissionForm: React.FC = () => {
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const reference = generateReference();
      const encryptedDescription = encryptData(description);
      const encryptedMetadata = files.length > 0 
        ? encryptData(JSON.stringify(files.map(f => ({ name: f.name, size: f.size }))))
        : null;

      const { error } = await supabase
        .from('reports')
        .insert({
          encrypted_description: encryptedDescription,
          encrypted_metadata: encryptedMetadata,
          report_reference: reference
        });

      if (error) throw error;

      toast.success('Report submitted successfully');
      toast.success(`Your reference number is: ${reference}`);
      setDescription('');
      setFiles([]);
    } catch (error) {
      toast.error('Failed to submit report');
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label 
          htmlFor="description" 
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={6}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Describe the situation in detail..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Evidence (Optional)
        </label>
        <FileUpload onFileSelect={setFiles} />
        {files.length > 0 && (
          <ul className="mt-2 space-y-1">
            {files.map((file, index) => (
              <li key={index} className="text-sm text-gray-600">
                {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Report'}
      </button>
    </form>
  );
};