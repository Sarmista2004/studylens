import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Sun, Moon, LogOut, Settings as SettingsIcon, Check, Lock } from "lucide-react";
import useTheme from "../../hooks/useTheme";
import { api } from "../../lib/api";
import { clearToken } from "../../lib/auth";

function Settings() {
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const saveTimeout = useRef(null);
  const savedTimeout = useRef(null);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwError, setPwError] = useState("");
  const [pwSuccess, setPwSuccess] = useState(false);
  const [pwLoading, setPwLoading] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  useEffect(() => {
    api
      .getSettings()
      .then((data) =>
        setSettings({
          name: data.name || "",
          email: data.email || "",
          dailyGoalHours: data.daily_goal_hours || 2,
        })
      )
      .catch((err) => console.error("Failed to load settings:", err))
      .finally(() => setLoading(false));
  }, []);

  const showSaved = () => {
    setSaved(true);
    clearTimeout(savedTimeout.current);
    savedTimeout.current = setTimeout(() => setSaved(false), 1500);
  };

  const persistSettings = (next) => {
    api
      .updateSettings({
        name: next.name,
        daily_goal_hours: next.dailyGoalHours,
      })
      .then(() => showSaved())
      .catch((err) => console.error("Failed to save settings:", err));
  };

  const updateSettings = (patch) => {
    const next = { ...settings, ...patch };
    setSettings(next);
    persistSettings(next);
  };

  // Debounced version for text input (name) so it doesn't save on every keystroke
  const updateSettingsDebounced = (patch) => {
    const next = { ...settings, ...patch };
    setSettings(next);
    clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(() => {
      persistSettings(next);
    }, 600);
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPwError("");
    setPwSuccess(false);

    if (newPassword.length < 6) {
      setPwError("New password must be at least 6 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPwError("New passwords don't match");
      return;
    }

    setPwLoading(true);
    try {
      await api.changePassword(currentPassword, newPassword);
      setPwSuccess(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => setPwSuccess(false), 2000);
    } catch (err) {
      setPwError(err.message || "Failed to change password");
    } finally {
      setPwLoading(false);
    }
  };

  const handleLogout = () => {
    clearToken();
    navigate("/login");
  };

  if (loading || !settings) {
    return (
      <div className="bg-gray-50 dark:bg-slate-950 p-5">
        <p className="text-gray-500 dark:text-gray-400">Loading settings...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-white p-5 transition-colors">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center shrink-0">
          <SettingsIcon size={20} />
        </div>
        <div>
          <h1 className="text-2xl font-semibold leading-tight">Settings</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Manage your preferences and account.
          </p>
        </div>

        {saved && (
          <span className="ml-auto flex items-center gap-1 text-sm text-green-600 dark:text-green-400 transition-opacity">
            <Check size={14} /> Saved
          </span>
        )}
      </div>

      <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-6 mt-4 transition-colors">
        <h2 className="text-base font-semibold mb-5">Preferences</h2>

        <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-slate-800">
          <div>
            <p className="font-medium">Appearance</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Choose your theme</p>
          </div>

          <div className="flex border border-gray-200 dark:border-slate-700 rounded-xl overflow-hidden">
            <button
              onClick={() => isDark && toggleTheme()}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-sm ${
                !isDark
                  ? "bg-purple-600 text-white"
                  : "text-gray-600 dark:text-gray-300"
              }`}
            >
              <Sun size={14} /> Light
            </button>
            <button
              onClick={() => !isDark && toggleTheme()}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-sm ${
                isDark
                  ? "bg-purple-600 text-white"
                  : "text-gray-600 dark:text-gray-300"
              }`}
            >
              <Moon size={14} /> Dark
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between py-3">
          <div>
            <p className="font-medium">Daily goal</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Set your daily study goal
            </p>
          </div>

          <select
            value={settings.dailyGoalHours}
            onChange={(e) =>
              updateSettings({ dailyGoalHours: Number(e.target.value) })
            }
            className="border border-gray-300 dark:border-slate-700 bg-transparent dark:text-white rounded-lg px-3 py-1.5 text-sm"
          >
            {[1, 2, 3, 4, 5, 6].map((h) => (
              <option key={h} value={h} className="text-black">
                {h} hour{h > 1 ? "s" : ""}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-6 mt-4 transition-colors">
        <h2 className="text-base font-semibold mb-5">Profile</h2>

        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 flex items-center justify-center font-semibold text-lg shrink-0">
            {settings.name?.[0]?.toUpperCase() || "S"}
          </div>

          <div className="flex-1">
            <input
              value={settings.name}
              onChange={(e) => updateSettingsDebounced({ name: e.target.value })}
              className="font-medium border-b border-transparent hover:border-gray-300 dark:hover:border-slate-700 bg-transparent focus:outline-none focus:border-purple-500 w-full"
            />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {settings.email || "No email on file"}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-6 mt-4 transition-colors">
        <button
          type="button"
          onClick={() => {
            setShowPasswordForm((prev) => !prev);
            setPwError("");
            setPwSuccess(false);
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
          }}
          className="flex items-center justify-between w-full"
        >
          <div className="flex items-center gap-2">
            <Lock size={16} className="text-gray-500 dark:text-gray-400" />
            <h2 className="text-base font-semibold">Change password</h2>
          </div>
          <span className="text-sm text-purple-600 dark:text-purple-400 font-medium">
            {showPasswordForm ? "Cancel" : "Change"}
          </span>
        </button>

        {showPasswordForm && (
          <form onSubmit={handleChangePassword} className="flex flex-col gap-3 max-w-sm mt-4">
            <input
              type="password"
              placeholder="Current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              className="border border-gray-300 dark:border-slate-700 bg-transparent dark:text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500"
            />
            <input
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="border border-gray-300 dark:border-slate-700 bg-transparent dark:text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500"
            />
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="border border-gray-300 dark:border-slate-700 bg-transparent dark:text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500"
            />

            {pwError && <p className="text-sm text-red-500">{pwError}</p>}
            {pwSuccess && (
              <p className="text-sm text-green-600 dark:text-green-400 flex items-center gap-1">
                <Check size={14} /> Password updated
              </p>
            )}

            <button
              type="submit"
              disabled={pwLoading}
              className="self-start bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white text-sm font-medium rounded-lg px-4 py-2 mt-1 transition-colors"
            >
              {pwLoading ? "Updating..." : "Update password"}
            </button>
          </form>
        )}
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 text-red-500 text-sm font-medium mt-4"
      >
        <LogOut size={16} />
        Log out
      </button>
    </div>
  );
}

export default Settings;