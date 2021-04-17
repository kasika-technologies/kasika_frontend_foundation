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

## API references

### Instance methods

#### `KFF.Component.attach()`

#### `KFF.Component.detach()`

#### `KFF.Component.render()`

### Instance properties

#### `KFF.Component.data`

### Options

```javascript
const element = '#app';

new KFF.Component(element, {
    data: {},
    state: {},
    isSharedState: false,
    allowHTML: false
});
```

以上