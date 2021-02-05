const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WriteFilePlugin = require("write-file-webpack-plugin")
const autoprefixer = require("autoprefixer");

var mode = process.env.NODE_ENV || 'development';
const BUILD_PATH = path.resolve(__dirname, 'dist');
const SOURCE_PATH = path.resolve(__dirname, 'src');
const VIEWS_PATH = path.resolve(__dirname, SOURCE_PATH + '/views');
const PUBLIC_PATH = '/renderer/'


function tryResolve_(url, sourceFilename) {
  // Put require.resolve in a try/catch to avoid node-sass failing with cryptic libsass errors
  // when the importer throws
  try {
    return require.resolve(url, {paths: [path.dirname(sourceFilename)]});
  } catch (e) {
    return '';
  }
}

function tryResolveScss(url, sourceFilename) {
  // Support omission of .scss and leading _
  const normalizedUrl = url.endsWith('.scss') ? url : `${url}.scss`;
  return tryResolve_(normalizedUrl, sourceFilename) ||
    tryResolve_(path.join(path.dirname(normalizedUrl), `_${path.basename(normalizedUrl)}`),
      sourceFilename);
}

function materialImporter(url, prev) {
  if (url.startsWith('@material')) {
    const resolved = tryResolveScss(url, prev);
    return {file: resolved || url};
  }
  return {file: url};
}

module.exports = {
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    mainFields: ["main", "module", "browser"],
  },
  entry: ["./src/app/main.scss", "./src/renderer.tsx"],
  target: "web",
  devtool: (mode === 'development') ? 'inline-source-map' : false,
  mode: mode,
  resolve: {
    alias: {
      ['@']: path.resolve(__dirname, 'src')
    },
    extensions: ['.tsx', '.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        },
      }, {
        test: /\.(css|sass|scss)$/,
        include: [
          path.resolve(__dirname, 'node_modules'),
          path.resolve(__dirname, 'src/app/')
        ],
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'bundle.css',
            },
          },
          { loader: 'extract-loader' },
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [autoprefixer()]
              }
            }
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              webpackImporter: false,
              sassOptions: {
                importer: materialImporter,
                includePaths: ['./node_modules']
              }
            }
          }
        ]
      }, {
        test: /\.(woff(2)?|ttf|eot|svg|otf)$/,
        exclude: path.resolve(__dirname, './src/app/assets/images'),
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/fonts/'
            }
          },
        ]
      }, {
        test: /\.(png|jpg|jpeg|webp|gif)$/,
        exclude: path.resolve(__dirname, './src/app/assets/fonts'),
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/images/'
            }
          }
        ]
      },
    ],
  },
  devServer: {
    contentBase: './dist/renderer/',
    inline: true,
    port: 8080,
    compress:true,
    watchContentBase: true,
    historyApiFallback: true,
    writeToDisk: true
  },
  output: {
    path: path.resolve(__dirname, 'dist/renderer/'),
    filename: "js/[name].js",
    chunkFilename: 'js/[id].[chunkhash].js',
    publicPath: 'dist/renderer'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: VIEWS_PATH + '/index.html',
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      template: VIEWS_PATH + '/splashscreen.html',
      filename: 'splashscreen.html'
    }),
    new WriteFilePlugin({
      test: /^(?!.*(hot\-+|hot)).*/
    })
  ],
};