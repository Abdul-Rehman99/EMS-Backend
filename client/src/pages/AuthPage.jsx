import { useState } from "react";
import { motion } from "framer-motion";
import { Ticket, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Validation Schemas
const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Enter a valid email address")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

const registerSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, "Name must be at least 3 characters")
    .required("Full name is required"),
  email: yup
    .string()
    .email("Enter a valid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const { login, register: registerUser } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(isLogin ? loginSchema : registerSchema),
  });

  const onSubmit = async (data) => {
    const toastId = toast.loading(
      isLogin ? "Signing in..." : "Creating account..."
    );

    try {
      if (isLogin) {
        await login(data.email, data.password);
        toast.success("Welcome back! 👋", { id: toastId });
      } else {
        await registerUser(data.name, data.email, data.password);
        toast.success("Account created successfully! 🎉", { id: toastId });
      }
      reset();
    } catch (err) {
      toast.error(err.message || "Something went wrong", { id: toastId });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="inline-block"
          >
            <Ticket className="w-16 h-16 text-purple-600 mx-auto mb-4" />
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-800">EventHub</h1>
          <p className="text-gray-600 mt-2">Your Gateway to Amazing Events</p>
        </div>

        {/* Toggle buttons */}
        <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => {
              setIsLogin(true);
              reset();
            }}
            className={`flex-1 py-2 rounded-md transition-all ${
              isLogin ? "bg-white shadow-sm font-semibold" : "text-gray-600"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => {
              setIsLogin(false);
              reset();
            }}
            className={`flex-1 py-2 rounded-md transition-all ${
              !isLogin ? "bg-white shadow-sm font-semibold" : "text-gray-600"
            }`}
          >
            Register
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {!isLogin && (
            <div>
              <input
                type="text"
                placeholder="Full Name"
                {...register("name")}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none ${
                  errors.name ? "border-red-400" : "border-gray-300"
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
          )}

          <div>
            <input
              type="email"
              placeholder="Email Address"
              {...register("email")}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none ${
                errors.email ? "border-red-400" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password")}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none pr-10 ${
                  errors.password ? "border-red-400" : "border-gray-300"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
          >
            {isSubmitting
              ? "Processing..."
              : isLogin
              ? "Sign In"
              : "Create Account"}
          </motion.button>
        </form>

        {/* Demo Credentials */}
        <div className="mt-6 text-sm text-gray-600 text-center bg-gray-50 p-3 rounded-lg">
          <p className="font-semibold text-gray-800 mb-1">Demo Accounts:</p>
          <p>
            <span className="font-medium text-purple-600">User:</span>{" "}
            jhon@example.com
          </p>
          <p>
            <span className="font-medium text-purple-600">Admin:</span>{" "}
            admin@example.com
          </p>
          <p>
            <span className="font-medium text-purple-600">Password:</span>{" "}
            password123
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;
