/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				mybgcolor: {
        100: "#f6eddf",
        200: "#eedbbf",
        300: "#e5ca9e",
        400: "#ddb87e",
        500: "#d4a65e",
        600: "#aa854b",
        700: "#7f6438",
        800: "#554226",
        900: "#2a2113"
},
			},
		},
	},
	plugins: [],
};
