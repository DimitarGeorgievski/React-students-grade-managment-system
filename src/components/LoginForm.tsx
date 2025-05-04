import React, { useState } from "react";

interface LoginFormProps {
  onLogin: (username: string, password: string, role: string) => void;
}
const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("parent");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(username, password, role);
  };
  return (
    <form
      className="max-w-sm mx-auto p-4 border border-gray-300 rounded"
      onSubmit={handleSubmit}
    >
      <div className="mb-4">
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700"
        >
          Име
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mt-1 p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Пасворд
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mt-1 p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="role"
          className="block text-sm font-medium text-gray-700"
        >
          Роља
        </label>
        <select
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full mt-1 p-2 border border-gray-300 rounded"
        >
          <option value="parent">Родител</option>
          <option value="teacher">Професор</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded"
      >
        Логирај се
      </button>
    </form>
  );
};
export default LoginForm;
