/**
 * RO Factory — Tailwind v3 CDN Configuration
 * 기존 styles.css 디자인 토큰과 동기화
 */
tailwind.config = {
  theme: {
    extend: {
      colors: {
        // ROZ 브랜드 컬러
        'roz-blue': {
          1: '#CCDFF6',
          3: '#9ABEEC',
          5: '#025DD0',
          8: '#012553',
        },
        'roz-dark': {
          1: '#F8F8F8',
          3: '#D6D6D6',
          6: '#64748b',
          8: '#303030',
        },
        // 시맨틱 컬러
        'brand': '#025DD0',
        'brand-dark': '#012553',
        'surface': '#ffffff',
        'surface-alt': '#CCDFF6',
        'muted': '#64748b',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        pretendard: ['Pretendard', 'sans-serif'],
      },
      boxShadow: {
        'roz': '0 4px 10px rgba(2,93,208,0.15)',
        'roz-hover': '0 8px 25px rgba(2,93,208,0.35)',
        'card': '0 4px 15px rgba(0,0,0,0.02)',
        'card-hover': '0 10px 30px rgba(0,0,0,0.08)',
      },
      borderRadius: {
        'xl': '8px',
        '2xl': '10px',
        '3xl': '20px',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease forwards',
        'slide-up': 'slideUp 0.35s cubic-bezier(0.16,1,0.3,1)',
        'bounce-slow': 'bounce 2s infinite ease-in-out',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          from: { transform: 'translateY(100%)' },
          to: { transform: 'translateY(0)' },
        },
      },
    },
  },
}
