const warningLog = warning => {
    warning.forEach(warn => {
        console.error('warning: ', warn.text);
        console.error('detail: ', warn.detail);
        console.error('path: ', `${warn.location.file}:${warn.location.line}:${warn.location.column}`);
        console.error(' -> ', warn.location.lineText);
    });
};
const errorLog = errors => {
    errors.forEach(err => {
        console.error('error: ', err.text);
        console.error('path: ', `${err.location.file}:${err.location.line}:${err.location.column}`);
        console.error(' -> ', err.location.lineText);
    });
};

require('esbuild')
    .build({
        entryPoints: ['src/kff.js'],
        outfile: 'dist/kff.min.js',
        minify: true,
        sourcemap: true,
        platform: 'browser',
        format: 'iife',
        bundle: true,
        target: 'es2015',
        globalName: 'KFF',
        watch: {
            onRebuild: (error, result) => {
                if (error) {
                    console.error(new Date().toISOString(), ' watch build failed ');
                    if (error.warnings) warningLog(error.warnings);
                    if (error.errors) errorLog(error.errors);
                } else {
                    if (result) {
                        console.log(new Date().toISOString(), ' watch build succeeded.');
                        if (result.warnings) warningLog(result.warnings);
                    }
                }
            }
        }
    })
    .catch(error => {
        console.error(JSON.stringify(error, null, 2));
    })
    .then(event => {
        console.log(new Date().toISOString(), ' compile start');
    })