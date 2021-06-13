const colors = require('tailwindcss/colors')

module.exports = {
    purge: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        colors: {
            transparent: 'transparent',
            choco: '#3a1d18',
            red: '#c42034',
            darkred: '#ab2640',
            midred: '#db2339',
            pale: '#dedbe6',
            lightpale: '#efedf5',
            palered: '#eb918a',
            dark: '#2b2b2b',
            black: '#000000',
            middark: '#373737',
            white: '#ffffff',
            darkblue: '#283043',
            lightblue: '#243d78',
            grayblue: '#B0C4DE',
            green: '#55F939'
        },
        scale: {
            '0': '0',
            '25': '.25',
            '50': '.5',
            '75': '.75',
            '90': '.9',
            '95': '.95',
            '100': '1',
            '101': '1.01',
            '105': '1.05',
            '110': '1.1',
            '125': '1.25',
            '150': '1.5',
            '200': '2',
        },
        fontFamily: {
            simp: ['Tajawal', 'sans-serif'],
            deco: ['Overlock', 'cursive']
        },
    },
    variants: {
        extend: {
        },
    },
    plugins: [],
}
