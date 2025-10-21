import { Layout } from "@/components/layout/Layout";

export default function TestPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-center">Test Page</h1>
        <p className="text-center mb-8 max-w-2xl mx-auto">
          This is a test page for development purposes.
        </p>
      </div>
    </Layout>
  );
}