const icons = {
  account:
    'M6.618 16.465c3.559-.62 7.206-.62 10.765 0l.428.076c1.83.361 3.154 1.884 3.19 3.667v.097c0 .576-.695.901-1.173.549-.389-.287-.626-.709-.862-1.128-.082-.146-.163-.29-.25-.43-.281-.445-.748-.775-1.31-.886l-.382-.068c-3.322-.578-6.726-.578-10.047 0l-.382.068c-.562.111-1.029.441-1.31.886-.087.14-.169.284-.25.43-.236.42-.474.841-.862 1.128-.478.352-1.173.027-1.173-.55v-.096c.035-1.783 1.36-3.306 3.19-3.667l.428-.076zM12 3c3.314 0 6 2.686 6 6s-2.686 6-6 6-6-2.686-6-6 2.686-6 6-6zm0 2C9.79 5 8 6.79 8 9s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z',

  folder:
    'M19 15v-4c0-1.47-.004-2.373-.092-3.025-.077-.574-.187-.67-.2-.681v-.001l-.002-.001c-.011-.013-.107-.123-.68-.2C17.372 7.004 16.47 7 15 7h-1.056c-.642.001-1.292.002-1.93-.168-.64-.17-1.203-.492-1.76-.812l-.13-.074-1.023-.585c-.45-.257-.5-.28-.537-.294-.068-.026-.139-.045-.21-.056C8.312 5.005 8.257 5 7.74 5c-.844 0-1.36.001-1.748.032-.18.014-.29.032-.357.047l-.061.017-.015.006c-.2.098-.36.259-.458.458l-.006.015c-.003.01-.01.03-.07.061-.015.067-.033.177-.047.357C5.002 6.38 5 6.897 5 7.74V15c0 1.47.004 2.373.092 3.025.077.574.187.67.2.681v.001l.002.001c.011.013.107.123.68.2C6.628 18.996 7.53 19 9 19h6c1.47 0 2.373-.004 3.025-.092.574-.077.67-.187.681-.2h.001l.001-.002c.013-.011.123-.107.2-.68.088-.653.092-1.555.092-3.026zM3.306 4.68C3 5.303 3 6.115 3 7.74V15c0 2.828 0 4.243.879 5.121C4.757 21 6.172 21 9 21h6c2.828 0 4.243 0 5.121-.879C21 19.243 21 17.828 21 15v-4c0-2.828 0-4.243-.879-5.121C19.243 5 17.828 5 15 5h-.907c-.792 0-1.188 0-1.566-.1-.379-.101-.723-.298-1.41-.69l-1.024-.585c-.399-.228-.598-.342-.809-.424-.203-.078-.415-.134-.63-.167C8.43 3 8.2 3 7.74 3c-1.625 0-2.437 0-3.062.306-.597.293-1.08.776-1.373 1.373z',

  arrowHeadDown:
    'M17.645 10.592c.433-.309.477-.908.093-1.27l-.08-.075c-.308-.292-.795-.33-1.15-.09l-4.536 3.71-4.48-3.71c-.355-.24-.842-.201-1.15.09l-.08.075c-.384.363-.34.961.093 1.27l5.078 4.237c.319.228.759.228 1.078 0l5.134-4.237z',

  arrowHeadRight:
    'M10.592 17.645c-.309.433-.908.477-1.27.093l-.075-.08c-.292-.308-.33-.795-.09-1.15l3.71-4.536-3.71-4.48c-.24-.355-.201-.842.09-1.15l.075-.08c.363-.384.961-.34 1.27.093l4.237 5.078c.228.319.228.759 0 1.078l-4.237 5.134z',

  arrowHeadLeft:
    'M13.408 17.645c.309.433.908.477 1.27.093l.075-.08c.291-.308.33-.795.09-1.15l-3.71-4.536 3.71-4.48c.24-.355.201-.842-.09-1.15l-.075-.08c-.363-.384-.961-.34-1.27.093L9.17 11.433c-.228.319-.228.759 0 1.078l4.237 5.134z',

  infoCircleIcon:
    'M8 2.6c2.982 0 5.4 2.418 5.4 5.4s-2.418 5.4-5.4 5.4S2.6 10.982 2.6 8 5.018 2.6 8 2.6zm0 1.2C5.68 3.8 3.8 5.68 3.8 8c0 2.32 1.88 4.2 4.2 4.2 2.32 0 4.2-1.88 4.2-4.2 0-2.32-1.88-4.2-4.2-4.2zm0 6c.331 0 .6.269.6.6 0 .331-.269.6-.6.6-.331 0-.6-.269-.6-.6 0-.331.269-.6.6-.6zm0-4.98c.331 0 .6.213.6.617V8.36c0 .403-.269.66-.6.66-.331 0-.6-.257-.6-.66V5.437c0-.404.269-.617.6-.617z',

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

  cross:
    'M17.739 6.261c.396.396.471.964-.718 2.152L13.435 12l3.586 3.587c1.19 1.188 1.114 1.756.718 2.152-.396.396-.964.471-2.152-.718L12 13.435 8.413 17.02c-1.188 1.19-1.756 1.114-2.152.718-.396-.396-.471-.964.717-2.152L10.565 12 6.978 8.413C5.79 7.225 5.865 6.657 6.261 6.261c.396-.396.964-.471 2.152.717L12 10.565l3.587-3.587c1.188-1.188 1.756-1.113 2.152-.717z',

  delete:
    'M12.667 4.667V10c0 1.886 0 2.828-.586 3.414-.586.586-1.529.586-3.414.586H7.333c-1.885 0-2.828 0-3.414-.586-.556-.556-.584-1.435-.586-3.138v-5.61h9.334zM11.333 6H4.667v4.498c.003.696.013 1.163.061 1.519.051.382.125.446.133.454.01.01.073.083.455.134.356.048.824.059 1.519.061h2.33c.695-.002 1.163-.013 1.519-.06.382-.052.446-.125.453-.134.026-.027.09-.115.135-.455.048-.356.058-.823.06-1.519L11.334 6zM8.862 2c.479 0 .938.19 1.276.529.088.088.208.138.333.138h2.196c.176 0 .346.07.471.195.26.26.26.682 0 .943-.125.125-.295.195-.471.195H10.47c-.478 0-.937-.19-1.276-.529-.088-.088-.208-.138-.333-.138H7.138c-.125 0-.245.05-.333.138C6.466 3.81 6.007 4 5.529 4H3.333c-.176 0-.346-.07-.471-.195-.26-.26-.26-.683 0-.943.125-.125.295-.195.471-.195H5.53c.125 0 .245-.05.333-.138C6.2 2.19 6.659 2 7.138 2z',
};

export default icons;
