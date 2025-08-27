import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const buildTimestamp = Date.now();
  const buildId = `build_${buildTimestamp}`;
  
  return {
    server: {
      host: "::",
      port: 8080,
    },
    define: {
      __BUILD_TIMESTAMP__: JSON.stringify(buildTimestamp),
      __BUILD_ID__: JSON.stringify(buildId),
    },
    build: {
      rollupOptions: {
        output: {
          // Force new file names for every build
          entryFileNames: `[name]-${buildId}.[hash].js`,
          chunkFileNames: `[name]-${buildId}.[hash].js`,
          assetFileNames: `[name]-${buildId}.[hash].[ext]`
        }
      }
    },
    plugins: [
      react(),
      mode === 'development' && componentTagger(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.ico', 'robots.txt'],
        workbox: {
          skipWaiting: true,
          clientsClaim: true,
          cleanupOutdatedCaches: true,
          navigateFallbackDenylist: [/^\/_/],
          mode: 'production',
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
              handler: 'NetworkFirst', // Changed to NetworkFirst to force fresh content
              options: {
                cacheName: `google-fonts-cache-${buildId}`,
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365
                }
              }
            }
          ]
        },
        manifest: {
          name: 'Nova Scotia Ocean Game - 5 Scenarios VERIFIED',
          short_name: `Ocean Game v5.0-${buildId}`,
          description: `Educational marine conservation game - 5 Scenarios VERIFIED - Build: ${buildId}`,
          theme_color: '#0369a1',
          background_color: '#ffffff',
          display: 'standalone',
          start_url: `/?v=5.0&build=${buildId}&t=${buildTimestamp}`,
          orientation: 'any',
          icons: [
            {
              src: '/placeholder.svg',
              sizes: '192x192',
              type: 'image/svg+xml'
            }
          ]
        },
        devOptions: {
          enabled: false
        }
      })
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
