module.exports = {
  branches: ['master'],
  repositoryUrl: 'git@github.com:jumbo-supermarkten/gorillas-fulfillment-adapter.git',
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/npm',
    '@semantic-release/git',
    '@semantic-release/github',
  ],
};
