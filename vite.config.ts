import { defineConfig } from 'vite'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
    base: '/',
    // root: 'src',
    plugins: [
        tailwindcss(),
        VitePWA({
            registerType: 'autoUpdate',
            manifest: {
                name: "Lift",
                short_name: "Lift",
                description: "Track your workout routines, simply",
                icons: [
                    {
                        src: 'icons/pwa-192x192.png',
                        sizes: '192x192',
                        type: 'image/png'
                    },
                    {
                        src: 'icons/pwa-512x512.png',
                        sizes: '512x512',
                        type: 'image/png'
                    },
                    {
                        src: 'icons/pwa-64x64.png',
                        sizes: '64x64',
                        type: 'image/png'
                    },
                    {
                        src: 'icons/maskable-icon-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'any maskable'
                    }
                ],
                theme_color: '#EFF6FF',
                background_color: '#F8FAFC',
                display: 'standalone',
                scope: '/',
                start_url: '/',
                orientation: 'portrait'
            }
        }),
    ],
    build: {
        rollupOptions: {
            input: {
                index: resolve(__dirname, "index.html"),
                workout: resolve(__dirname, "workout.html"),
                workouts: resolve(__dirname, "workouts.html"),
                'add-workout': resolve(__dirname, "add-workout.html")
            }
        },
        outDir: 'dist',
        emptyOutDir: true
    },
    appType: 'mpa'
})