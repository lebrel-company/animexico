module.exports = {
    webpackDevMiddleware: function (config) {
        config.watchOptions = {
            poll: 1000,
            aggregateTimeout: 300
        }
        return config
    },
    webpack: function (config, {
        buildId,
        dev,
        isServer,
        defaultLoaders,
        webpack
    }) {
        config.module.rules.push({
            test: /\.(graphql|gql)$/,
            exclude: /node_modules/,
            loader: 'graphql-tag/loader'
        })

        return config
    },
    images: {
        domains: [
        ]
    }
};
