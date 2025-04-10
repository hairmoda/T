const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: "default-src 'self'; img-src 'self' data: https://ipfs.io https://gateway.pinata.cloud; script-src 'self';"
  }
];

module.exports = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};
