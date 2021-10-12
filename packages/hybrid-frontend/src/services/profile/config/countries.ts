export type CountryCode =
  | 'AD'
  | 'AE'
  | 'AF'
  | 'AG'
  | 'AI'
  | 'AL'
  | 'AM'
  | 'AN'
  | 'AO'
  | 'AQ'
  | 'AR'
  | 'AS'
  | 'AT'
  | 'AU'
  | 'AW'
  | 'AX'
  | 'AZ'
  | 'BA'
  | 'BB'
  | 'BD'
  | 'BE'
  | 'BF'
  | 'BG'
  | 'BH'
  | 'BI'
  | 'BJ'
  | 'BL'
  | 'BM'
  | 'BN'
  | 'BO'
  | 'BQ'
  | 'BR'
  | 'BS'
  | 'BT'
  | 'BV'
  | 'BW'
  | 'BY'
  | 'BZ'
  | 'CA'
  | 'CC'
  | 'CD'
  | 'CF'
  | 'CG'
  | 'CH'
  | 'CI'
  | 'CK'
  | 'CL'
  | 'CM'
  | 'CN'
  | 'CO'
  | 'CR'
  | 'CS'
  | 'CU'
  | 'CV'
  | 'CW'
  | 'CX'
  | 'CY'
  | 'CZ'
  | 'DE'
  | 'DJ'
  | 'DK'
  | 'DM'
  | 'DO'
  | 'DZ'
  | 'EC'
  | 'EE'
  | 'EG'
  | 'EH'
  | 'ER'
  | 'ES'
  | 'ET'
  | 'FI'
  | 'FJ'
  | 'FK'
  | 'FM'
  | 'FO'
  | 'FR'
  | 'GA'
  | 'GB'
  | 'GD'
  | 'GE'
  | 'GF'
  | 'GG'
  | 'GH'
  | 'GI'
  | 'GL'
  | 'GM'
  | 'GN'
  | 'GP'
  | 'GQ'
  | 'GR'
  | 'GS'
  | 'GT'
  | 'GU'
  | 'GW'
  | 'GY'
  | 'HK'
  | 'HM'
  | 'HN'
  | 'HR'
  | 'HT'
  | 'HU'
  | 'ID'
  | 'IE'
  | 'IL'
  | 'IM'
  | 'IN'
  | 'IO'
  | 'IQ'
  | 'IR'
  | 'IS'
  | 'IT'
  | 'JE'
  | 'JM'
  | 'JO'
  | 'JP'
  | 'KE'
  | 'KG'
  | 'KH'
  | 'KI'
  | 'KM'
  | 'KN'
  | 'KP'
  | 'KR'
  | 'KW'
  | 'KY'
  | 'KZ'
  | 'LA'
  | 'LB'
  | 'LC'
  | 'LI'
  | 'LK'
  | 'LR'
  | 'LS'
  | 'LT'
  | 'LU'
  | 'LV'
  | 'LY'
  | 'MA'
  | 'MC'
  | 'MD'
  | 'ME'
  | 'MF'
  | 'MG'
  | 'MH'
  | 'MK'
  | 'ML'
  | 'MM'
  | 'MN'
  | 'MO'
  | 'MP'
  | 'MQ'
  | 'MR'
  | 'MS'
  | 'MT'
  | 'MU'
  | 'MV'
  | 'MW'
  | 'MX'
  | 'MY'
  | 'MZ'
  | 'NA'
  | 'NC'
  | 'NE'
  | 'NF'
  | 'NG'
  | 'NI'
  | 'NL'
  | 'NO'
  | 'NP'
  | 'NR'
  | 'NU'
  | 'NZ'
  | 'OM'
  | 'PA'
  | 'PE'
  | 'PF'
  | 'PG'
  | 'PH'
  | 'PK'
  | 'PL'
  | 'PM'
  | 'PN'
  | 'PR'
  | 'PS'
  | 'PT'
  | 'PW'
  | 'PY'
  | 'QA'
  | 'RE'
  | 'RO'
  | 'RS'
  | 'RU'
  | 'RW'
  | 'SA'
  | 'SB'
  | 'SC'
  | 'SD'
  | 'SE'
  | 'SG'
  | 'SH'
  | 'SI'
  | 'SJ'
  | 'SK'
  | 'SL'
  | 'SM'
  | 'SN'
  | 'SO'
  | 'SR'
  | 'SS'
  | 'ST'
  | 'SV'
  | 'SX'
  | 'SY'
  | 'SZ'
  | 'TC'
  | 'TD'
  | 'TF'
  | 'TG'
  | 'TH'
  | 'TJ'
  | 'TK'
  | 'TL'
  | 'TM'
  | 'TN'
  | 'TO'
  | 'TR'
  | 'TT'
  | 'TV'
  | 'TW'
  | 'TZ'
  | 'UA'
  | 'UG'
  | 'UM'
  | 'US'
  | 'UY'
  | 'UZ'
  | 'VA'
  | 'VC'
  | 'VE'
  | 'VG'
  | 'VI'
  | 'VN'
  | 'VU'
  | 'WF'
  | 'WS'
  | 'XK'
  | 'YE'
  | 'YT'
  | 'ZA'
  | 'ZM'
  | 'ZW'
  | 'ZZ';

