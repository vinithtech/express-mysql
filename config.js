let ENV_CONFIG =
  process.env.NODE_ENV === "production"
    ? "./production_config"
    : "./staging_config";

const config = require(ENV_CONFIG);
module.exports = config;
