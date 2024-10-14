// eslint-disable-next-line import/no-extraneous-dependencies
//  
// eslint-disable-next-line import/no-extraneous-dependencies
// const CracoLessPlugin = require('craco-less');
// const path = require('path');
/*
comment
name(module) {
  const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
  return `npm.${packageName.replace('@', '')}`;
},
*/

module.exports = {
  webpack: {
    configure: {
      optimization: {
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          minSize: 0,
          maxInitialRequests: Infinity,
          cacheGroups: {
            jovomodule: {
              test: /[\\/]node_modules[\\/](@jovo)[\\/]/,
              name: 'jovomodules',
              priority: 1,
            },
            vendor: {
              test: /[\\/]node_modules[\\/]((?!(@teksible)).*)[\\/]/,
              name: 'npm_bundle',
              reuseExistingChunk: true,
            },
          },
        },
      },
      module: {
        rules: [
          {
            test: /\.(module)\.(less)$/,
            exclude: /node_modules\/(?!(@teksible)\/).*/,
            use: [
              {
                loader: 'style-loader',
              },
              {
                loader: 'css-loader',
                options: {
                  modules: {
                    localIdentName: '[local]__[hash:base64:5]',
                  },
                },
              },
              {
                loader: 'less-loader',
              },
            ],
          },
        ],
      },
    },
  },
  babel: {
    presets: [
      '@babel/preset-react',
      '@babel/preset-env',
    ],
    plugins: [
      '@babel/plugin-proposal-class-properties',
      [
        'module-resolver',
        {
          root: [
            './src',
          ],
          alias: {
            // '@utils': './src/globals/utils',
            '@globalComps': './src/globals/components',
            // '@models': './src/models',
            // '@screens': './src/screens',
            // '@services': './src/services',
            // '@locales': './src/globals/locale',
            // '@images': './src/assets/images',
            // '@less': './src/assets/less',
          },
        },
      ],
    ],
  },
};