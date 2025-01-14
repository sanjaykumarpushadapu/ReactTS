const { runPrettier } = require('./format');
const { runLint } = require('./lint');
const { runStyleLint } = require('./styleLint');
function preBuild() {
  // Run format
  runPrettier();

  // Run lint
  runLint(false);

  //run style lint
  runStyleLint(false);
}
module.exports = {
  preBuild, // Ensure this is exported
};
// Execute the linting when the script is directly called
if (require.main === module) {
  preBuild();
}
