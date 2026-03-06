// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// export default function Register() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     mobile: "",
//     password: "",
//   });

//   const [otp, setOtp] = useState("");
//   const [step, setStep] = useState(1);
//   const [error, setError] = useState("");

//   const API_BASE = "http://localhost:8000"; // ✅ Local backend

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     setError("");
//   };

//   const validatePassword = (password) => {
//     const regex =
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
//     return regex.test(password)
//       ? ""
//       : "Password must include uppercase, lowercase, number, special character and be at least 8 characters long";
//   };

//   const validateEmail = (email) => {
//     const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return regex.test(email) ? "" : "Invalid email address format";
//   };

//   const validateMobile = (mobile) => {
//     const regex = /^[0-9]{10}$/;
//     return regex.test(mobile)
//       ? ""
//       : "Mobile number must be exactly 10 digits";
//   };

//   const sendOtp = async (e) => {
//     e.preventDefault();

//     const emailError = validateEmail(formData.email);
//     if (emailError) return setError(emailError);

//     const mobileError = validateMobile(formData.mobile);
//     if (mobileError) return setError(mobileError);

//     const passwordError = validatePassword(formData.password);
//     if (passwordError) return setError(passwordError);

//     try {
//       const res = await fetch(`${API_BASE}/otp/send-otp`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           email: formData.email,
//           mobile: formData.mobile,
//         }),
//       });

//       const data = await res.json();

//       if (data.success) {
//         alert("OTP sent successfully!");
//         setStep(2);
//       } else {
//         setError(data.message);
//       }
//     } catch (err) {
//       console.error(err);
//       setError("Error sending OTP");
//     }
//   };

//   const verifyOtp = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await fetch(`${API_BASE}/otp/verify-otp`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           ...formData,
//           otp,
//         }),
//       });

//       const data = await res.json();

//       if (data.success) {
//         alert("Registration successful!");
//         navigate("/");
//       } else {
//         setError(data.message);
//       }
//     } catch (err) {
//       console.error(err);
//       setError("Error verifying OTP");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded-xl shadow-md w-96">
//         <h2 className="text-2xl font-bold mb-6 text-center">
//           Register
//         </h2>

//         {step === 1 ? (
//           <form onSubmit={sendOtp} className="space-y-4">
//             <input
//               type="text"
//               name="name"
//               placeholder="Full Name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//               className="w-full p-2 border rounded"
//             />

//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//               className="w-full p-2 border rounded"
//             />

//             <input
//               type="text"
//               name="mobile"
//               placeholder="Mobile (10 digits)"
//               value={formData.mobile}
//               maxLength={10}
//               onChange={handleChange}
//               required
//               className="w-full p-2 border rounded"
//             />

//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//               className="w-full p-2 border rounded"
//             />

//             {error && (
//               <p className="text-red-500 text-sm">{error}</p>
//             )}

//             <button
//               type="submit"
//               className="w-full bg-green-600 text-white py-2 rounded"
//             >
//               Send OTP
//             </button>
//           </form>
//         ) : (
//           <form onSubmit={verifyOtp} className="space-y-4">
//             <input
//               type="text"
//               placeholder="Enter OTP"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               maxLength={6}
//               required
//               className="w-full p-2 border rounded"
//             />

//             {error && (
//               <p className="text-red-500 text-sm">{error}</p>
//             )}

//             <button
//               type="submit"
//               className="w-full bg-green-600 text-white py-2 rounded"
//             >
//               Verify & Register
//             </button>
//           </form>
//         )}

//         <div className="mt-4 text-center">
//           <Link to="/" className="text-blue-600 text-sm">
//             Already have an account? Login
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }







