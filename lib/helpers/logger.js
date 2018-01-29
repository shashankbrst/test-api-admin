import chalk from 'chalk'

const debug = (...items) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(chalk.cyanBright(items))
  } else {
    console.debug(chalk.cyanBright(items))
  }
}
const error = (...items) => {
  console.error(chalk.redBright(items))
}
const info = (...items) => {
  console.info(chalk.blueBright(items))
}
const log = (...items) => {
  console.log(chalk.gray(items))
}
const warn = (...items) => {
  console.warn(chalk.yellowBright(items))
}

export default {
  debug,
  error,
  info,
  log,
  warn,
}
