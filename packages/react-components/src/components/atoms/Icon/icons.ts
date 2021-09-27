const icons = {
  account:
    'M6.618 16.465c3.559-.62 7.206-.62 10.765 0l.428.076c1.83.361 3.154 1.884 3.19 3.667v.097c0 .576-.695.901-1.173.549-.389-.287-.626-.709-.862-1.128-.082-.146-.163-.29-.25-.43-.281-.445-.748-.775-1.31-.886l-.382-.068c-3.322-.578-6.726-.578-10.047 0l-.382.068c-.562.111-1.029.441-1.31.886-.087.14-.169.284-.25.43-.236.42-.474.841-.862 1.128-.478.352-1.173.027-1.173-.55v-.096c.035-1.783 1.36-3.306 3.19-3.667l.428-.076zM12 3c3.314 0 6 2.686 6 6s-2.686 6-6 6-6-2.686-6-6 2.686-6 6-6zm0 2C9.79 5 8 6.79 8 9s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z',

  folder:
    'M19 15v-4c0-1.47-.004-2.373-.092-3.025-.077-.574-.187-.67-.2-.681v-.001l-.002-.001c-.011-.013-.107-.123-.68-.2C17.372 7.004 16.47 7 15 7h-1.056c-.642.001-1.292.002-1.93-.168-.64-.17-1.203-.492-1.76-.812l-.13-.074-1.023-.585c-.45-.257-.5-.28-.537-.294-.068-.026-.139-.045-.21-.056C8.312 5.005 8.257 5 7.74 5c-.844 0-1.36.001-1.748.032-.18.014-.29.032-.357.047l-.061.017-.015.006c-.2.098-.36.259-.458.458l-.006.015c-.003.01-.01.03-.07.061-.015.067-.033.177-.047.357C5.002 6.38 5 6.897 5 7.74V15c0 1.47.004 2.373.092 3.025.077.574.187.67.2.681v.001l.002.001c.011.013.107.123.68.2C6.628 18.996 7.53 19 9 19h6c1.47 0 2.373-.004 3.025-.092.574-.077.67-.187.681-.2h.001l.001-.002c.013-.011.123-.107.2-.68.088-.653.092-1.555.092-3.026zM3.306 4.68C3 5.303 3 6.115 3 7.74V15c0 2.828 0 4.243.879 5.121C4.757 21 6.172 21 9 21h6c2.828 0 4.243 0 5.121-.879C21 19.243 21 17.828 21 15v-4c0-2.828 0-4.243-.879-5.121C19.243 5 17.828 5 15 5h-.907c-.792 0-1.188 0-1.566-.1-.379-.101-.723-.298-1.41-.69l-1.024-.585c-.399-.228-.598-.342-.809-.424-.203-.078-.415-.134-.63-.167C8.43 3 8.2 3 7.74 3c-1.625 0-2.437 0-3.062.306-.597.293-1.08.776-1.373 1.373z',

  folderPlus:
    'M8.04578357,3.00053074 C8.31454561,3.00212308 8.48564498,3.00849246 8.65350998,3.03396996 C8.86912998,3.06669996 9.08053999,3.12283996 9.28397999,3.20139996 C9.49516999,3.28294996 9.69448999,3.39684996 10.09315,3.62465996 L10.09315,3.62465996 L11.11655,4.20945996 C11.80435,4.60247996 12.1482,4.79899996 12.5267,4.89949996 C12.9051,4.99999996 13.3012,4.99999996 14.0934,4.99999996 L15.6280035,5.0003999 C18.0428006,5.00519925 19.3101923,5.06759073 20.1213,5.87867997 C20.9324077,6.6897692 20.9948005,7.95716803 20.9996,10.3719899 L20.9996,15.6280035 C20.9948005,18.0428006 20.9324077,19.3101923 20.1213,20.1213 C19.3101923,20.9324077 18.0428006,20.9948005 15.6280035,20.9996 L8.37198989,20.9996 C5.95716802,20.9948005 4.68976919,20.9324077 3.87867996,20.1213 C3.10138611,19.3439885 3.01169836,18.1476244 3.00134977,15.923927 L3.00049863,7.20032991 C3.00423871,5.92795983 3.03602937,5.23074114 3.30624996,4.67949996 C3.59907996,4.08214996 4.08214996,3.59907996 4.67949996,3.30624996 C5.23074114,3.03602937 5.92795983,3.00423871 7.20032991,3.00049863 Z M7.97996505,5.00048913 L7.27219254,5.00039661 C6.69531477,5.00174957 6.30263797,5.00757997 5.99294997,5.03205997 C5.81258997,5.04631997 5.70314997,5.06423997 5.63645997,5.07940997 C5.60471997,5.08662997 5.58514997,5.09267997 5.57456997,5.09631997 C5.56454997,5.09976997 5.55984997,5.10206997 5.55984997,5.10206997 C5.36073997,5.19967997 5.19968997,5.36071997 5.10207997,5.55982997 C5.10207997,5.55982997 5.09976997,5.56454997 5.09631997,5.57456997 C5.09267997,5.58514997 5.08662997,5.60471997 5.07940997,5.63645997 C5.06423997,5.70314997 5.04631997,5.81258997 5.03205997,5.99294997 C5.00757997,6.30263797 5.00174957,6.69531477 5.00039661,7.27219254 L5.00049122,15.5964388 C5.00291833,16.7233735 5.01678568,17.4658429 5.09199997,18.0253 C5.15627497,18.5033834 5.24316802,18.6495917 5.27788168,18.6916449 L5.30837163,18.7221598 C5.35040497,18.7568611 5.49660497,18.84375 5.97467997,18.908 C6.53413712,18.9832572 7.27665794,18.9970939 8.40357583,18.9995113 L15.5964388,18.9995113 C16.7233735,18.9970939 17.4658429,18.9832572 18.0253,18.908 C18.5033834,18.84375 18.6495917,18.7568611 18.6916449,18.7221598 L18.7221598,18.6916449 C18.7568611,18.6495917 18.84375,18.5033834 18.908,18.0253 C18.9832572,17.4658429 18.9970939,16.7233735 18.9995113,15.5964388 L18.9995113,10.4035758 C18.9970939,9.27665795 18.9832572,8.53413713 18.908,7.97467998 C18.84375,7.49660498 18.7568611,7.35040498 18.7221598,7.30837743 L18.6916449,7.27788169 C18.6495917,7.24316803 18.5033834,7.15627498 18.0253,7.09199998 C17.4658429,7.01678569 16.7233735,7.00291834 15.5964388,7.00049122 L13.9444,7.00015998 C13.3022,7.00117998 12.6525,7.00221998 12.0134,6.83249997 C11.37426,6.66277997 10.81066,6.33951997 10.25356,6.01999997 L10.12428,5.94594997 L9.10086999,5.36113997 C8.65168998,5.10446997 8.60164998,5.08185997 8.56352998,5.06712997 C8.49571998,5.04094997 8.42524998,5.02222997 8.35336998,5.01131997 C8.32031544,5.00630451 8.27771494,5.00191831 7.97996505,5.00048913 Z M12,8.99999999 C12.5523,8.99999999 13,9.34314999 13,11 L13,11 L13,12 L14,12 C15.6569,12 16,12.4477 16,13 C16,13.5523 15.6569,14 14,14 L14,14 L13,14 L13,15 C13,16.6569 12.5523,17 12,17 C11.44771,17 11,16.6569 11,15 L11,15 L11,14 L9.99999998,14 C8.34314998,14 7.99999998,13.5523 7.99999998,13 C7.99999998,12.4477 8.34314998,12 9.99999998,12 L9.99999998,12 L11,12 L11,11 C11,9.34314999 11.44771,8.99999999 12,8.99999999 Z',

  arrowHeadUp:
    'M17.6454,13.4078 C18.078,13.7167 18.1217,14.3155 17.7383,14.6778 L17.6589,14.7528 C17.3501,15.0445 16.8633,15.0826 16.5079,14.8428 L11.97184,11.13271 L7.49205998,14.8427 C7.13669998,15.0825 6.64989997,15.0445 6.34109997,14.7527 L6.26167997,14.6777 C5.87824997,14.3155 5.92204997,13.7167 6.35457997,13.4077 L11.43303,9.17077999 C11.7518,8.94306998 12.1919,8.94306998 12.5106,9.17077999 L17.6454,13.4078 Z',

  arrowHeadDown:
    'M17.645 10.592c.433-.309.477-.908.093-1.27l-.08-.075c-.308-.292-.795-.33-1.15-.09l-4.536 3.71-4.48-3.71c-.355-.24-.842-.201-1.15.09l-.08.075c-.384.363-.34.961.093 1.27l5.078 4.237c.319.228.759.228 1.078 0l5.134-4.237z',

  arrowHeadRight:
    'M10.592 17.645c-.309.433-.908.477-1.27.093l-.075-.08c-.292-.308-.33-.795-.09-1.15l3.71-4.536-3.71-4.48c-.24-.355-.201-.842.09-1.15l.075-.08c.363-.384.961-.34 1.27.093l4.237 5.078c.228.319.228.759 0 1.078l-4.237 5.134z',

  arrowHeadLeft:
    'M13.408 17.645c.309.433.908.477 1.27.093l.075-.08c.291-.308.33-.795.09-1.15l-3.71-4.536 3.71-4.48c.24-.355.201-.842-.09-1.15l-.075-.08c-.363-.384-.961-.34-1.27.093L9.17 11.433c-.228.319-.228.759 0 1.078l4.237 5.134z',

  britishPound:
    'M8.594 4.965c1.468-1.653 3.932-2.356 6.126-1.75.613.17 1.189.422 1.684.75a6.161 6.161 0 0 1 1.425 1.297A5.384 5.384 0 0 1 19 8.602c.003.62-.542 1.136-1.204 1.136-.663 0-1.202-.514-1.205-1.133 0-.118-.006-.236-.015-.34l-.01-.091-.022-.132a3.922 3.922 0 0 0-.174-.61l-.042-.106-.087-.179a4.08 4.08 0 0 0-.262-.429l-.12-.159-.111-.128a4.312 4.312 0 0 0-.25-.247l-.127-.112-.154-.12-.144-.099a4.478 4.478 0 0 0-.301-.175l-.149-.075-.172-.077-.127-.047a4.452 4.452 0 0 0-.64-.166l-.123-.02-.145-.014a4.54 4.54 0 0 0-.661 0l-.116.01-.146.024c-.216.04-.429.094-.626.16l-.103.036-.193.085a4.33 4.33 0 0 0-.462.255l-.145.097-.154.122a4.2 4.2 0 0 0-.369.349l-.112.126-.119.157a4.05 4.05 0 0 0-.271.44l-.082.167-.067.169a4 4 0 0 0-.104.33l-.039.162-.036.195-.008.072-.013.162-.005.18-.001 3.499h4.378c.32 0 .63.132.87.36l.1.104.08.108a.974.974 0 0 1 .155.562.886.886 0 0 1-.162.53 1.34 1.34 0 0 1-.901.594l-.142.01-4.378-.001.001 2c0 .812-.151 1.607-.451 2.326l-.029.063h8.69c.56 0 1.04.37 1.172.891l.025.124.007.12c0 .561-.449 1.044-1.075 1.126l-.13.007H6.205C5.542 21 5 20.486 5 19.866c0-.609.52-1.112 1.17-1.133h.023l.09-.046.02-.006.069-.056.072-.068.079-.083.08-.105c.075-.108.144-.224.202-.334l.055-.12.061-.144a4.34 4.34 0 0 0 .14-.455l.052-.23.022-.138.028-.262.014-.288.005-.329-.006-.773v-.953l-.95.001a1.2 1.2 0 0 1-1.172-.89l-.024-.123-.008-.12c0-.563.449-1.046 1.075-1.127l.13-.008h.949V8.91c0-.37.014-.683.05-.983l.03-.223c.157-.99.628-1.94 1.338-2.74z',

  waves:
    'M6.402 4.633c-.161.293-.342.755-.613 1.45l-.626 1.611c-.05.13-.113.294-.217.43-.157.208-.378.359-.628.43-.165.047-.34.047-.48.046H3.8c-.994 0-1.2-.269-1.2-.6 0-.331.206-.6 1.2-.6.097 0 .148 0 .184-.002h.004l.002-.004c.015-.033.033-.08.068-.17l.63-1.62c.249-.64.458-1.178.663-1.55.184-.335.518-.827 1.122-.803.604.025.897.543 1.053.892.174.388.339.941.534 1.6l1.2 4.033c.233.785.392 1.315.542 1.656l.017.037.017-.037c.156-.338.324-.865.57-1.646l.451-1.426c.035-.112.079-.251.151-.373.167-.28.44-.48.758-.555.138-.033.284-.032.401-.032h.033c.994 0 1.2.269 1.2.6 0 .331-.206.6-1.2.6h-.019l-.136.001h-.004l-.001.004c-.011.03-.024.07-.048.148l-.455 1.439c-.229.725-.419 1.327-.611 1.743-.098.213-.22.428-.383.596-.178.182-.425.324-.736.322-.311-.003-.556-.149-.73-.335-.161-.17-.278-.387-.373-.602-.185-.419-.365-1.024-.582-1.753L6.923 6.13c-.212-.715-.355-1.19-.492-1.496l-.013-.03-.016.029z',

  dogBark:
    'M10.73 4v3.498l5.29 3.146-.738 2.923c-.393 1.562-1.807 2.657-3.43 2.656h-1.723l-3.104 3.078c-.39.387-1.018.387-1.408 0l-.04-.038c-.388-.393-.385-1.026.008-1.414l3.699-3.663h2.568c.683.004 1.28-.456 1.445-1.113l.36-1.457L8.677 8.64V6.16c-.665.18-1.27.532-1.754 1.02l-1.766 1.75c-.39.387-1.019.387-1.409 0l-.033-.032-.006-.006c-.389-.392-.386-1.025.006-1.414l1.752-1.738C6.588 4.622 8.113 3.995 9.702 4h1.027zm7.59 11.178l.633.628c.392.39.395 1.022.006 1.414l-.006.006-.032.032c-.39.387-1.019.387-1.409 0l-.633-.628c-.392-.388-.394-1.022-.005-1.414l.038-.038c.39-.386 1.018-.386 1.408 0zM20 11.13c.552 0 1 .448 1 1v.037c0 .553-.448 1-1 1h-1.081c-.553 0-1-.447-1-1v-.037c0-.552.447-1 1-1zm-1.078-4.095l.032.032c.392.389.395 1.022.006 1.414l-.006.006-.633.628c-.39.386-1.018.386-1.408 0l-.033-.032c-.392-.39-.394-1.022-.005-1.414l.005-.006.633-.628c.39-.387 1.019-.387 1.409 0z',

  infoCircleIcon:
    'M12 21c4.97 0 9-4.03 9-9s-4.03-9-9-9-9 4.03-9 9 4.03 9 9 9zm0-2c-3.866 0-7-3.134-7-7s3.134-7 7-7 7 3.134 7 7-3.134 7-7 7zm0-10c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm0 8.3c.515 0 .94-.31.994-.898l.006-.13V11.4c0-.673-.448-1.101-1-1.101-.515 0-.94.373-.994.97L11 11.4v4.872c0 .672.448 1.028 1 1.028z',

  plus:
    'M12 4c.552 0 1 .343 1 2v5h5c1.657 0 2 .448 2 1s-.343 1-2 1h-5v5c0 1.657-.448 2-1 2s-1-.343-1-2v-5H6c-1.657 0-2-.448-2-1s.343-1 2-1h5V6c0-1.657.448-2 1-2z',

  smiley:
    'M12 3c4.97 0 9 4.03 9 9s-4.03 9-9 9-9-4.03-9-9 4.03-9 9-9zm0 2c-3.866 0-7 3.134-7 7s3.134 7 7 7 7-3.134 7-7-3.134-7-7-7zm4.27 6.854c.425.085.739.46.675.887-.158 1.052-.648 2.033-1.41 2.795C14.599 16.473 13.327 17 12 17s-2.598-.527-3.536-1.464c-.76-.762-1.251-1.743-1.409-2.795-.064-.428.25-.802.674-.887 2.82-.564 5.722-.564 8.542 0zm-1.73 1.741c-1.686-.218-3.394-.218-5.08 0 .118.19.258.366.419.526.562.563 1.325.879 2.121.879s1.559-.316 2.121-.879c.16-.16.301-.337.42-.526zM9 8c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1zm6 0c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1z',

  successTick:
    'M12 3c4.97 0 9 4.03 9 9s-4.03 9-9 9-9-4.03-9-9 4.03-9 9-9zm0 2c-3.866 0-7 3.134-7 7s3.134 7 7 7 7-3.134 7-7-3.134-7-7-7zm3.486 3.208c.712-.565 1.756.113 1.463.95-.037.106-.095.204-.17.29L11 16l-3.608-2.908c-.142-.115-.247-.264-.306-.432l-.037-.106c-.203-.58.25-1.18.893-1.18.204 0 .402.063.565.18L10.5 13z',

  errorCircle:
    'M12 3c4.97 0 9 4.03 9 9s-4.03 9-9 9-9-4.03-9-9 4.03-9 9-9zm0 2c-3.866 0-7 3.134-7 7s3.134 7 7 7 7-3.134 7-7-3.134-7-7-7zm0 10c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1zm0-8.3c.552 0 1 .356 1 1.028V12.6c0 .673-.448 1.101-1 1.101s-1-.428-1-1.1V7.727c0-.672.448-1.028 1-1.028z',

  passwordLockIcon:
    'M12 3c2.761 0 5 2.239 5 5v.076c.975.096 1.631.313 2.121.803.811.81.874 2.078.879 4.493v2.256c-.005 2.415-.068 3.682-.879 4.493C18.243 21 16.828 21 14 21h-4c-2.828 0-4.243 0-5.121-.879C4 19.243 4 17.828 4 15v-1.32c.001-2.616.034-3.956.879-4.801.49-.49 1.146-.707 2.121-.803V8c0-2.761 2.239-5 5-5zm2.596 7H9.404c-1.127.003-1.87.017-2.43.092-.525.07-.65.169-.675.195-.02.018-.13.114-.207.688-.081.606-.091 1.427-.092 2.718V15c0 1.47.004 2.373.092 3.025.07.526.169.65.195.676.018.02.114.13.688.207.652.088 1.554.092 3.025.092h4c1.47 0 2.373-.004 3.025-.092.574-.077.67-.187.681-.2l.002-.002c.013-.011.123-.107.2-.68.075-.56.09-1.303.092-2.43v-2.192c-.003-1.127-.017-1.87-.092-2.43-.077-.573-.187-.669-.2-.68l-.002-.002c-.011-.013-.107-.123-.68-.2-.56-.075-1.303-.09-2.43-.092zM12 12c.552 0 1 .343 1 2s-.448 2-1 2-1-.343-1-2 .448-2 1-2zm0-7c-1.657 0-3 1.343-3 3H14.68l.32.002C15 6.343 13.657 5 12 5z',

  statistics:
    'M4 4c.552 0 1 .343 1 2v10c0 .943 0 1.414.293 1.707C5.586 18 6.057 18 7 18h.003C7 17.868 7 17.707 7 17.5v-6c0-.465 0-.697.038-.89.158-.794.778-1.414 1.572-1.572C8.803 9 9.035 9 9.5 9s.697 0 .89.038c.794.158 1.414.778 1.572 1.572.038.193.038.425.038.89v6c0 .207 0 .368-.003.5h2.006C14 17.868 14 17.707 14 17.5v-9c0-.465 0-.697.038-.89.158-.794.778-1.414 1.572-1.572C15.803 6 16.035 6 16.5 6s.697 0 .89.038c.794.158 1.414.778 1.572 1.572.038.193.038.425.038.89v9c0 .207 0 .368-.003.5H19c1.657 0 2 .448 2 1s-.343 1-2 1H9c-2.828 0-4.243 0-5.121-.879C3 18.243 3 16.828 3 14V6c0-1.657.448-2 1-2zm12.5 14c.246 0 .38 0 .479-.004h.017v-.017C17 17.88 17 17.745 17 17.5v-9c0-.246 0-.38-.004-.478v-.018h-.017C16.88 8 16.745 8 16.5 8c-.246 0-.38 0-.479.004h-.017v.018C16 8.12 16 8.254 16 8.5v9c0 .246 0 .38.004.479v.017h.017c.099.004.233.004.479.004zm-7 0c.246 0 .38 0 .478-.004h.018v-.017C10 17.88 10 17.745 10 17.5v-6c0-.246 0-.38-.004-.478v-.018h-.018C9.88 11 9.746 11 9.5 11c-.246 0-.38 0-.478.004h-.018v.018C9 11.12 9 11.254 9 11.5v6c0 .246 0 .38.004.479v.017h.018C9.12 18 9.254 18 9.5 18z',

  investStatistics:
    'M9.33651999,6.38840997 C9.06773999,6.87663997 8.76601998,7.64639998 8.31521998,8.80558998 L7.27121998,11.49056 C7.18745998,11.708 7.08285998,11.97953 6.91054997,12.2071 C6.64842997,12.5534 6.28073997,12.8049 5.86303997,12.9237 C5.58843997,13.0018 5.29746997,13.0009 5.06445997,13.0001 L4.99999995,13 C3.34313996,13 2.99999995,12.5523 2.99999995,12 C2.99999995,11.44769 3.34313996,11 4.99999995,11 C5.16178997,11 5.24583997,10.99969 5.30689997,10.99655 L5.31333997,10.9962 L5.31598997,10.99033 C5.34104997,10.93456 5.37179997,10.85633 5.43043997,10.70554 L6.47953997,8.00784998 C6.89449997,6.94069997 7.24337998,6.04345997 7.58447998,5.42386997 C7.89197998,4.86530996 8.44885998,4.04443996 9.45550999,4.08568996 C10.46215,4.12694996 10.95,4.99062996 11.21077,5.57247997 C11.50002,6.21788997 11.77432,7.14065998 12.1006,8.23816998 L14.0991,14.9607 C14.4881,16.2691 14.7528,17.1522 15.0032,17.7196 C15.0128,17.7415 15.0223,17.7623 15.0314,17.7823 C15.0409,17.7625 15.0507,17.7418 15.0607,17.7201 C15.3207,17.157 15.6002,16.2785 16.0113,14.9769 L16.7616,12.6005 C16.82,12.4138 16.8926,12.1817 17.0138,11.97793 C17.2914,11.51095 17.747,11.17702 18.2759,11.0529 C18.5067,10.99873 18.7499,10.99938 18.9455,10.9999 L19,11 C20.6569,11 21,11.44769 21,12 C21,12.5523 20.6569,13 19,13 C18.9893,13 18.9789,13 18.9689,13 C18.853,13 18.7889,13.0004 18.7412,13.0024 L18.7349,13.0027 L18.7327,13.0086 C18.715,13.0574 18.6934,13.1251 18.6525,13.2547 L17.8951,15.6529 C17.5133,16.8623 17.1966,17.8651 16.8765,18.5584 C16.7129,18.9128 16.5114,19.2719 16.2391,19.5511 C15.9421,19.8557 15.5305,20.0922 15.0119,20.0878604 C14.4934,20.0834 14.0858,19.84 13.794,19.5304 C13.5265,19.2466 13.331,18.8842 13.1735,18.5271 C12.8651,17.8285 12.5655,16.8205 12.2041,15.6048 L10.20576,8.88306998 C9.85132999,7.69086998 9.61360999,6.89900997 9.38567999,6.39042997 C9.37794999,6.37319997 9.37041999,6.35670997 9.36308999,6.34091997 C9.35447999,6.35604997 9.34562999,6.37186997 9.33651999,6.38840997 Z',

  cross:
    'M17.739 6.261c.396.396.471.964-.718 2.152L13.435 12l3.586 3.587c1.19 1.188 1.114 1.756.718 2.152-.396.396-.964.471-2.152-.718L12 13.435 8.413 17.02c-1.188 1.19-1.756 1.114-2.152.718-.396-.396-.471-.964.717-2.152L10.565 12 6.978 8.413C5.79 7.225 5.865 6.657 6.261 6.261c.396-.396.964-.471 2.152.717L12 10.565l3.587-3.587c1.188-1.188 1.756-1.113 2.152-.717z',

  delete:
    'M19 7v8c0 2.828 0 4.243-.879 5.121C17.243 21 15.828 21 13 21h-2c-2.828 0-4.243 0-5.121-.879-.811-.81-.874-2.078-.879-4.493V7h14zm-2 2H7v6.596c.003 1.127.017 1.87.092 2.43.077.573.187.669.2.68.032.033.157.131.683.202.652.088 1.554.092 3.025.092h2c1.47 0 2.373-.004 3.025-.092.574-.077.67-.187.681-.2.033-.032.131-.157.202-.683.088-.652.092-1.554.092-3.025V9zm-3.707-6c.718 0 1.406.285 1.914.793.133.132.313.207.5.207H19c.265 0 .52.105.707.293.39.39.39 1.024 0 1.414C19.52 5.895 19.265 6 19 6h-3.293c-.718 0-1.406-.285-1.914-.793-.133-.133-.313-.207-.5-.207h-2.586c-.187 0-.367.074-.5.207C9.7 5.715 9.011 6 8.293 6H5c-.265 0-.52-.105-.707-.293-.39-.39-.39-1.024 0-1.414C4.48 4.105 4.735 4 5 4h3.293c.187 0 .367-.075.5-.207C9.3 3.285 9.989 3 10.707 3z',

  home:
    'M15 21c2.828 0 4.243 0 5.121-.889.879-.888.879-2.318.879-5.179v-2.965c0-1.521 0-2.282-.329-2.932-.329-.65-.939-1.096-2.158-1.987l-3-2.19C13.818 3.618 12.97 3 12 3c-.97 0-1.818.62-3.513 1.857l-3 2.191c-1.22.891-1.83 1.336-2.158 1.987C3 9.685 3 10.446 3 11.967v2.965c0 2.86 0 4.29.879 5.18C4.757 21 6.172 21 9 21h6zm4-9.033v2.965c0 1.487-.004 2.402-.092 3.066-.078.586-.19.69-.207.706l-.002.001v.001c-.013.015-.108.124-.677.201-.65.089-1.55.093-3.022.093h-.013c.013-.263.013-.585.013-1 0-.932 0-1.398-.152-1.765-.203-.49-.593-.88-1.083-1.083C13.398 15 12.932 15 12 15c-.932 0-1.398 0-1.765.152-.49.203-.88.593-1.083 1.083C9 16.602 9 17.068 9 18c0 .415 0 .737.013 1H9c-1.471 0-2.371-.004-3.022-.093-.569-.077-.664-.186-.676-.2l-.001-.002-.002-.001c-.017-.016-.129-.12-.207-.706-.088-.664-.092-1.58-.092-3.066v-2.965c0-.795.002-1.262.033-1.615.028-.31.07-.392.08-.414.061-.12.17-.264 1.554-1.275l3-2.19c.885-.647 1.414-1.03 1.836-1.27.364-.206.477-.203.495-.203h.004c.018 0 .13-.003.495.203.422.24.951.623 1.836 1.27l3 2.19c1.384 1.011 1.492 1.153 1.553 1.274.011.022.053.105.08.415.032.353.034.82.034 1.615zM12 19c.493 0 .763-.001.958-.014l.026-.002.002-.026c.013-.195.014-.465.014-.958 0-.493-.001-.763-.014-.958l-.002-.026-.026-.002C12.763 17.001 12.493 17 12 17c-.493 0-.763.001-.958.014l-.026.002-.002.026c-.013.195-.014.465-.014.958 0 .493.001.763.014.958l.002.026.026.002c.195.013.465.014.958.014z',

  checkmarkCircle:
    'M12 3c4.97 0 9 4.03 9 9s-4.03 9-9 9-9-4.03-9-9 4.03-9 9-9zm0 2c-3.866 0-7 3.134-7 7s3.134 7 7 7 7-3.134 7-7-3.134-7-7-7zm0 10c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1zm0-8.3c.552 0 1 .356 1 1.028V12.6c0 .673-.448 1.101-1 1.101s-1-.428-1-1.1V7.727c0-.672.448-1.028 1-1.028z',

  exit:
    'M15 17c-.027 1.389-.15 2.213-.62 2.826-.16.208-.346.395-.554.554-.77.59-2.323.619-4.496.62H9c-2.346 0-4.018 0-4.826-.62a3.027 3.027 0 0 1-.554-.554C3 19.018 3 17.846 3 15.5v-7c0-2.346 0-3.518.62-4.326.16-.208.346-.394.554-.554.73-.561 2.17-.614 4.174-.62h1.304c2.004.006 3.443.059 4.174.62.208.16.394.346.554.554.47.613.593 1.436.62 2.826 0 1.657-.448 2-1 2s-1-.343-1-2a10.844 10.844 0 0 0-.065-1.016 2.427 2.427 0 0 0-.093-.488c-.024-.073-.043-.097-.049-.105a.972.972 0 0 0-.184-.184.343.343 0 0 0-.105-.05 2.529 2.529 0 0 0-.488-.092c-.471-.053-1.455-.063-2.494-.065H8.478c-1.04.002-2.023.012-2.494.065a2.427 2.427 0 0 0-.488.093.357.357 0 0 0-.105.049.972.972 0 0 0-.184.184c-.006.008-.024.032-.049.105a2.427 2.427 0 0 0-.093.488C5.003 6.534 5 7.281 5 8.5v7c0 1.22.003 1.966.065 2.516.029.255.064.403.093.488.024.073.043.097.049.105.053.07.115.131.184.184a.373.373 0 0 0 .105.05c.085.028.233.063.488.092.471.053 1.455.063 2.494.065h1.044c1.04-.002 2.023-.012 2.494-.065.255-.029.403-.064.488-.093.073-.024.097-.043.105-.049a.972.972 0 0 0 .184-.184.318.318 0 0 0 .05-.105c.028-.085.063-.233.092-.488.031-.277.057-.604.065-1.016 0-1.657.448-2 1-2s1 .343 1 2zm5.798-5.603c.27.357.27.85 0 1.206l-2.632 3.48a1 1 0 0 1-1.505.105l-.089-.089a1 1 0 0 1-.107-1.288L17.76 13H8.974c-1.657 0-2-.448-2-1s.343-1 2-1h8.786l-1.295-1.81a1 1 0 0 1 .107-1.289l.089-.089a1 1 0 0 1 1.505.104z',

  upload:
    'M17 9c1.389.027 2.213.15 2.826.62.208.16.395.346.554.554.59.77.619 2.323.62 4.496V15c0 2.346 0 4.018-.62 4.826-.16.208-.346.394-.554.554-.808.62-1.98.62-4.326.62h-7c-2.346 0-3.518 0-4.326-.62-.208-.16-.394-.346-.554-.554-.561-.73-.614-2.17-.62-4.174v-1.304c.006-2.004.059-3.443.62-4.174.16-.208.346-.394.554-.554C4.787 9.15 5.61 9.027 7 9c1.657 0 2 .448 2 1s-.343 1-2 1c-.412.008-.739.034-1.016.065-.255.029-.403.064-.488.093-.073.024-.097.043-.105.049-.07.053-.131.115-.184.184-.007.008-.024.032-.05.105-.028.085-.063.233-.092.488-.053.471-.063 1.455-.065 2.494v1.044c.002 1.04.012 2.023.065 2.494.029.255.064.403.093.488.025.073.043.097.049.105.053.07.115.131.184.184.008.006.032.024.105.049.085.029.233.064.488.093.55.062 1.297.065 2.516.065h7c1.22 0 1.966-.003 2.516-.065.255-.029.403-.064.488-.093.073-.024.097-.043.105-.049.07-.053.131-.115.184-.184.006-.008.024-.032.05-.105.028-.085.063-.233.092-.488.053-.471.063-1.455.065-2.494v-1.044c-.002-1.04-.012-2.023-.065-2.494-.029-.255-.064-.403-.093-.488-.024-.073-.043-.097-.049-.105-.053-.07-.115-.131-.184-.184-.008-.007-.032-.025-.105-.05-.085-.028-.233-.063-.488-.092-.277-.031-.604-.057-1.016-.065-1.657 0-2-.448-2-1s.343-1 2-1zm-5.603-5.798c.357-.27.85-.27 1.206 0l3.48 2.632c.485.366.534 1.076.105 1.505l-.089.089c-.346.346-.89.39-1.288.107L13 6.24v8.786c0 1.657-.448 2-1 2s-1-.343-1-2V6.24L9.19 7.535c-.398.284-.943.239-1.289-.107l-.089-.089c-.43-.43-.38-1.139.104-1.505z',

  calendar:
    'M15 4.8752 C 15.1377 4.1392 15.4638 3.9611 15.8443 3.9611 C 16.2271 3.9611 16.555 4.1414 16.6911 4.8891 C 18.1517 4.9289 19.0162 5.0829 19.6115 5.6783 C 20.4147 6.4815 20.4147 7.7743 20.4147 10.3597 L 20.4147 14.9302 C 20.4147 17.5156 20.4147 18.8083 19.6115 19.6115 C 18.8083 20.4147 17.5156 20.4147 14.9302 20.4147 L 9.4456 20.4147 C 6.8602 20.4147 5.5675 20.4147 4.7643 19.6115 C 3.9611 18.8083 3.9611 17.5156 3.9611 14.9302 L 3.9611 10.3597 C 3.9611 7.7743 3.9611 6.4815 4.7643 5.6783 C 5.3597 5.0829 6.2241 4.9289 7.6847 4.8891 C 7.8208 4.1414 8.1487 3.9611 8.5315 3.9611 C 8.912 3.9611 9.2381 4.1392 9.3758 4.8752 L 15 4.8752 Z M 7.6174 6.72 C 7.6204 8.2202 8.0285 8.5315 8.5315 8.5315 C 9.0364 8.5315 9.4456 8.2179 9.4456 6.7033 L 14.9302 6.7033 C 14.9302 8.2179 15.3394 8.5315 15.8443 8.5315 C 16.3473 8.5315 16.7553 8.2202 16.7583 6.72 C 17.1306 6.7319 17.4348 6.7524 17.6956 6.7874 C 18.22 6.8579 18.3075 6.9582 18.318 6.9701 L 18.3188 6.9711 L 18.3198 6.9719 C 18.3317 6.9823 18.432 7.0699 18.5024 7.5943 C 18.5626 8.042 18.5799 8.6179 18.5847 9.4456 L 5.7911 9.4456 C 5.7959 8.6179 5.8132 8.042 5.8733 7.5943 C 5.9438 7.0699 6.0441 6.9823 6.056 6.9719 L 6.057 6.9711 L 6.0578 6.9701 C 6.0682 6.9582 6.1558 6.8579 6.6802 6.7874 C 6.941 6.7524 7.2452 6.7319 7.6174 6.72 Z M 5.7892 11.2738 L 5.7892 14.9302 C 5.7892 16.2746 5.7931 17.0989 5.8733 17.6956 C 5.9438 18.22 6.0441 18.3075 6.056 18.318 L 6.057 18.3188 L 6.0578 18.3198 C 6.0682 18.3317 6.1558 18.432 6.6802 18.5024 C 7.2768 18.5827 8.1012 18.5865 9.4456 18.5865 L 14.9302 18.5865 C 16.2746 18.5865 17.0989 18.5827 17.6956 18.5024 C 18.22 18.432 18.3075 18.3317 18.318 18.3198 L 18.3188 18.3188 L 18.3198 18.318 C 18.3317 18.3075 18.432 18.22 18.5024 17.6956 C 18.5827 17.0989 18.5865 16.2746 18.5865 14.9302 L 18.5865 11.2738 L 5.7892 11.2738 Z',

  threeDots:
    'M12 16c1.657 0 2 .448 2 1s-.343 1-2 1-2-.448-2-1 .343-1 2-1zm0-5c1.657 0 2 .448 2 1s-.343 1-2 1-2-.448-2-1 .343-1 2-1zm0-5c1.657 0 2 .448 2 1s-.343 1-2 1-2-.448-2-1 .343-1 2-1z',

  edit:
    'M19.983 8.517C20 9.087 20 9.743 20 10.5v5c0 2.828 0 4.243-.879 5.121-.878.879-2.293.879-5.121.879H9c-2.828 0-4.243 0-5.121-.879C3 19.743 3 18.328 3 15.5v-5c0-2.828 0-4.243.879-5.121C4.757 4.5 6.172 4.5 9 4.5h5c.757 0 1.412 0 1.983.017l.532-.532c.31-.31.732-.485 1.171-.485A3.314 3.314 0 0 1 21 6.814c0 .44-.175.86-.485 1.171l-.532.532zm-12.679 5.11c.305-.736.883-1.314 2.04-2.47L14 6.5H9c-1.47 0-2.373.004-3.025.092-.574.077-.67.187-.681.2h-.001l-.001.002c-.013.011-.123.107-.2.68C5.004 8.128 5 9.03 5 10.5v5c0 1.47.004 2.373.092 3.025.077.574.187.67.2.681v.001l.002.001c.011.013.107.123.68.2.653.088 1.555.092 3.026.092h5c1.47 0 2.373-.004 3.025-.092.574-.077.67-.187.681-.2h.001l.001-.002c.013-.011.123-.107.2-.68.088-.653.092-1.555.092-3.026v-5l-4.657 4.657c-1.156 1.156-1.734 1.734-2.47 2.038-.505.21-1.05.275-1.873.296-.373.009-.804.009-1.314.009H7v-.686c0-.51 0-.94.01-1.314.02-.823.085-1.368.294-1.874zm2.805 1.72c-.192.08-.411.122-1.097.14.02-.684.06-.904.14-1.095.117-.283.334-.55 1.605-1.82l7.065-7.065a1.314 1.314 0 0 1 1.171 1.171l-7.064 7.065c-1.272 1.271-1.538 1.488-1.82 1.605z',

  search:
    'M16.512 16.798a8 8 0 1 1 .286-.286c.851.07 1.654.44 2.263 1.049l1.666 1.666a.931.931 0 0 1 .273.659v.053l-.001.109a1 1 0 0 1-1.06.952h-.053a.931.931 0 0 1-.659-.273l-1.666-1.666a3.621 3.621 0 0 1-1.049-2.263zM17 11a6 6 0 1 1-12 0 6 6 0 0 1 12 0z',

  cart:
    'M17,15 C18.6569,15 20,16.3431 20,18 C20,19.6569 18.6569,21 17,21 C15.3431,21 14,19.6569 14,18 C14,16.3431 15.3431,15 17,15 Z M4.99999995,2.99999995 C6.10456997,2.99999995 6.99999995,3.89542996 6.99999995,4.99999995 C6.99999995,5.55227997 7.44771998,5.99999995 7.99999995,5.99999995 L18.5074,5.99981997 C18.7761,5.99892997 19.1018,5.99783997 19.3868,6.08212997 C20.1504,6.30799997 20.7073,6.96536997 20.8046,7.75574998 C20.8409,8.05072998 20.7862,8.37184998 20.7412,8.63675998 L20.728,8.71458998 L20.7067,8.84250998 C20.5533,9.76486999 20.4481,10.3969 20.2207,10.93792 C19.6021,12.4092 18.3183,13.4967 16.7653,13.8651 C16.2576556,13.9854556 15.6950185,13.9986704 14.9195749,13.9999104 L12,14 C11.16837,14 10.45529,14.5076 10.15367,15.2298 C11.23789,15.6819 12,16.752 12,18 C12,19.6569 10.65685,21 8.99999995,21 C7.34314998,21 5.99999995,19.6569 5.99999995,18 C5.99999995,16.6945 6.83385997,15.5838 7.99800998,15.1714 C7.96998998,13.8392 7.64645998,12.529 7.04984998,11.33576 L5.99999995,9.23606999 C5.34236997,7.92080998 4.99999995,6.47049997 4.99999995,4.99999995 C3.34313996,4.99999995 2.99999995,4.55227996 2.99999995,3.99999995 C2.99999995,3.44770996 3.34313996,2.99999995 4.99999995,2.99999995 Z M8.99999998,17 C8.44771998,17 7.99999998,17.4477 7.99999998,18 C7.99999998,18.5523 8.44771998,19 8.99999998,19 C9.55227999,19 9.99999998,18.5523 9.99999998,18 C9.99999998,17.4477 9.55227999,17 8.99999998,17 Z M17,17 C16.4477,17 16,17.4477 16,18 C16,18.5523 16.4477,19 17,19 C17.5523,19 18,18.5523 18,18 C18,17.4477 17.5523,17 17,17 Z M7.61818998,7.97592998 C7.67169998,8.09917998 7.72859998,8.22112998 7.78884998,8.34163998 L7.78884998,8.34163998 L8.83869998,10.44133 C9.20597999,11.17589 9.48858999,11.94673 9.68300999,12.739 C10.33676,12.2737 11.13642,12 12,12 L12,12 L14.4888,12 C15.6033,12 15.9904,11.99334 16.3038,11.91903 C17.2355,11.69805 18.0058,11.04552 18.377,10.16275 C18.5018,9.86589999 18.572,9.48510999 18.7552,8.38578998 C18.7862,8.20000998 18.8033,8.09556998 18.8123,8.01896998 L18.8123,8.01896998 L18.8139,8.00473998 L18.7996,8.00397998 C18.7688,8.00249598 18.733392,8.00156238 18.6899328,8.0009763 L7.99999998,7.99999998 C7.87064998,7.99999998 7.74321998,7.99180998 7.61818998,7.97592998 Z',

  rocket:
    'm12 3 .232.147c2.964 1.874 4.445 2.812 5.194 4.253.518.996.621 2.11.557 3.819 1.4.532 2.184.943 2.63 1.711.566.973.422 2.224.133 4.728L20.36 21l-3.103-1.346c-.148.494-.367.834-.716 1.063-.047.03-.096.06-.145.086-.882.48-2.054.036-4.396-.853-2.342.89-3.514 1.334-4.396.853a2.138 2.138 0 0 1-.145-.086c-.35-.229-.568-.57-.716-1.063L3.64 21l-.386-3.342c-.289-2.504-.433-3.756.132-4.728.447-.768 1.231-1.179 2.631-1.711-.064-1.709.039-2.823.557-3.82.749-1.44 2.23-2.378 5.194-4.252L12 3zm0 2.398c-1.015.647-1.755 1.135-2.328 1.58-.7.545-1.018.927-1.213 1.303-.196.377-.322.85-.35 1.707-.031.902.047 2.053.168 3.778l.19 2.688c.088 1.256.144 1.984.253 2.48l.006.026.027-.006c.519-.121 1.235-.388 2.466-.855l.781-.296.78.296c1.232.467 1.948.734 2.467.855l.027.006.006-.026c.11-.496.165-1.224.254-2.48l.189-2.688c.12-1.725.2-2.876.169-3.778-.029-.858-.155-1.33-.35-1.707-.196-.376-.514-.758-1.214-1.303-.573-.445-1.313-.933-2.328-1.58zm5.851 8.049-.22 3.14-.065.893 1.15.5.068-.588c.15-1.305.238-2.091.239-2.677 0-.415-.045-.566-.07-.618l-.012-.024c-.012-.023-.076-.14-.499-.357a7.757 7.757 0 0 0-.59-.27zm-11.702 0a7.763 7.763 0 0 0-.591.269c-.338.174-.447.283-.482.33l-.016.025-.014.026c-.024.052-.07.203-.069.618.001.586.088 1.372.239 2.677l.068.587 1.15-.499-.065-.893zM12 9a1 1 0 1 1 0 2 1 1 0 0 1 0-2z',

  list:
    'M19 19c1.657 0 2 .448 2 1s-.343 1-2 1H7c-1.657 0-2-.448-2-1s.343-1 2-1h12zM10.414 8.586c.557.556.585 1.435.586 3.138V12c0 1.886 0 2.828-.586 3.414C9.828 16 8.886 16 7 16c-1.886 0-2.828 0-3.414-.586-.527-.527-.58-1.343-.585-2.876v-1.076c.005-1.533.058-2.349.585-2.876.527-.527 1.343-.58 2.876-.585h1.076c1.533.005 2.349.058 2.876.585zM7.464 10h-.928c-.718.002-1.162.014-1.479.056-.05.38-.057.944-.057 1.943v.24c.001.852.01 1.354.057 1.703.38.05.944.057 1.943.057 1 0 1.562-.006 1.943-.057.05-.38.057-.944.057-1.943v-.24c-.001-.852-.01-1.354-.057-1.703-.317-.042-.761-.054-1.479-.056zM19 11c1.657 0 2 .448 2 1s-.343 1-2 1h-4c-1.657 0-2-.448-2-1s.343-1 2-1zm0-8c1.657 0 2 .448 2 1s-.343 1-2 1H7c-1.657 0-2-.448-2-1s.343-1 2-1z',

  like:
    'm16.144 5.933.002 3.159 1.467.293c1.717.343 2.576.514 3.042 1.144.467.63.38 1.5.205 3.242l-.268 2.68c-.133 1.323-.199 1.985-.479 2.513a3.046 3.046 0 0 1-1.201 1.23c-.521.293-1.182.375-2.503.54-1.566.196-2.35.294-3.124.26a9.157 9.157 0 0 1-2.246-.385c-.703-.213-1.374-.541-2.644-1.176a2 2 0 0 1-.63.415C7.398 20 6.932 20 6 20c-.932 0-1.398 0-1.765-.152a2 2 0 0 1-1.083-1.083C3 18.398 3 17.932 3 17v-5c0-.932 0-1.398.152-1.765a2 2 0 0 1 1.083-1.083C4.602 9 5.068 9 6 9c.932 0 1.398 0 1.765.152a2 2 0 0 1 .892.728l.544-.407c.921-.69 1.382-1.036 1.682-1.511.3-.476.413-1.04.639-2.168l.403-2.01c.104-.447.497-.769.956-.783L12.953 3c.134 0 .2 0 .257.002a3.047 3.047 0 0 1 2.934 2.931zM9 12.123l1.4-1.05.174-.13c.746-.556 1.497-1.116 2-1.914.504-.798.686-1.717.867-2.63l.042-.212.201-1.008c.262.177.439.468.46.801l.003 4.752 3.074.614c.911.182 1.405.285 1.743.399l.034.011v.035c.01.355-.035.857-.128 1.78l-.268 2.68c-.15 1.505-.205 1.68-.256 1.776a1.047 1.047 0 0 1-.413.423c-.095.054-.27.112-1.772.3-1.631.203-2.22.27-2.786.245a7.149 7.149 0 0 1-1.756-.3c-.542-.165-1.075-.424-2.546-1.158L9 17.5v-5.377zM7 12c0-.493-.001-.763-.014-.958l-.002-.026-.026-.002A16.276 16.276 0 0 0 6 11c-.493 0-.763.001-.958.014l-.026.002-.002.026C5.001 11.237 5 11.507 5 12v5c0 .493.001.763.014.958l.002.026.026.002c.195.013.465.014.958.014.493 0 .763-.001.958-.014l.026-.002.002-.026C6.999 17.763 7 17.493 7 17v-5z',

  clock:
    'M12 3c4.97 0 9 4.03 9 9s-4.03 9-9 9-9-4.03-9-9 4.03-9 9-9zm0 2c-3.866 0-7 3.134-7 7s3.134 7 7 7 7-3.134 7-7-3.134-7-7-7zm0 2c.552 0 1 .343 1 2v2.343c0 .409 0 .613.076.797.076.184.22.328.51.617l.707.707c1.171 1.172 1.098 1.731.707 2.122-.39.39-.95.464-2.121-.707l-.707-.707c-.578-.579-.868-.867-1.02-1.235-.124-.3-.147-.63-.151-1.186L11 9c0-1.657.448-2 1-2z',

  book:
    'M11.687 4.704C14.423 3.58 17.355 3 20.318 3h.102c.32 0 .58.26.58.58v14.686c0 .405-.329.734-.734.734h-.951c-2.155 0-4.298.295-6.368.877-.049.303-.143.51-.322.654-.376.3-.938.174-2.064-.08L8.556 20l-3.91-.704c-.787-.141-1.18-.212-1.413-.49C3 18.525 3 18.126 3 17.327V5.392c0-1.109 0-1.663.359-1.963.358-.3.904-.202 1.995-.005L8.556 4l3.13.704zM13 6.336c1.925-.727 3.947-1.163 6-1.294v11.96c-2.026.025-4.04.29-6 .79V6.336zM11 6.6v11.9l-2.048-.46L5 17.327V5.392l3.159.569L11 6.6z',

  link:
    'M10.125,2 C10.74375,2 11.25,2.50625 11.25,3.125 C11.25,3.74375 10.74375,4.25 10.125,4.25 L10.125,4.25 L3.9375,4.25 L3.79244241,4.25622449 C2.93154432,4.33040166 2.25,5.05822368 2.25,5.9375 L2.25,5.9375 L2.25,16.0625 C2.25,16.990625 3.009375,17.75 3.9375,17.75 L3.9375,17.75 L14.0625,17.75 L14.2075576,17.7437755 C15.0684557,17.6695983 15.75,16.9417763 15.75,16.0625 L15.75,16.0625 L15.75,9.875 C15.75,9.25625 16.25625,8.75 16.875,8.75 L16.875,8.75 L16.9971333,8.75663333 C17.559,8.818 18,9.2975 18,9.875 L18,9.875 L18,16.0625 C18,18.228125 16.228125,20 14.0625,20 L14.0625,20 L3.9375,20 C1.771875,20 0,18.228125 0,16.0625 L0,16.0625 L0,5.9375 C0,3.771875 1.771875,2 3.9375,2 L3.9375,2 Z M18.847654,0 C18.9067487,0 18.9953907,0.0295384615 19.0544853,0.0295384615 L19.0544853,0.0295384615 L19.11358,0.0590769231 C19.1726747,0.0886153846 19.202222,0.0886153846 19.2613167,0.118153846 C19.290864,0.118153846 19.3204113,0.147692308 19.3499587,0.147692308 C19.379506,0.147692308 19.4386007,0.177230769 19.468148,0.206769231 C19.5863373,0.295384615 19.7045267,0.413538462 19.7931687,0.531692308 C19.7931687,0.590769231 19.822716,0.620307692 19.8522633,0.679384615 C19.8522633,0.679384615 19.8818107,0.708923077 19.8818107,0.738461538 C19.911358,0.768 19.9409053,0.827076923 19.9409053,0.886153846 C19.9704527,0.915692308 19.9704527,0.915692308 19.9704527,0.945230769 C20,1.03384615 20,1.09292308 20,1.18153846 L20,1.18153846 L20,6.61661538 C20,7.26646154 19.468148,7.79815385 18.8181067,7.79815385 L18.8181067,7.79815385 L18.69771,7.79202404 C18.1036614,7.73123077 17.6362134,7.22584615 17.6362134,6.61661538 L17.6362134,6.61661538 L17.6362134,4.04676923 L9.9834541,11.6676923 C9.54024411,12.1107692 8.80156078,12.1107692 8.35835079,11.6676923 C7.88559346,11.1950769 7.88559346,10.4566154 8.32880345,9.984 L8.32880345,9.984 L15.9520154,2.36307692 L13.3813974,2.36307692 C12.7313561,2.36307692 12.1995041,1.83138462 12.1995041,1.18153846 C12.1995041,0.531692308 12.7313561,0 13.3813974,0 L13.3813974,0 Z',

  phone:
    'M7.3 21c-.8 0-1.5-.35-2-.9-.05-.05-.1-.05-.1-.1l-1.5-1.502c-.45-.45-.7-1-.7-1.6 0-.601.25-1.152.65-1.552l1.85-1.801.1-.1c.5-.45 1.25-.65 1.9-.5.7.15 1.2.65 1.6 1.1l.05.05c.25.25.45.5.7.75l.15.15.15.15c2.4-1 4.15-2.751 5-4.953-.45-.35-.85-.75-1.25-1.15-.15-.15-.3-.35-.5-.5-.4-.4-.65-.951-.65-1.552 0-.6.25-1.15.65-1.55l1.85-1.802c.85-.85 2.25-.85 3.15 0l1.5 1.501.15.15c.6.5.95 1.251.95 2.001 0 3.603-1.4 7.005-4.05 9.657C14.35 19.55 10.9 21 7.3 21zm-.25-7.105c-.1 0-.2 0-.3.05-.6.15-.95.7-1.35 1.1l-1.05 1.052c-.2.2-.35.5-.35.8 0 .3.15.6.35.85l1.5 1.502c.4.4.85.75 1.45.75 3.35 0 6.55-1.35 8.95-3.802C18.7 13.745 20 10.593 20 7.24c0-1.15-1.55-2.201-2.3-2.952-.45-.45-1.25-.45-1.7 0L14.15 6.09c-.25.25-.35.55-.35.85 0 .3.1.6.35.85l.5.501c.4.45.85.9 1.3 1.201.05.05.2.1.25.3.05.2 0 .35 0 .4a9.627 9.627 0 0 1-3.8 4.854c-.35.25-.75.45-1.1.65-.35.2-.85.5-1.25.45-.4-.05-.6-.4-.85-.7-.3-.35-.6-.65-.95-1-.35-.2-.7-.55-1.2-.55z',

  refresh:
    'M9.57086289,0.0914705373 L9.30663716,0.134307544 L9.03658851,0.186633493 C5.65659573,0.896825561 3.10932857,3.51971119 2.60655881,6.79693573 L2.57499992,7.02800229 L1.8216358,6.27901093 C1.41189748,5.87584461 0.7437591,5.86732434 0.32485028,6.25976594 C-0.10048114,6.65824745 -0.109286635,7.31710933 0.305177317,7.72672278 L2.71931548,10.1085378 C2.92641765,10.3131085 3.20923741,10.4233793 3.50301253,10.4163557 C3.76972064,10.4099368 4.02263628,10.3078397 4.21571498,10.1267591 L6.69305377,7.80573176 C7.11846176,7.40777794 7.12740084,6.74853253 6.71288923,6.33917188 L6.61053891,6.25060301 L6.50202269,6.17866149 C6.09258082,5.94119101 5.56508493,5.99279392 5.21606109,6.32051096 L4.56399992,6.92800229 L4.53195675,7.12683091 C4.9184393,4.46458949 7.0654089,2.3719292 9.86129502,1.96229967 C12.171274,1.62349764 14.4837086,2.52666214 15.895392,4.31801858 C16.1123277,4.59236649 16.4641859,4.72970611 16.8152363,4.67798557 C16.9730323,4.65492351 17.1243048,4.59334223 17.253021,4.49968288 C17.5403592,4.28962192 17.6858597,3.94431153 17.631697,3.59866883 C17.6067775,3.44214046 17.5414309,3.29378013 17.4422452,3.16775572 C15.5987877,0.828149626 12.5829953,-0.350080574 9.57086289,0.0914705373 Z M17.1437214,8.08983215 L16.9991868,8.08362528 C16.7329478,8.08975434 16.4791898,8.19265186 16.2861926,8.37443221 L13.8098351,10.7042267 C13.3851979,11.1043883 13.3763852,11.7648029 13.7903678,12.1748169 L13.8928131,12.2636795 L14.0014251,12.3358791 C14.4111824,12.5742012 14.9385988,12.5224057 15.2870764,12.1932845 L15.9179999,11.5980023 L15.8618313,11.8686518 C15.2890916,14.2901855 13.2432297,16.1482083 10.6338059,16.5325675 C8.32509749,16.8721897 6.01437292,15.9657038 4.60412597,14.1679977 C4.38758704,13.8926494 4.03579177,13.7546435 3.68459727,13.8063537 C3.52660778,13.8292391 3.3748105,13.8912646 3.24601486,13.9856966 C2.95910135,14.1958205 2.81380063,14.5426404 2.86851214,14.8891844 C2.8933402,15.0451926 2.95850723,15.1939089 3.05703285,15.3200507 C4.90000875,17.6689493 7.91415573,18.8515718 10.9249435,18.408092 L11.1883176,18.3652144 L11.4561164,18.3130933 C14.8267172,17.6023317 17.3690936,14.981259 17.8802687,11.7023763 L17.9119999,11.4690023 L18.6788417,12.2352672 C19.0888569,12.6401636 19.7570886,12.6486956 20.1754379,12.2544881 C20.6003691,11.8549284 20.6092388,11.1947485 20.1951933,10.7837703 L17.7829603,8.39274863 C17.6106467,8.22227627 17.3853774,8.11626433 17.1437214,8.08983215 Z',
};

export default icons;
