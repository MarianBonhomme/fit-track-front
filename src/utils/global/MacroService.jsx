const macros = ['kcal', 'prot', 'fat', 'carb'];

const getColorByMacro = (macro) => {
  switch (macro) {
    case 'kcal':
      return 'green'
    case 'prot':
      return 'purple'
    case 'fat':
      return 'orange'
    case 'carb':
      return 'yellow'
    default:
      break;
  }
}

export { macros, getColorByMacro }