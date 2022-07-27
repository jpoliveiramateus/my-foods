
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const { readFile } = require('fs').promises;

let coverageResult;
let runnerId;

// Aqui são as páginas/componentes cuja cobertura será testada.
const componentList = ['total', 'Login', 'Header', 'SearchBar', 'Footer', 'Recipes', 'RecipeDetails', 'RecipeInProgress', 'DoneRecipes', 'FavoriteRecipes', 'Profile'];


// Retorna um objeto com os dados de coverage.
const serializeCoverage = (data) => Object.keys(data).reduce((acc, fileName) => {
  const componentName = componentList.find((key) => fileName.match(`\/${key}(\/index)?\.jsx?$`));  
  const entry = fileName === 'total' ? fileName : componentName;
  
  if(!entry) return acc;
  
  if (acc[entry]) {
    throw new Error(`Mais de um arquivo ou pasta possui "${entry}" em seu nome`)
  }
  
  acc[entry] = data[fileName];

  return acc;
}, {});


// Escreve nosso objeto em um arquivo para ser lido posteriormente. 
const testCoverage = async (id) => {
  await exec('npm run test-coverage -- --coverageReporters="json-summary" --testFailureExitCode=0')
  const dataSerialized = await readFile('coverage/coverage-summary.json', 'utf-8')
    .then((result) => JSON.parse(result))
    .then((data) => serializeCoverage(data))
  coverageResult = dataSerialized;
  runnerId = id;
  return coverageResult
};

// Define se o script de coverage será rodado novamente ou se será usado o resultado salvo em memória
const getCoverage = (id) => id === runnerId ? coverageResult : testCoverage(id);

module.exports = {
  getCoverage
}
