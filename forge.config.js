module.exports = {
  packagerConfig: {
    name: 'Nova Scotia Ocean Game',
    executableName: 'nova-scotia-ocean-game',
    asar: true,
    icon: './public/favicon', // Will look for .ico, .png, .icns based on platform
    appBundleId: 'ca.novascotia.oceangame',
    appVersion: '1.0.0',
    appCopyright: 'Copyright © 2024 Nova Scotia Ocean Game',
    ignore: [
      /^\/src/, // Ignore source files
      /^\/\.git/,
      /^\/\.vscode/,
      /^\/node_modules\/electron/,
      /^\/forge\.config\.js$/,
      /^\/README\.md$/
    ]
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-deb',
      config: {
        options: {
          maintainer: 'Nova Scotia Ocean Game Team',
          homepage: 'https://github.com/novascotia/ocean-game',
          description: 'An educational marine conservation game for Nova Scotia - designed for immersive kiosk mode experience',
          productName: 'Nova Scotia Ocean Game',
          genericName: 'Educational Game',
          categories: ['Education', 'Game'],
          priority: 'optional',
          section: 'games',
          depends: [],
          recommends: [],
          suggests: [],
          enhances: [],
          preDepends: []
        }
      }
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['linux']
    }
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {}
    }
  ]
};