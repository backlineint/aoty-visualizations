/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-drupal`,
      options: {
        baseUrl: `http://aoty-drupal.lndo.site/`
        //apiBase: `api`, // optional, defaults to `jsonapi`
      },
    },
  ],
}
