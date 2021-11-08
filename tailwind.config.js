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
        },
        width: {
            'full':'100%',
            '80/100':'80%',
            '30':'30px',
            '40':'40px',
            '50':'50px',
            '80':'80px',
            '100':'100px',
            '300':'300px',
           '400':'400px',
            '500':'500px',
        },
        height: {
            'full':'100%',
            '30':'30px',
            '40':'40px',
            '50':'50px',
            '300':'300px',
            '400':'400px',
            '500':'500px',
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
