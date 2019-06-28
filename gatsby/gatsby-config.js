/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  pathPrefix: "/aoty-visualizations",
  plugins: [
    {
      resolve: `gatsby-source-drupal`,
      options: {
        baseUrl: `http://aoty-drupal.lndo.site/`
        //apiBase: `api`, // optional, defaults to `jsonapi`
      },
    },
    {
      resolve: `gatsby-plugin-styled-components`
    },
    `gatsby-plugin-react-helmet`
  ],
}
