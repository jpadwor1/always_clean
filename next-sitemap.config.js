/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://krystalcleanpools.com',
    generateRobotsTxt: true,
    exclude: ['/giveaway/thank-you', '/giveaway/rules'],
    // ...other options
  }
