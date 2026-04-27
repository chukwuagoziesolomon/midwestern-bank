"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Users,
  CheckCircle,
  XCircle,
  Ban,
  DollarSign,
  LogOut,
  Shield,
  Clock,
  UserCheck,
  UserX,
  Search,
} from "lucide-react";
import { useAuth } from "@/lib/AuthContext";

interface AdminUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  status: string;
  banned: boolean;
  profile_picture: string | null;
  created_at: string;
  available_balance: number;
  total_balance: number;
}

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [balanceModal, setBalanceModal] = useState<{
    userId: number;
    name: string;
    currentBalance: number;
  } | null>(null);
  const [balanceAmount, setBalanceAmount] = useState("");
  const [balanceAction, setBalanceAction] = useState<"increase" | "decrease">("increase");
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const getToken = () => localStorage.getItem("token");

  const fetchUsers = useCallback(async () => {
    try {
      const token = getToken();
      const res = await fetch("/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setUsers(data.users);
      }
    } catch {
      console.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }
    if (user.role !== "admin") {
      router.push("/dashboard");
      return;
    }
    fetchUsers();
  }, [user, router, fetchUsers]);

  const showMessage = (text: string, type: "success" | "error") => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleApprove = async (userId: number) => {
    setActionLoading(userId);
    try {
      const res = await fetch(`/api/admin/users/${userId}/approve`, {
        method: "POST",
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      const data = await res.json();
      if (res.ok) {
        showMessage(data.message, "success");
        fetchUsers();
      } else {
        showMessage(data.error, "error");
      }
    } catch {
      showMessage("Action failed", "error");
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (userId: number) => {
    setActionLoading(userId);
    try {
      const res = await fetch(`/api/admin/users/${userId}/reject`, {
        method: "POST",
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      const data = await res.json();
      if (res.ok) {
        showMessage(data.message, "success");
        fetchUsers();
      } else {
        showMessage(data.error, "error");
      }
    } catch {
      showMessage("Action failed", "error");
    } finally {
      setActionLoading(null);
    }
  };

  const handleBan = async (userId: number) => {
    setActionLoading(userId);
    try {
      const res = await fetch(`/api/admin/users/${userId}/ban`, {
        method: "POST",
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      const data = await res.json();
      if (res.ok) {
        showMessage(data.message, "success");
        fetchUsers();
      } else {
        showMessage(data.error, "error");
      }
    } catch {
      showMessage("Action failed", "error");
    } finally {
      setActionLoading(null);
    }
  };

  const handleBalanceSubmit = async () => {
    if (!balanceModal || !balanceAmount) return;
    const numAmount = parseFloat(balanceAmount);
    if (isNaN(numAmount) || numAmount <= 0) {
      showMessage("Enter a valid positive amount", "error");
      return;
    }

    const finalAmount = balanceAction === "decrease" ? -numAmount : numAmount;
    setActionLoading(balanceModal.userId);
    try {
      const res = await fetch(`/api/admin/users/${balanceModal.userId}/balance`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: finalAmount }),
      });
      const data = await res.json();
      if (res.ok) {
        showMessage(data.message, "success");
        setBalanceModal(null);
        setBalanceAmount("");
        fetchUsers();
      } else {
        showMessage(data.error, "error");
      }
    } catch {
      showMessage("Action failed", "error");
    } finally {
      setActionLoading(null);
    }
  };

  const filteredUsers = users.filter((u) => {
    if (u.role === "admin") return false;
    const matchesFilter =
      filter === "all" ||
      (filter === "pending" && u.status === "pending") ||
      (filter === "approved" && u.status === "approved") ||
      (filter === "rejected" && u.status === "rejected") ||
      (filter === "banned" && u.banned);
    const matchesSearch =
      !searchQuery ||
      `${u.first_name} ${u.last_name}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: users.filter((u) => u.role !== "admin").length,
    pending: users.filter((u) => u.status === "pending" && u.role !== "admin").length,
    approved: users.filter((u) => u.status === "approved" && !u.banned && u.role !== "admin").length,
    banned: users.filter((u) => u.banned && u.role !== "admin").length,
  };

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col py-8 px-6 min-h-screen hidden md:flex">
        <div className="flex items-center justify-center mb-10">
          <Image src="/logo.png" alt="Logo" width={40} height={40} />
        </div>
        <nav className="flex-1">
          <div className="mb-6">
            <div className="text-xs font-semibold text-blue-600 mb-2">ADMIN</div>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/admin"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-black bg-blue-50"
                >
                  <Users size={18} color="#0000FF" /> Manage Users
                </Link>
              </li>
            </ul>
          </div>
          <div className="mb-6">
            <div className="text-xs font-semibold text-blue-600 mb-2">ACCOUNT</div>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-black hover:bg-blue-50 w-full text-left"
                >
                  <LogOut size={18} color="#0000FF" /> Logout
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-auto">
        {/* Toast */}
        {message && (
          <div
            className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg text-white font-medium ${
              message.type === "success" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
              <Shield size={28} className="text-blue-600" /> Admin Dashboard
            </h1>
            <p className="text-gray-500 mt-1">Manage users, approvals, and balances</p>
          </div>
          <button
            onClick={handleLogout}
            className="md:hidden flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Users</p>
                <p className="text-xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock size={20} className="text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Pending</p>
                <p className="text-xl font-bold text-gray-900">{stats.pending}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <UserCheck size={20} className="text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Approved</p>
                <p className="text-xl font-bold text-gray-900">{stats.approved}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <UserX size={20} className="text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Banned</p>
                <p className="text-xl font-bold text-gray-900">{stats.banned}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex gap-2 flex-wrap">
              {[
                { key: "all", label: "All Users" },
                { key: "pending", label: "Pending" },
                { key: "approved", label: "Approved" },
                { key: "rejected", label: "Rejected" },
                { key: "banned", label: "Banned" },
              ].map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === f.key
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <div className="relative w-full md:w-64">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">User</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Email</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Status</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-600">Balance</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Joined</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-12 text-gray-400">
                      No users found
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((u) => (
                    <tr key={u.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-xs">
                            {u.first_name[0]}
                            {u.last_name[0]}
                          </div>
                          <span className="font-medium text-gray-900">
                            {u.first_name} {u.last_name}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{u.email}</td>
                      <td className="py-3 px-4">
                        {u.banned ? (
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                            <Ban size={12} /> Banned
                          </span>
                        ) : u.status === "pending" ? (
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                            <Clock size={12} /> Pending
                          </span>
                        ) : u.status === "approved" ? (
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                            <CheckCircle size={12} /> Approved
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                            <XCircle size={12} /> Rejected
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right font-mono text-gray-900">
                        ${u.available_balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                      </td>
                      <td className="py-3 px-4 text-gray-500">
                        {new Date(u.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-center gap-1">
                          {u.status === "pending" && (
                            <>
                              <button
                                onClick={() => handleApprove(u.id)}
                                disabled={actionLoading === u.id}
                                className="p-1.5 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-colors disabled:opacity-50"
                                title="Approve"
                              >
                                <CheckCircle size={16} />
                              </button>
                              <button
                                onClick={() => handleReject(u.id)}
                                disabled={actionLoading === u.id}
                                className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors disabled:opacity-50"
                                title="Reject"
                              >
                                <XCircle size={16} />
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => handleBan(u.id)}
                            disabled={actionLoading === u.id}
                            className={`p-1.5 rounded-lg transition-colors disabled:opacity-50 ${
                              u.banned
                                ? "bg-green-50 text-green-600 hover:bg-green-100"
                                : "bg-orange-50 text-orange-600 hover:bg-orange-100"
                            }`}
                            title={u.banned ? "Unban" : "Ban"}
                          >
                            <Ban size={16} />
                          </button>
                          <button
                            onClick={() =>
                              setBalanceModal({
                                userId: u.id,
                                name: `${u.first_name} ${u.last_name}`,
                                currentBalance: u.available_balance,
                              })
                            }
                            disabled={actionLoading === u.id}
                            className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors disabled:opacity-50"
                            title="Adjust Balance"
                          >
                            <DollarSign size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Balance Adjustment Modal */}
      {balanceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 shadow-xl">
            <h3 className="text-lg font-bold text-gray-900 mb-1">Adjust Balance</h3>
            <p className="text-sm text-gray-500 mb-4">
              {balanceModal.name} — Current: $
              {balanceModal.currentBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </p>

            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setBalanceAction("increase")}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                  balanceAction === "increase"
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                Increase
              </button>
              <button
                onClick={() => setBalanceAction("decrease")}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                  balanceAction === "decrease"
                    ? "bg-red-600 text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                Decrease
              </button>
            </div>

            <div className="relative mb-4">
              <DollarSign
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="Amount"
                value={balanceAmount}
                onChange={(e) => setBalanceAmount(e.target.value)}
                className="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setBalanceModal(null);
                  setBalanceAmount("");
                }}
                className="flex-1 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleBalanceSubmit}
                disabled={!balanceAmount || actionLoading === balanceModal.userId}
                className="flex-1 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
              >
                {actionLoading === balanceModal.userId ? "Processing..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
