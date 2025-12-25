import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/Card";
import { Users, Globe, Heart, FileText } from "lucide-react";

export default async function AdminDashboard() {
  // Statistiques
  const [
    totalUsers,
    totalCountries,
    totalFavorites,
    totalResponses,
    recentUsers,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.country.count(),
    prisma.favorite.count(),
    prisma.userResponse.count(),
    prisma.user.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        role: true,
      },
    }),
  ]);

  const stats = [
    {
      label: "Utilisateurs",
      value: totalUsers,
      icon: Users,
      color: "text-brand-500 bg-brand-50 dark:bg-brand-500/15",
    },
    {
      label: "Pays",
      value: totalCountries,
      icon: Globe,
      color: "text-success-500 bg-success-50 dark:bg-success-500/15",
    },
    {
      label: "Favoris",
      value: totalFavorites,
      icon: Heart,
      color: "text-error-500 bg-error-50 dark:bg-error-500/15",
    },
    {
      label: "Questionnaires",
      value: totalResponses,
      icon: FileText,
      color: "text-warning-500 bg-warning-50 dark:bg-warning-500/15",
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Dashboard Admin
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Vue d'ensemble de la plateforme NomadCompass
        </p>
      </div>

      {/* Statistiques */}
      <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {stat.label}
                  </p>
                  <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.color}`}
                >
                  <Icon className="h-6 w-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Utilisateurs récents */}
      <Card title="Utilisateurs récents" className="mb-8">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="pb-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                  Nom
                </th>
                <th className="pb-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                  Email
                </th>
                <th className="pb-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                  Rôle
                </th>
                <th className="pb-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                  Inscription
                </th>
              </tr>
            </thead>
            <tbody>
              {recentUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-gray-100 dark:border-gray-800"
                >
                  <td className="py-4 text-sm font-medium text-gray-900 dark:text-white">
                    {user.name || "N/A"}
                  </td>
                  <td className="py-4 text-sm text-gray-600 dark:text-gray-400">
                    {user.email}
                  </td>
                  <td className="py-4">
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                        user.role === "admin"
                          ? "bg-brand-100 text-brand-800 dark:bg-brand-500/20 dark:text-brand-300"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="py-4 text-sm text-gray-600 dark:text-gray-400">
                    {new Date(user.createdAt).toLocaleDateString("fr-FR")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
