import { execSync } from 'child_process';
import { readFileSync } from 'fs';

const commitMsgFile = process.argv[2];
const commitMsg = readFileSync(commitMsgFile, 'utf-8').trim();

const allowedTypes = [
  'feat',
  'fix',
  'docs',
  'style',
  'refactor',
  'perf',
  'test',
  'build',
  'ci',
  'chore',
  'revert',
];

const typeDescriptions = {
  feat: 'Nouvelle fonctionnalité',
  fix: 'Correction de bug',
  docs: 'Modification de documentation',
  style: 'Changements de style de code (formatage, points-virgules, etc.)',
  refactor: 'Refactorisation de code',
  perf: 'Amélioration de performance',
  test: 'Ajout ou modification de tests',
  build: 'Changements du système de build ou dépendances',
  ci: 'Changements de CI/CD',
  chore: 'Autres changements ne modifiant pas src ou test',
  revert: 'Annulation d\'un commit précédent',
};

function showHelp(error) {
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('❌ MESSAGE DE COMMIT REJETÉ');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  console.log('📝 Votre message: \x1b[31m' + commitMsg + '\x1b[0m\n');

  console.log('🔍 Cause du rejet:');
  console.log('   ' + error + '\n');

  console.log('✅ FORMAT REQUIS:');
  console.log('   \x1b[36mtype(scope): sujet\x1b[0m');
  console.log('   ou');
  console.log('   \x1b[36mtype: sujet\x1b[0m\n');

  console.log('📋 TYPES AUTORISÉS:\n');
  allowedTypes.forEach((type) => {
    console.log(`   \x1b[32m${type.padEnd(10)}\x1b[0m → ${typeDescriptions[type]}`);
  });

  console.log('\n💡 EXEMPLES VALIDES:');
  console.log('   \x1b[32m✓\x1b[0m feat(auth): ajouter la fonctionnalité de connexion');
  console.log('   \x1b[32m✓\x1b[0m fix(store): corriger la mutation d\'état');
  console.log('   \x1b[32m✓\x1b[0m docs: mettre à jour le README');
  console.log('   \x1b[32m✓\x1b[0m refactor(components): simplifier le composant bouton\n');

  console.log('❌ EXEMPLES INVALIDES:');
  console.log('   \x1b[31m✗\x1b[0m ajout de nouvelle fonctionnalité \x1b[90m(type manquant)\x1b[0m');
  console.log('   \x1b[31m✗\x1b[0m FEAT: nouvelle fonctionnalité \x1b[90m(type en majuscules)\x1b[0m');
  console.log('   \x1b[31m✗\x1b[0m feat: Nouvelle fonctionnalité \x1b[90m(sujet commence par majuscule)\x1b[0m');
  console.log('   \x1b[31m✗\x1b[0m feat: ajouter fonctionnalité. \x1b[90m(point final)\x1b[0m\n');

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

function detectError() {
  const typeRegex = /^([a-z]+)(\(.+?\))?:\s*.+/;
  const match = commitMsg.match(typeRegex);

  // Check if message is empty
  if (!commitMsg) {
    return 'Le message de commit est vide';
  }

  // Check basic format
  if (!match) {
    if (!commitMsg.includes(':')) {
      return 'Format invalide - Le message doit contenir ":" (ex: type: sujet)';
    }
    const beforeColon = commitMsg.split(':')[0].trim();
    if (/[A-Z]/.test(beforeColon)) {
      return 'Le type doit être en minuscules';
    }
    return 'Format invalide - Utilisez: type(scope): sujet ou type: sujet';
  }

  const type = match[1];

  // Check if type is allowed
  if (!allowedTypes.includes(type)) {
    return `Type "${type}" non autorisé - Choisissez parmi la liste ci-dessous`;
  }

  // Check subject
  const subject = commitMsg.split(':')[1]?.trim();
  if (!subject) {
    return 'Le sujet du commit ne peut pas être vide';
  }

  if (subject.endsWith('.')) {
    return 'Le sujet ne doit pas se terminer par un point';
  }

  if (/^[A-Z]/.test(subject)) {
    return 'Le sujet ne doit pas commencer par une majuscule';
  }

  return null;
}

try {
  // Run commitlint
  execSync(`pnpm exec commitlint --edit ${commitMsgFile}`, {
    stdio: 'pipe',
    encoding: 'utf-8',
  });

  // If we get here, commit message is valid
  process.exit(0);
} catch (error) {
  // Detect specific error
  const errorMsg = detectError();

  if (errorMsg) {
    showHelp(errorMsg);
  } else {
    // Fallback to commitlint error
    console.log(error.stdout || error.stderr);
  }

  process.exit(1);
}
