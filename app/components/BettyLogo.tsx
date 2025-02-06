export function BettyLogo() {
  return (
    <svg
      className="w-12 h-12" // Adjust size as needed
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background Circle */}
      <circle
        cx="100"
        cy="100"
        r="90"
        fill="#F97316"
        stroke="#FFF"
        strokeWidth="4"
      />

      {/* Simple Heart Icon */}
      <path
        d="M100 150C120 150 135 130 135 110C135 90 115 70 100 70C85 70 65 90 65 110C65 130 80 150 100 150Z"
        fill="#F43F5E"
      />

      {/* BETTY Text */}
      <text
        x="50%"
        y="140"
        textAnchor="middle"
        className="text-[30px] font-semibold"
        fill="#FFF"
        fontFamily="Arial, sans-serif"
      >
        BETTY'S
      </text>
    </svg>
  );
}
