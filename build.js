require('esbuild')
    .build({
        define: {'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`},
        entryPoints: ['src/kff.js'],
        outfile: 'dist/kff.min.js',
        minify: true,
        sourcemap: false,
        platform: 'browser',
        format: 'iife',
        bundle: true,
        target: 'es2015',
        globalName: 'KFF',
        color: true
    })
    .catch(error => {
        console.error(JSON.stringify(error, null, 2));
    })
    .then(event => {
        console.log(new Date().toISOString(), ' compile start');
    });