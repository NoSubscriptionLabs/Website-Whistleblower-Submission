import { Toaster } from 'react-hot-toast';
import { SubmissionForm } from './components/SubmissionForm';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Secure Whistleblower Submission
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Submit your report securely and anonymously. Save your reference number to check the status later.
          </p>
        </div>

        <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <SubmissionForm />
        </div>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}