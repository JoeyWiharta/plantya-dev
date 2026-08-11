import { getServerTime } from "./ListApi"

/**
 * [B25] Utilitas pengukuran latensi sisi frontend, khusus untuk
 * pengumpulan data evaluasi skripsi (segmen "SSE dikirim -> diterima
 * browser"). BUKAN fitur produksi - aman dihapus setelah data terkumpul.
 *
 * Cara pakai:
 *   1. Panggil initClockSkewEstimate() sekali saat komponen dashboard
 *      mount, untuk mengestimasi selisih jam server vs browser.
 *   2. Panggil logSseReceived() setiap kali event SSE dashboard-update
 *      diterima.
 *   3. Setelah sesi pengumpulan data selesai, buka console browser dan
 *      panggil window.exportChloraLatencyLog() untuk mengunduh hasilnya
 *      sebagai file JSON.
 */

let cachedSkewMs = null
const logBuffer = []

/**
 * Mengestimasi clock skew antara server dan browser lewat round-trip
 * ke endpoint GET /api/time. skew ≈ serverTimeMs - (t0 + RTT/2).
 * Dipanggil sekali dan di-cache; boleh dipanggil ulang bila ingin
 * mengukur ulang di tengah sesi.
 */
export async function initClockSkewEstimate() {
    try {
        const t0 = Date.now()
        const res = await getServerTime()
        const t1 = Date.now()

        const rttMs = t1 - t0
        const serverTimeMs = res.data.serverTimeMs
        const skewMs = serverTimeMs - (t0 + rttMs / 2)

        cachedSkewMs = skewMs

        console.log(
            `[B25] Clock skew estimate: skew=${skewMs.toFixed(1)}ms rtt=${rttMs}ms`
        )

        return { skewMs, rttMs }
    } catch (error) {
        console.warn("[B25] Failed to estimate clock skew:", error)
        return null
    }
}

/**
 * Mencatat waktu penerimaan event SSE dashboard-update di sisi browser.
 * Dipanggil dari dalam handler SSE, idealnya sebagai baris pertama
 * sebelum parsing/pemrosesan payload lain agar waktunya akurat.
 */
export function logSseReceived(rawEventData) {
    const clientReceivedMs = Date.now()
    const correctedMs = cachedSkewMs != null
        ? clientReceivedMs + cachedSkewMs
        : null

    const entry = {
        stage: "dashboard_sse_received",
        clientReceivedMs,
        correctedMs, // waktu setelah dikoreksi skew, sebanding dengan jam server
        skewMs: cachedSkewMs,
    }

    logBuffer.push(entry)
    console.log("[B25][LATENCY]", JSON.stringify(entry))
}

/**
 * Diekspos ke window agar bisa dipanggil manual dari console browser
 * setelah sesi pengumpulan data selesai (mis. setelah 2-3 jam berjalan).
 */
if (typeof window !== "undefined") {
    window.exportChloraLatencyLog = () => {
        const blob = new Blob([JSON.stringify(logBuffer, null, 2)], {
            type: "application/json",
        })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `chlora-frontend-latency-${Date.now()}.json`
        a.click()
        URL.revokeObjectURL(url)
        console.log(`[B25] Exported ${logBuffer.length} entries.`)
    }
}
