import { defineConfig } from 'vite'
import { dirname, resolve} from 'node:path'
import { fileURLToPath} from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
    base: '/',
    // root: 'src',
    plugins: [
        tailwindcss(),
        VitePWA({ registerType: 'autoUpdate', 
            devOptions: {
                enabled: false
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