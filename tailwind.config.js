module.exports = {
    purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {},
        container: {
            center: true,
        },
        zIndex: {
            'minus': -10,
        }
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
