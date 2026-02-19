
import { CountryData } from '../types';

const countryNames = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria",
  "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan",
  "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia",
  "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica",
  "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt",
  "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon",
  "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana",
  "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel",
  "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kosovo",
  "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania",
  "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius",
  "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia",
  "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman",
  "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar",
  "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent", "Samoa", "San Marino", "Sao Tome", "Saudi Arabia",
  "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa",
  "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan",
  "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
  "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela",
  "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

const regions = ["Africa", "Asia", "Europe", "North America", "South America", "Oceania"];

export const MOCK_COUNTRIES: CountryData[] = countryNames.map((name, index) => {
  const region = regions[index % regions.length];
  const gdp = Math.floor(Math.random() * 60000) + 500;
  const spi = Math.floor(Math.random() * 70) + 20;
  const innovation = Math.floor(Math.random() * 100);
  const deviance = Math.floor(Math.random() * 100);
  const readiness = Math.floor(Math.random() * 100);
  const totalFunding = Math.floor(Math.random() * 5000) + 100;

  return {
    id: (index + 1).toString(),
    name,
    region,
    gdp,
    spi,
    innovationScore: innovation,
    devianceScore: deviance,
    replicationReadiness: readiness,
    fundingTotal: totalFunding,
    healthcareFunding: Math.floor(totalFunding * (Math.random() * 0.4)),
    educationFunding: Math.floor(totalFunding * (Math.random() * 0.3)),
    infrastructureFunding: Math.floor(totalFunding * (Math.random() * 0.2)),
    energyFunding: Math.floor(totalFunding * (Math.random() * 0.1)),
    impactScore: Math.floor(Math.random() * 100),
    efficiency: Math.floor(Math.random() * 100),
    complianceScore: Math.floor(Math.random() * 100),
    equityIndex: Math.floor(Math.random() * 100),
    policyGaps: Math.floor(Math.random() * 20),
    collaborations: Math.floor(Math.random() * 50),
    latency: Math.floor(Math.random() * 100),
  };
});