const countries: Array<{ id: number; code: CountryCode; name: string }> = [
  { id: 1, code: 'AD', name: 'Andorra' },
  { id: 2, code: 'AE', name: 'United Arab Emirates' },
  { id: 3, code: 'AF', name: 'Afghanistan' },
  { id: 4, code: 'AG', name: 'Antigua And Barbuda' },
  { id: 5, code: 'AI', name: 'Anguilla' },
  { id: 6, code: 'AL', name: 'Albania' },
  { id: 7, code: 'AM', name: 'Armenia' },
  { id: 8, code: 'AN', name: 'Netherlands Antilles' },
  { id: 9, code: 'AO', name: 'Angola' },
  { id: 10, code: 'AQ', name: 'Antarctica' },
  { id: 11, code: 'AR', name: 'Argentina' },
  { id: 12, code: 'AS', name: 'American Samoa' },
  { id: 13, code: 'AT', name: 'Austria' },
  { id: 14, code: 'AU', name: 'Australia' },
  { id: 15, code: 'AW', name: 'Aruba' },
  { id: 16, code: 'AX', name: 'Aaland Islands' },
  { id: 17, code: 'AZ', name: 'Azerbaijan' },
  { id: 18, code: 'BA', name: 'Bosnia And Herzegovina' },
  { id: 19, code: 'BB', name: 'Barbados' },
  { id: 20, code: 'BD', name: 'Bangladesh' },
  { id: 21, code: 'BE', name: 'Belgium' },
  { id: 22, code: 'BF', name: 'Burkina Faso' },
  { id: 23, code: 'BG', name: 'Bulgaria' },
  { id: 24, code: 'BH', name: 'Bahrain' },
  { id: 25, code: 'BI', name: 'Burundi' },
  { id: 26, code: 'BJ', name: 'Benin' },
  { id: 27, code: 'BL', name: 'Saint Barthelemy' },
  { id: 28, code: 'BM', name: 'Bermuda' },
  { id: 29, code: 'BN', name: 'Brunei Darussalam' },
  { id: 30, code: 'BO', name: 'Bolivia' },
  { id: 31, code: 'BQ', name: 'Bonaire, Saint Eustatius and Saba' },
  { id: 32, code: 'BR', name: 'Brazil' },
  { id: 33, code: 'BS', name: 'Bahamas' },
  { id: 34, code: 'BT', name: 'Bhutan' },
  { id: 35, code: 'BV', name: 'Bouvet Island' },
  { id: 36, code: 'BW', name: 'Botswana' },
  { id: 37, code: 'BY', name: 'Belarus' },
  { id: 38, code: 'BZ', name: 'Belize' },
  { id: 39, code: 'CA', name: 'Canada' },
  { id: 40, code: 'CC', name: 'Cocos (Keeling) Islands' },
  { id: 41, code: 'CD', name: 'Congo, The Democratic Republic Of The' },
  { id: 42, code: 'CF', name: 'Central African Republic' },
  { id: 43, code: 'CG', name: 'Congo' },
  { id: 44, code: 'CH', name: 'Switzerland' },
  { id: 45, code: 'CI', name: "Cote D'Ivoire" },
  { id: 46, code: 'CK', name: 'Cook Islands' },
  { id: 47, code: 'CL', name: 'Chile' },
  { id: 48, code: 'CM', name: 'Cameroon' },
  { id: 49, code: 'CN', name: 'China' },
  { id: 50, code: 'CO', name: 'Colombia' },
  { id: 51, code: 'CR', name: 'Costa Rica' },
  { id: 52, code: 'CS', name: 'Serbia And Montenegro' },
  { id: 53, code: 'CU', name: 'Cuba' },
  { id: 54, code: 'CV', name: 'Cape Verde' },
  { id: 55, code: 'CW', name: 'Curacao' },
  { id: 56, code: 'CX', name: 'Christmas Island' },
  { id: 57, code: 'CY', name: 'Cyprus' },
  { id: 58, code: 'CZ', name: 'Czech Republic' },
  { id: 59, code: 'DE', name: 'Germany' },
  { id: 60, code: 'DJ', name: 'Djibouti' },
  { id: 61, code: 'DK', name: 'Denmark' },
  { id: 62, code: 'DM', name: 'Dominica' },
  { id: 63, code: 'DO', name: 'Dominican Republic' },
  { id: 64, code: 'DZ', name: 'Algeria' },
  { id: 65, code: 'EC', name: 'Ecuador' },
  { id: 66, code: 'EE', name: 'Estonia' },
  { id: 67, code: 'EG', name: 'Egypt' },
  { id: 68, code: 'EH', name: 'Western Sahara' },
  { id: 69, code: 'ER', name: 'Eritrea' },
  { id: 70, code: 'ES', name: 'Spain' },
  { id: 71, code: 'ET', name: 'Ethiopia' },
  { id: 73, code: 'FI', name: 'Finland' },
  { id: 74, code: 'FJ', name: 'Fiji' },
  { id: 75, code: 'FK', name: 'Falkland Islands (Malvinas)' },
  { id: 76, code: 'FM', name: 'Micronesia, Federated States Of' },
  { id: 77, code: 'FO', name: 'Faroe Islands' },
  { id: 78, code: 'FR', name: 'France' },
  { id: 79, code: 'GA', name: 'Gabon' },
  { id: 80, code: 'GB', name: 'United Kingdom' },
  { id: 81, code: 'GD', name: 'Grenada' },
  { id: 82, code: 'GE', name: 'Georgia' },
  { id: 83, code: 'GF', name: 'French Guiana' },
  { id: 84, code: 'GG', name: 'Guernsey' },
  { id: 85, code: 'GH', name: 'Ghana' },
  { id: 86, code: 'GI', name: 'Gibraltar' },
  { id: 87, code: 'GL', name: 'Greenland' },
  { id: 88, code: 'GM', name: 'Gambia' },
  { id: 89, code: 'GN', name: 'Guinea' },
  { id: 90, code: 'GP', name: 'Guadeloupe' },
  { id: 91, code: 'GQ', name: 'Equatorial Guinea' },
  { id: 92, code: 'GR', name: 'Greece' },
  { id: 93, code: 'GS', name: 'South Georgia And The South Sandwich Islands' },
  { id: 94, code: 'GT', name: 'Guatemala' },
  { id: 95, code: 'GU', name: 'Guam' },
  { id: 96, code: 'GW', name: 'Guinea-Bissau' },
  { id: 97, code: 'GY', name: 'Guyana' },
  { id: 98, code: 'HK', name: 'Hong Kong' },
  { id: 99, code: 'HM', name: 'Heard Island And Mcdonald Islands' },
  { id: 100, code: 'HN', name: 'Honduras' },
  { id: 101, code: 'HR', name: 'Croatia' },
  { id: 102, code: 'HT', name: 'Haiti' },
  { id: 103, code: 'HU', name: 'Hungary' },
  { id: 104, code: 'ID', name: 'Indonesia' },
  { id: 105, code: 'IE', name: 'Ireland' },
  { id: 106, code: 'IL', name: 'Israel' },
  { id: 107, code: 'IM', name: 'Isle of Man' },
  { id: 108, code: 'IN', name: 'India' },
  { id: 109, code: 'IO', name: 'British Indian Ocean Territory' },
  { id: 110, code: 'IQ', name: 'Iraq' },
  { id: 111, code: 'IR', name: 'Iran, Islamic Republic Of' },
  { id: 112, code: 'IS', name: 'Iceland' },
  { id: 113, code: 'IT', name: 'Italy' },
  { id: 114, code: 'JE', name: 'Jersey' },
  { id: 115, code: 'JM', name: 'Jamaica' },
  { id: 116, code: 'JO', name: 'Jordan' },
  { id: 117, code: 'JP', name: 'Japan' },
  { id: 118, code: 'KE', name: 'Kenya' },
  { id: 119, code: 'KG', name: 'Kyrgyzstan' },
  { id: 120, code: 'KH', name: 'Cambodia' },
  { id: 121, code: 'KI', name: 'Kiribati' },
  { id: 122, code: 'KM', name: 'Comoros' },
  { id: 123, code: 'KN', name: 'Saint Kitts And Nevis' },
  { id: 124, code: 'KP', name: "Korea, Democratic People's Republic Of" },
  { id: 125, code: 'KR', name: 'Korea, Republic of' },
  { id: 126, code: 'KW', name: 'Kuwait' },
  { id: 127, code: 'KY', name: 'Cayman Islands' },
  { id: 128, code: 'KZ', name: 'Kazakhstan' },
  { id: 129, code: 'LA', name: "Lao People's Democratic Republic" },
  { id: 130, code: 'LB', name: 'Lebanon' },
  { id: 131, code: 'LC', name: 'Saint Lucia' },
  { id: 132, code: 'LI', name: 'Liechtenstein' },
  { id: 133, code: 'LK', name: 'Sri Lanka' },
  { id: 134, code: 'LR', name: 'Liberia' },
  { id: 135, code: 'LS', name: 'Lesotho' },
  { id: 136, code: 'LT', name: 'Lithuania' },
  { id: 137, code: 'LU', name: 'Luxembourg' },
  { id: 138, code: 'LV', name: 'Latvia' },
  { id: 139, code: 'LY', name: 'Libyan Arab Jamahiriya' },
  { id: 140, code: 'MA', name: 'Morocco' },
  { id: 141, code: 'MC', name: 'Monaco' },
  { id: 142, code: 'MD', name: 'Moldova, Republic Of' },
  { id: 143, code: 'ME', name: 'Montenegro' },
  { id: 144, code: 'MF', name: 'Saint Martin' },
  { id: 145, code: 'MG', name: 'Madagascar' },
  { id: 146, code: 'MH', name: 'Marshall Islands' },
  { id: 147, code: 'MK', name: 'Northern Macedonia' },
  { id: 148, code: 'ML', name: 'Mali' },
  { id: 149, code: 'MM', name: 'Myanmar' },
  { id: 150, code: 'MN', name: 'Mongolia' },
  { id: 151, code: 'MO', name: 'Macao' },
  { id: 152, code: 'MP', name: 'Northern Mariana Islands' },
  { id: 153, code: 'MQ', name: 'Martinique' },
  { id: 154, code: 'MR', name: 'Mauritania' },
  { id: 155, code: 'MS', name: 'Montserrat' },
  { id: 156, code: 'MT', name: 'Malta' },
  { id: 157, code: 'MU', name: 'Mauritius' },
  { id: 158, code: 'MV', name: 'Maldives' },
  { id: 159, code: 'MW', name: 'Malawi' },
  { id: 160, code: 'MX', name: 'Mexico' },
  { id: 161, code: 'MY', name: 'Malaysia' },
  { id: 162, code: 'MZ', name: 'Mozambique' },
  { id: 163, code: 'NA', name: 'Namibia' },
  { id: 164, code: 'NC', name: 'New Caledonia' },
  { id: 165, code: 'NE', name: 'Niger' },
  { id: 166, code: 'NF', name: 'Norfolk Island' },
  { id: 167, code: 'NG', name: 'Nigeria' },
  { id: 168, code: 'NI', name: 'Nicaragua' },
  { id: 169, code: 'NL', name: 'Netherlands' },
  { id: 170, code: 'NO', name: 'Norway' },
  { id: 171, code: 'NP', name: 'Nepal' },
  { id: 172, code: 'NR', name: 'Nauru' },
  { id: 173, code: 'NU', name: 'Niue' },
  { id: 174, code: 'NZ', name: 'New Zealand' },
  { id: 175, code: 'OM', name: 'Oman' },
  { id: 176, code: 'PA', name: 'Panama' },
  { id: 177, code: 'PE', name: 'Peru' },
  { id: 178, code: 'PF', name: 'French Polynesia' },
  { id: 179, code: 'PG', name: 'Papua New Guinea' },
  { id: 180, code: 'PH', name: 'Philippines' },
  { id: 181, code: 'PK', name: 'Pakistan' },
  { id: 182, code: 'PL', name: 'Poland' },
  { id: 183, code: 'PM', name: 'Saint Pierre And Miquelon' },
  { id: 184, code: 'PN', name: 'Pitcairn' },
  { id: 185, code: 'PR', name: 'Puerto Rico' },
  { id: 186, code: 'PS', name: 'Palestinian Territory, Occupied' },
  { id: 187, code: 'PT', name: 'Portugal' },
  { id: 188, code: 'PW', name: 'Palau' },
  { id: 189, code: 'PY', name: 'Paraguay' },
  { id: 190, code: 'QA', name: 'Qatar' },
  { id: 191, code: 'RE', name: 'Reunion' },
  { id: 192, code: 'RO', name: 'Romania' },
  { id: 193, code: 'RS', name: 'Serbia' },
  { id: 194, code: 'RU', name: 'Russian Federation' },
  { id: 195, code: 'RW', name: 'Rwanda' },
  { id: 196, code: 'SA', name: 'Saudi Arabia' },
  { id: 197, code: 'SB', name: 'Solomon Islands' },
  { id: 198, code: 'SC', name: 'Seychelles' },
  { id: 199, code: 'SD', name: 'Sudan' },
  { id: 200, code: 'SE', name: 'Sweden' },
  { id: 201, code: 'SG', name: 'Singapore' },
  { id: 202, code: 'SH', name: 'Saint Helena' },
  { id: 203, code: 'SI', name: 'Slovenia' },
  { id: 204, code: 'SJ', name: 'Svalbard And Jan Mayen' },
  { id: 205, code: 'SK', name: 'Slovakia' },
  { id: 206, code: 'SL', name: 'Sierra Leone' },
  { id: 207, code: 'SM', name: 'San Marino' },
  { id: 208, code: 'SN', name: 'Senegal' },
  { id: 209, code: 'SO', name: 'Somalia' },
  { id: 210, code: 'SR', name: 'Suriname' },
  { id: 253, code: 'SS', name: 'South Sudan' },
  { id: 211, code: 'ST', name: 'Sao Tome And Principe' },
  { id: 212, code: 'SV', name: 'El Salvador' },
  { id: 213, code: 'SX', name: 'Sint Maarten (Dutch part)' },
  { id: 214, code: 'SY', name: 'Syrian Arab Republic' },
  { id: 215, code: 'SZ', name: 'Eswatini' },
  { id: 216, code: 'TC', name: 'Turks And Caicos Islands' },
  { id: 217, code: 'TD', name: 'Chad' },
  { id: 218, code: 'TF', name: 'French Southern Territories' },
  { id: 219, code: 'TG', name: 'Togo' },
  { id: 220, code: 'TH', name: 'Thailand' },
  { id: 221, code: 'TJ', name: 'Tajikistan' },
  { id: 222, code: 'TK', name: 'Tokelau' },
  { id: 223, code: 'TL', name: 'Timor-Leste' },
  { id: 224, code: 'TM', name: 'Turkmenistan' },
  { id: 225, code: 'TN', name: 'Tunisia' },
  { id: 226, code: 'TO', name: 'Tonga' },
  { id: 227, code: 'TR', name: 'Turkey' },
  { id: 228, code: 'TT', name: 'Trinidad And Tobago' },
  { id: 229, code: 'TV', name: 'Tuvalu' },
  { id: 230, code: 'TW', name: 'Taiwan, Province Of China' },
  { id: 231, code: 'TZ', name: 'Tanzania, United Republic Of' },
  { id: 232, code: 'UA', name: 'Ukraine' },
  { id: 233, code: 'UG', name: 'Uganda' },
  { id: 234, code: 'UM', name: 'United States Minor Outlying Islands' },
  { id: 235, code: 'US', name: 'United States' },
  { id: 236, code: 'UY', name: 'Uruguay' },
  { id: 237, code: 'UZ', name: 'Uzbekistan' },
  { id: 238, code: 'VA', name: 'Holy See (Vatican City State)' },
  { id: 239, code: 'VC', name: 'Saint Vincent And The Grenadines' },
  { id: 240, code: 'VE', name: 'Venezuela, Bolivarian Republic Of' },
  { id: 241, code: 'VG', name: 'Virgin Islands, British' },
  { id: 242, code: 'VI', name: 'Virgin Islands, U.S.' },
  { id: 243, code: 'VN', name: 'Viet Nam' },
  { id: 244, code: 'VU', name: 'Vanuatu' },
  { id: 245, code: 'WF', name: 'Wallis And Futuna' },
  { id: 246, code: 'WS', name: 'Samoa' },
  { id: 254, code: 'XK', name: 'Kosovo' },
  { id: 247, code: 'YE', name: 'Yemen' },
  { id: 248, code: 'YT', name: 'Mayotte' },
  { id: 249, code: 'ZA', name: 'South Africa' },
  { id: 250, code: 'ZM', name: 'Zambia' },
  { id: 251, code: 'ZW', name: 'Zimbabwe' },
  { id: 252, code: 'ZZ', name: 'Supranational' },
];

export default countries;
