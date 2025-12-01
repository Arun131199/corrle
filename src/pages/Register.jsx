import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaEye, FaEyeSlash, FaCheck, FaUser, FaEnvelope, FaBriefcase, FaLock } from "react-icons/fa";
import { RiShieldCheckFill } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";
import logo from '../../src/assets/logo.png'

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    role: "",
    password: "",
    confirmPassword: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();

  const handleEyeIcon = (field) => {
    if (field === "password") {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Calculate password strength
    if (name === "password") {
      let strength = 0;
      if (value.length >= 8) strength += 25;
      if (/[A-Z]/.test(value)) strength += 25;
      if (/[0-9]/.test(value)) strength += 25;
      if (/[^A-Za-z0-9]/.test(value)) strength += 25;
      setPasswordStrength(strength);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    setIsLoading(true);
    console.log("Registration data:", formData);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate('/login');
    }, 2000);
  };

  const getStrengthColor = (strength) => {
    if (strength <= 25) return "bg-red-500";
    if (strength <= 50) return "bg-orange-500";
    if (strength <= 75) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0f33] via-[#2a1b4a] to-[#3a2761] flex items-center justify-center p-4">
      {/* Background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl w-full"
      >
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20">
          <div className="grid md:grid-cols-2">
            <div className="hidden md:flex bg-gradient-to-br from-purple-900/30 to-blue-900/30 p-12 flex-col justify-between relative overflow-hidden">
              <div className="relative z-10">
                <div className="mb-8 flex flex-col items-center ">
                  <div className="flex items-center space-x-3">
                    <img src={logo} alt="" srcset="" />
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-6">
                    Join Our Community
                  </h2>
                </div>
              </div>
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-2xl"></div>
              <div className="absolute -top-20 -left-20 w-64 h-64 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-2xl"></div>
            </div>
            <div className="p-8 md:p-12">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-center mb-8"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl mb-4">
                  <RiShieldCheckFill className="text-3xl text-white" />
                </div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  Create Account
                </h1>
                <p className="text-white/80">
                  Start your journey with us today
                </p>
              </motion.div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: "fullName", icon: <FaUser />, placeholder: "Full Name", type: "text" },
                    { name: "email", icon: <FaEnvelope />, placeholder: "Email Address", type: "email" },
                    {
                      name: "role",
                      icon: <FaBriefcase />,
                      placeholder: "Select Role",
                      type: "select",
                      options: ["Developer", "Designer", "Manager", "Student", "Other"]
                    },
                    {
                      name: "password",
                      icon: <FaLock />,
                      placeholder: "Password",
                      type: "password",
                      showToggle: true
                    },
                    {
                      name: "confirmPassword",
                      icon: <FaCheck />,
                      placeholder: "Confirm Password",
                      type: "password",
                      showToggle: true
                    }
                  ].map((field, index) => (
                    <motion.div
                      key={field.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={field.name === "confirmPassword" ? "md:col-span-2" : ""}
                    >
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        {field.placeholder}
                      </label>
                      <div className="relative">
                        {field.type === "select" ? (
                          <>
                            <select
                              name={field.name}
                              value={formData[field.name]}
                              onChange={handleChange}
                              className="w-full px-4 py-3 pl-12 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                              required
                            >
                              <option value="" className="bg-gray-800">Select your role</option>
                              {field.options.map(option => (
                                <option key={option} value={option.toLowerCase()} className="bg-gray-800">
                                  {option}
                                </option>
                              ))}
                            </select>
                            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60">
                              {field.icon}
                            </div>
                            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                              <span className="text-white/40">▼</span>
                            </div>
                          </>
                        ) : (
                          <>
                            <input
                              type={field.showToggle ? (field.name === "password" ? (showPassword ? "text" : "password") : (showConfirmPassword ? "text" : "password")) : field.type}
                              name={field.name}
                              value={formData[field.name]}
                              onChange={handleChange}
                              placeholder={field.placeholder}
                              className="w-full px-4 py-3 pl-12 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                              required
                            />
                            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60">
                              {field.icon}
                            </div>
                            {field.showToggle && (
                              <button
                                type="button"
                                onClick={() => handleEyeIcon(field.name)}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                              >
                                {field.name === "password" ? (showPassword ? <FaEyeSlash /> : <FaEye />) : (showConfirmPassword ? <FaEyeSlash /> : <FaEye />)}
                              </button>
                            )}
                          </>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
                {formData.password && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between text-sm">
                      <span className="text-white/80">Password strength</span>
                      <span className={`font-medium ${passwordStrength <= 25 ? "text-red-400" :
                        passwordStrength <= 50 ? "text-orange-400" :
                          passwordStrength <= 75 ? "text-yellow-400" :
                            "text-green-400"
                        }`}>
                        {passwordStrength <= 25 ? "Weak" :
                          passwordStrength <= 50 ? "Fair" :
                            passwordStrength <= 75 ? "Good" :
                              "Strong"}
                      </span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${passwordStrength}%` }}
                        transition={{ type: "spring", stiffness: 200 }}
                        className={`h-full ${getStrengthColor(passwordStrength)}`}
                      />
                    </div>
                  </motion.div>
                )}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-start space-x-3"
                >
                  <div className="flex items-center h-5">
                    <input
                      type="checkbox"
                      id="terms"
                      className="w-4 h-4 border border-white/30 rounded bg-white/10 checked:bg-purple-600 focus:ring-purple-600 focus:ring-offset-gray-900 focus:ring-2 focus:ring-offset-2"
                      required
                    />
                  </div>
                  <label htmlFor="terms" className="text-sm text-white/80 leading-tight">
                    I agree to the{" "}
                    <Link to="/terms" className="text-purple-300 hover:text-purple-200 font-medium underline-offset-2 hover:underline">
                      Terms and Conditions
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="text-purple-300 hover:text-purple-200 font-medium underline-offset-2 hover:underline">
                      Privacy Policy
                    </Link>
                  </label>
                </motion.div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 px-4 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating Account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </motion.button>
              </form>

              {/* Divider */}
              <div className="my-8 flex items-center">
                <div className="flex-1 border-t border-white/20"></div>
                <div className="px-4 text-white/50 text-sm">Or continue with</div>
                <div className="flex-1 border-t border-white/20"></div>
              </div>

              {/* Social Login */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center px-4 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                >
                  <FcGoogle className="text-xl mr-3" />
                  <span className="text-white">Google</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center px-4 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                >
                  <FaFacebook className="text-xl mr-3 text-blue-500" />
                  <span className="text-white">Facebook</span>
                </motion.button>
              </div>

              {/* Login Link */}
              <div className="text-center">
                <p className="text-white/70">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-purple-300 hover:text-purple-200 font-semibold transition-colors duration-300 underline-offset-2 hover:underline"
                  >
                    Sign in here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-6"
        >
          <p className="text-white/50 text-sm">
            Protected by reCAPTCHA.{" "}
            <Link to="/privacy" className="text-purple-300 hover:text-purple-200">
              Privacy
            </Link>{" "}
            ·{" "}
            <Link to="/terms" className="text-purple-300 hover:text-purple-200">
              Terms
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}