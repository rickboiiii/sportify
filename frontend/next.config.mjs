import {config} from "@fortawesome/fontawesome-svg-core";

/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: {
        styledComponents: true
    },
    webpack : (config, {isServer}) => {
        if (!isServer) {
            config.resolve = {
                ...config.resolve,
                fallback : {
                    // fixes proxy-agent dependencies
                    fs: false,
                    net: false,
                    dns: false,
                    tls: false
                }
            };
        }
        return config;
    }
};

export default nextConfig;
