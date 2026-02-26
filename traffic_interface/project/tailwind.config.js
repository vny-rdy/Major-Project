/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/*.{html,js}",
    "./index.html",
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./components/**/*.{html,js,jsx,ts,tsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Primary - Deep Infrastructure Blue
        primary: {
          DEFAULT: '#1E40AF', // blue-800
          50: '#EFF6FF', // blue-50
          100: '#DBEAFE', // blue-100
          200: '#BFDBFE', // blue-200
          300: '#93C5FD', // blue-300
          400: '#60A5FA', // blue-400
          500: '#3B82F6', // blue-500
          600: '#2563EB', // blue-600
          700: '#1D4ED8', // blue-700
          800: '#1E40AF', // blue-800
          900: '#1E3A8A', // blue-900
          foreground: '#FFFFFF',
        },
        // Secondary - Neutral Slate
        secondary: {
          DEFAULT: '#475569', // slate-600
          50: '#F8FAFC', // slate-50
          100: '#F1F5F9', // slate-100
          200: '#E2E8F0', // slate-200
          300: '#CBD5E1', // slate-300
          400: '#94A3B8', // slate-400
          500: '#64748B', // slate-500
          600: '#475569', // slate-600
          700: '#334155', // slate-700
          800: '#1E293B', // slate-800
          900: '#0F172A', // slate-900
          foreground: '#FFFFFF',
        },
        // Accent - Traffic Amber
        accent: {
          DEFAULT: '#F59E0B', // amber-500
          50: '#FFFBEB', // amber-50
          100: '#FEF3C7', // amber-100
          200: '#FDE68A', // amber-200
          300: '#FCD34D', // amber-300
          400: '#FBBF24', // amber-400
          500: '#F59E0B', // amber-500
          600: '#D97706', // amber-600
          700: '#B45309', // amber-700
          800: '#92400E', // amber-800
          900: '#78350F', // amber-900
          foreground: '#1F2937', // gray-800
        },
        // Background & Surface
        background: '#F8FAFC', // slate-50
        surface: {
          DEFAULT: '#FFFFFF', // white
          elevated: '#FFFFFF', // white
        },
        // Text Colors
        'text-primary': '#1F2937', // gray-800
        'text-secondary': '#6B7280', // gray-500
        'text-tertiary': '#9CA3AF', // gray-400
        'on-surface': '#374151', // gray-700
        // Semantic Colors
        success: {
          DEFAULT: '#059669', // emerald-600
          50: '#ECFDF5', // emerald-50
          100: '#D1FAE5', // emerald-100
          500: '#10B981', // emerald-500
          600: '#059669', // emerald-600
          700: '#047857', // emerald-700
          foreground: '#FFFFFF',
        },
        warning: {
          DEFAULT: '#D97706', // amber-600
          50: '#FFFBEB', // amber-50
          100: '#FEF3C7', // amber-100
          500: '#F59E0B', // amber-500
          600: '#D97706', // amber-600
          700: '#B45309', // amber-700
          foreground: '#FFFFFF',
        },
        error: {
          DEFAULT: '#DC2626', // red-600
          50: '#FEF2F2', // red-50
          100: '#FEE2E2', // red-100
          500: '#EF4444', // red-500
          600: '#DC2626', // red-600
          700: '#B91C1C', // red-700
          foreground: '#FFFFFF',
        },
        // Border Colors
        border: {
          DEFAULT: '#E2E8F0', // slate-200
          hover: '#CBD5E1', // slate-300
          focus: '#1E40AF', // blue-800
        },
      },
      fontFamily: {
        heading: ['JetBrains Mono', 'monospace'],
        body: ['Source Sans 3', 'sans-serif'],
        caption: ['IBM Plex Sans', 'sans-serif'],
        data: ['Fira Code', 'monospace'],
        sans: ['Source Sans 3', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1.4' }],      // 12px
        'sm': ['0.875rem', { lineHeight: '1.4' }],     // 14px
        'base': ['1rem', { lineHeight: '1.6' }],       // 16px
        'lg': ['1.125rem', { lineHeight: '1.5' }],     // 18px
        'xl': ['1.25rem', { lineHeight: '1.4' }],      // 20px
        '2xl': ['1.5rem', { lineHeight: '1.3' }],      // 24px
        '3xl': ['1.875rem', { lineHeight: '1.25' }],   // 30px
        '4xl': ['2.25rem', { lineHeight: '1.2' }],     // 36px
      },
      spacing: {
        'xs': '0.5rem',    // 8px
        'sm': '1rem',      // 16px
        'md': '1.5rem',    // 24px
        'lg': '2rem',      // 32px
        'xl': '2.5rem',    // 40px
        '2xl': '5rem',     // 80px
      },
      borderRadius: {
        'sm': '0.375rem',  // 6px
        'md': '0.75rem',   // 12px
        'lg': '1.125rem',  // 18px
        'xl': '1.5rem',    // 24px
      },
      boxShadow: {
        'sm': '0 1px 3px rgba(15, 23, 42, 0.08)',
        'DEFAULT': '0 2px 6px rgba(15, 23, 42, 0.08)',
        'md': '0 4px 12px rgba(15, 23, 42, 0.08)',
        'lg': '0 8px 24px rgba(15, 23, 42, 0.12)',
        'xl': '0 20px 40px -8px rgba(15, 23, 42, 0.16)',
        '2xl': '0 24px 48px -12px rgba(15, 23, 42, 0.20)',
      },
      transitionDuration: {
        'fast': '200ms',
        'base': '250ms',
        'slow': '300ms',
        'route': '800ms',
      },
      transitionTimingFunction: {
        'ease-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      zIndex: {
        'base': '0',
        'card': '1',
        'map-overlay': '10',
        'dropdown': '50',
        'navigation': '100',
        'modal': '200',
        'tooltip': '300',
      },
      scale: {
        '96': '0.96',
      },
      maxWidth: {
        'prose': '70ch',
      },
      gap: {
        'grid': '1.25rem', // 20px
      },
      animation: {
        'fadeIn': 'fadeIn 300ms ease-out',
        'scaleIn': 'scaleIn 200ms ease-out',
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.transition-smooth': {
          transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)',
        },
        '.transition-route': {
          transition: 'all 800ms cubic-bezier(0.4, 0, 0.2, 1)',
        },
        '.tabular-nums': {
          'font-variant-numeric': 'tabular-nums',
        },
        '.text-balance': {
          'text-wrap': 'balance',
        },
      }
      addUtilities(newUtilities)
    },
  ],
}