// typography.js

const typography = {
    fontFamily: "Poppins, sans-serif",

    // --- UKURAN DASAR ---
    // body1 adalah ukuran teks paling umum. Kita set ke 13px.
    body1: {
        fontSize: "13px",
        lineHeight: 1.5,
    },

    // --- TEKS SEKUNDER ---
    body2: {
        fontSize: "12px",
        lineHeight: 1.43,
    },

    // --- JUDUL (HEADINGS) ---
    h1: { fontSize: "2rem" },    // 32px
    h2: { fontSize: "1.5rem" },  // 24px
    h3: { fontSize: "1.25rem" }, // 20px
    h4: { fontSize: "1.125rem" }, // 18px
    h5: { fontSize: "1rem" },    // 16px
    h6: { fontSize: "0.875rem" }, // 14px

    // --- KOMPONEN SPESIFIK ---
    // Digunakan oleh TextField Label
    subtitle2: {
        fontSize: "14px", // Label terlihat jelas saat di dalam field
        fontWeight: 500,
    },

    // Digunakan oleh Button
    button: {
        fontSize: "13px", // Sesuai dengan ukuran dasar Anda
        fontWeight: 500,
        textTransform: "none",
    },

    // Digunakan oleh Helper Text, Caption
    caption: {
        fontSize: "11px",
        lineHeight: 1.66,
    },
};

export default typography;