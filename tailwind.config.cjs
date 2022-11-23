module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  important: "#app",
  theme: {
    screens: {
      sm: "480px",
      ax: "600px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    colors: {
      main: "rgb(255,255,255)",
      title: "rgb(221, 91, 135)",
      mainBg: "#F5F5F5",
      secondary: "#9C27B0",
      black: "#000000",
      white: "#fff",
      darkerBg: "#D9D9D9",
      button: "rgba(0,0,0,0.04)",
      moonButtonOutline: "rgba(25, 118, 210, 0.5)",
      primaryButton: "#6F5ACD",
      buttonBorder: "#806AD2",
      headerText: "rgba(0, 0, 0, 0.87)",
      borderGray: "rgba(0, 0, 0, 0.1)",
      success: "#00A352",
      successBackground: "#EAFAFF",
      error: "#EA3B2D",
      errorBackground: "#FFD0CD",
      warning: "#FFB72E",
      warningBackground: "#FFF9ED",
      info: "#2EC7FF",
      infoBackground: "#EAFAFF",
      tableGrey: "#EEEEEE",
      nftBg: "#FF9FA9",
      commentBg: "#F1F1F1",
      confirmButton: "#E8735A",
      taskDivider: "rgba(0, 0, 0, 0.21)",
    },
    fontFamily: {
      title: ["Play", "sans-serif"],
      head: ["Roboto", "sans-serif"],
      bungee: ["Bungee", "sans-serif"],
      inter: ["Inter", "sans-serif"],
      gilroy: ["Gilroy", "sans-serif"],
    },
    extend: {
      backgroundImage: {
        pattern:
          "url('https://res.cloudinary.com/daljbo1q0/image/upload/v1662370234/hdao-dashboard/pattern_tklwqc.png')",
      },
    },
  },
  safelist: [
    "md:gap-8",
    {
      pattern: /(success|error|info)/,
    },
    {
      pattern: /w-.+/,
    },
  ],
  corePlugins: {
    // Remove Tailwind CSS's preflight style so it can use the MUI's preflight instead (CssBaseline).
    preflight: false,
  },
  plugins: [],
};