import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });

  const [passwordError, setPasswordError] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  // Password rule
  const validatePassword = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

    if (!regex.test(password))
      return "Password must include uppercase, lowercase, number, special character and be at least 8 characters long";
    return "";
  };

  // Email rule
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email) ? "" : "Invalid email address format";
  };

  // Mobile rule — EXACTLY 10 digits
  const validateMobile = (mobile) => {
    const regex = /^[0-9]{10}$/;
    return regex.test(mobile)
      ? ""
      : "Mobile number must be exactly 10 digits";
  };

  const sendOtp = async (e) => {
    e.preventDefault();

    const emailError = validateEmail(formData.email);
    if (emailError) return setError(emailError);

    const mobileError = validateMobile(formData.mobile);
    if (mobileError) return setError(mobileError);

    const passwordError = validatePassword(formData.password);
    if (passwordError) return setError(passwordError);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/otp/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          mobile: formData.mobile, // 👉 sending mobile also
        }),
      });

      const data = await res.json();
      if (data.success) {
        alert("OTP sent to your email!");
        setStep(2);
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Error sending OTP");
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/otp/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          otp,
        }),
      });

      const data = await res.json();
      if (data.success) {
        alert("Registration successful!");
        navigate("/");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Error verifying OTP");
    }
  };

  const inputStyle = (value, hasError = false) =>
    `w-full p-3 rounded-xl bg-white border ${
      hasError ? "border-red-500" : "border-gray-300"
    } placeholder-gray-500 focus:outline-none focus:ring-2 ${
      hasError ? "focus:ring-red-500" : "focus:ring-green-500"
    } transition font-serif ${
      value ? "text-black font-semibold" : "text-black"
    }`;

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage: "url('/images/MoneyMap.png')",
        fontFamily: "'Times New Roman', Times, serif",
      }
    }
    >
      <style>{`
        /* .login-absolute controls main positioning under the face */
        .login-absolute {
          position: absolute;
          top: 35%;            /* adjust this to nudge up/down */
          right: 20%;          /* adjust this to nudge left/right */
          width: 24rem;        /* ~ w-96 */
          transform: translateY(0);
        }

        /* responsive: on small screens stack normally and center */
        @media (max-width: 900px) {
          .login-absolute {
            position: static;
            width: 90%;
            margin: 2rem auto 0 auto;
            transform: none;
          }
        }

        /* optional fine tuning for very wide screens */
        @media (min-width: 1600px) {
          .login-absolute {
            top: 14%;
            right: 22%;
          }
        }
      `}</style>
      <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 login-absolute">
        <h2 className="text-3xl font-bold mb-6 text-center text-black drop-shadow-sm font-serif">
          Register 📝
        </h2>

        {step === 1 ? (
          <form onSubmit={sendOtp} className="space-y-4 font-serif">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className={inputStyle(formData.name)}
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className={inputStyle(formData.email, error.includes("email"))}
            />

            {/* MOBILE NUMBER FIELD */}
            <input
              type="text"
              name="mobile"
              placeholder="Mobile Number (10 digits)"
              value={formData.mobile}
              maxLength={10}
              onChange={(e) => {
                if (/^[0-9]*$/.test(e.target.value)) {
                  handleChange(e);
                }
              }}
              required
              className={inputStyle(
                formData.mobile,
                error.includes("Mobile")
              )}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => {
                const value = e.target.value;
                setFormData({ ...formData, password: value });

                const regex =
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

                if (!regex.test(value))
                  setPasswordError(
                    "Include uppercase, lowercase, number, special character and min 8 chars"
                  );
                else setPasswordError("");
              }}
              required
              className={inputStyle(formData.password, passwordError !== "")}
            />

            {passwordError && (
              <p className="text-red-500 text-sm">{passwordError}</p>
            )}

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-600 to-emerald-700 text-white py-3 rounded-xl font-semibold shadow-md hover:scale-105 hover:shadow-lg transition font-serif"
            >
              Send OTP
            </button>

            <div className="mt-6 text-center">
              <Link
                to="/"
                className="text-sm text-gray-700 hover:text-green-700 hover:underline font-serif"
              >
                Already have an account? Login
              </Link>
            </div>
          </form>
        ) : (
          <form onSubmit={verifyOtp} className="space-y-4 font-serif">
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              required
              className={inputStyle(otp)}
            />

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-600 to-emerald-700 text-white py-3 rounded-xl font-semibold shadow-md hover:scale-105 hover:shadow-lg transition font-serif"
            >
              Verify & Register
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
