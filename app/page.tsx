// app/page.tsx
import { whop } from "@/lib/whop";
import { headers } from "next/headers";

export default async function HomePage() {
  const headerList = headers();
  const authHeader = headerList.get("authorization");

  if (!authHeader?.startsWith("Bearer ")) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Installe cette app depuis Whop</h1>
          <p className="text-gray-600">
            Cette page ne fonctionne que quand un créateur installe ton app depuis son dashboard Whop.
          </p>
        </div>
      </div>
    );
  }

  try {
    const token = authHeader.split(" ")[1];
    const { company_id } = await whop.oauth.validateToken({ token });

    const company = await whop.companies.get(company_id);

    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-4xl font-bold mb-6">Bienvenue dans ton app B2B !</h1>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <p className="text-sm text-gray-600">Nom de l'entreprise</p>
              <p className="text-2xl font-semibold">{company.name}</p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <p className="text-sm text-gray-600">ID Whop</p>
              <p className="text-xl font-mono">{company_id}</p>
            </div>
          </div>

          <p className="mt-8 text-lg text-gray-700">
            Ton app est correctement installée et connectée. Tu peux maintenant lire/écrire dans cette entreprise Whop via le SDK.
          </p>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-red-600 text-xl">Erreur d’authentification · {String(error)}</p>
      </div>
    );
  }
}