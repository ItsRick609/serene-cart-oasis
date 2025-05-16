import { Layout } from "@/components/Layout";

const Account = () => {
  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">My Account</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600">Manage your account settings and preferences here.</p>
        </div>
      </div>
    </Layout>
  );
};

export default Account;