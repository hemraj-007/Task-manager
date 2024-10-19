// pages/index.tsx

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">

      {/* Hero Section */}
      <main className="flex-grow">
        <section className="bg-gray-100 py-20">
          <div className="container mx-auto text-center px-4">
            <h2 className="text-5xl font-bold text-gray-800 mb-4">
              Manage Your Tasks Efficiently
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Our Task Manager helps you organize your tasks and boost your productivity with a simple and intuitive interface.
            </p>
            <Link href="/taskform" className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-blue-700 transition">
              Get Started
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="p-6 border border-gray-200 rounded-lg shadow-sm text-center">
                <h3 className="text-xl font-bold mb-2">Easy Task Management</h3>
                <p className="text-gray-600">
                  Quickly add, edit, and organize tasks with an intuitive UI.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="p-6 border border-gray-200 rounded-lg shadow-sm text-center">
                <h3 className="text-xl font-bold mb-2">Priority Setting</h3>
                <p className="text-gray-600">
                  Set priority levels to make sure the important tasks are always on top.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="p-6 border border-gray-200 rounded-lg shadow-sm text-center">
                <h3 className="text-xl font-bold mb-2">Progress Tracking</h3>
                <p className="text-gray-600">
                  Keep track of task statuses and stay on top of your workload.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
