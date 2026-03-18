import React from "react";

function OtpVerify({ email, onNext, onBack }) {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [remaining, setRemaining] = useState(TOTAL_SECONDS);
  const [canResend, setCanResend] = useState(false);
  const timerRef = useRef(null);

  const startTimer = useCallback(() => {
    setRemaining(TOTAL_SECONDS);
    setCanResend(false);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          clearInterval(timerRef.current);
          setCanResend(true);
          return 0;
        }
        return r - 1;
      });
    }, 1000);
  }, []);

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, [startTimer]);

  const handleResend = () => {
    setOtp(Array(6).fill(""));
    startTimer();
  };
  const handleVerify = async () => {
    const otpCode = otp.join("");

    if (otpCode.length < 6) return;

    try {
      const res = await fetch(
        "https://institute-backend-0ncp.onrender.com/student/verify-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            otp: otpCode,
          }),
        },
      );

      const data = await res.json();
      if (res.ok) {
        onNext();
      } else {
        alert(data.message || "Invalid OTP");
      }
    } catch (err) {
      console.log(err);
      alert("Server error");
    }
  };

  return (
    <div>
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-700 transition-colors mb-5"
      >
        <svg
          className="w-3.5 h-3.5"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          />
        </svg>
        Back
      </button>

      <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mb-5">
        <svg
          className="w-5 h-5 text-indigo-500"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.8}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
          />
        </svg>
      </div>
      <h2 className="text-[22px] font-semibold text-gray-900 mb-1.5">
        Enter your code
      </h2>
      <p className="text-sm text-gray-500 leading-relaxed mb-2">
        A 6-digit code was sent to{" "}
        <span className="font-semibold text-gray-800">{email}</span>.
      </p>

      <OTPInput value={otp} onChange={setOtp} />

      <CountdownTimer remaining={remaining} total={TOTAL_SECONDS} />

      <div className="text-center text-sm text-gray-400 mb-5">
        Didn't receive it?{" "}
        <button
          onClick={handleResend}
          disabled={!canResend}
          className={`font-semibold underline underline-offset-2 transition-colors ${
            canResend
              ? "text-indigo-600 hover:text-indigo-800 cursor-pointer"
              : "text-gray-300 cursor-not-allowed"
          }`}
        >
          Resend code
        </button>
      </div>

      <button
        onClick={handleVerify}
        disabled={otp.join("").length < 6}
        className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white text-sm font-semibold rounded-xl transition-all duration-150 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
      >
        Verify code
      </button>
      <StepDots current={1} />
    </div>
  );
}

export default OtpVerify;
