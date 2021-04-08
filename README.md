# Kasika Frontend Foundation

## ビルド手順

### esbuildのインストール

```bash
npm install -g esbuild
```

### ビルド

```bash
esbuild src/kff.js --bundle --global-name=KFF --outfile=dist/kff.min.js --minify
```

以上