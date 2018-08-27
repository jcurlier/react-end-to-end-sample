/**
 * Seed data.
 */

const sampleUsernames = [
  {firstname: 'Hugo', lastname: 'Loris'},
  {firstname: 'Steve', lastname: 'Mandanda'},
  {firstname: 'Alphonse', lastname: 'Areola'},
  {firstname: 'Djibril', lastname: 'Sidibe'},
  {firstname: 'Benjamin', lastname: 'Pavard'},
  {firstname: 'Samuel', lastname: 'Umtiti'},
  {firstname: 'Raphael', lastname: 'Varane'},
  {firstname: 'Presnel', lastname: 'Kimpembe'},
  {firstname: 'Adil', lastname: 'Rami'},
  {firstname: 'Benjamin', lastname: 'Mendy'},
  {firstname: 'Lucas', lastname: 'Hernandez'},
  {firstname: 'Paul', lastname: 'Pogba'},
  {firstname: 'Corentin', lastname: 'Tolisso'},
  {firstname: 'Blaise', lastname: 'Matuidi'},
  {firstname: 'Ngolo', lastname: 'Kante'},
  {firstname: 'Steven', lastname: 'Nzonzi'},
  {firstname: 'Antoine', lastname: 'Griezmann'},
  {firstname: 'Olivier', lastname: 'Giroud'},
  {firstname: 'Kylian', lastname: 'Mbappe'},
  {firstname: 'Ousmane', lastname: 'Dembele'},
  {firstname: 'Florian', lastname: 'Thauvin'},
  {firstname: 'Nabil', lastname: 'Fekir'},
  {firstname: 'Thomas', lastname: 'Lemar'},
];

const sampleContributors = {
  // A lot
  Loris: [
    'Mandanda', 'Areola', 'Sidibe', 'Pavard', 'Umtiti', 'Varane',
    'Kimpembe', 'Rami', 'Mendy', 'Hernandez', 'Pogba', 'Tolisso',
    'Matuidi', 'Kante', 'Nzonzi', 'Griezmann', 'Giroud', 'Mbappe',
    'Dembele', 'Thauvin', 'Fekir', 'Lemar',
  ],
  // A few and contribute to itself
  Mandanda: [
    'Loris', 'Mandanda', 'Areola',
  ],
  // Many
  Griezmann: [
    'Giroud', 'Mbappe', 'Dembele', 'Thauvin', 'Fekir', 'Lemar',
  ],
  // Just himself
  Thauvin: [
    'Thauvin',
  ],
  // Just one
  Giroud: [
    'Griezmann',
  ],
  // Everybody else none
};

const sampleTokens = {
  Loris: [
    'Z5RyMrEi60hHd3Gy4ikN4eVlVikJhLETSdG6MWLWWWpjNjW5CjbrcF6uZtpjsGdd',
  ],
  Mandanda: [
    'juIqY2bOHfjFosquzcVCfn3WeCEG24u7p7pw2ir3UIbvF2wPvTJAFJBQuqVL5o4e',
  ],
  Griezmann: [
    '7ekmctGbqQKPGJlrgx6YKuDb9hWgNrzLKAWARFyS2GjAA6AGSUpw2Xw2SX4XY9eA',
  ],
  Thauvin: [
    'IQIP6bANo9C43s9OHawVnz03yG1219DHljRkELGQvcy05rB1ppr48nKvhNCyyVK5',
  ],
  Giroud: [
    'BWI4eYAVdCJ0joHJQQHSC8TIe6H0efXOfgOVnZAFWTc2CMj87fsfE6dyUwpOTBX7',
  ],
  Matuidi: [
    'gRUDqf1dGpRtfzx4M8tzss6S0OSToxTmYw0N935fwkmTXmw9INZFPwZwgIntRcHJ',
  ],
};

module.exports = {
  sampleUsernames,
  sampleContributors,
  sampleTokens,
};
