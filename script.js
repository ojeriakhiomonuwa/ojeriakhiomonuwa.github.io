const body = document.body
const root = document.documentElement

const themeToggle = document.querySelector('#theme-toggle')
const btnHamburger = document.querySelector('.nav__hamburger')
const btnHamburgerIcon = btnHamburger.querySelector('i')
const navList = document.querySelector('.nav__list')

const storageKey = 'portfolio-theme'

const getStoredTheme = () => {
  try {
    return localStorage.getItem(storageKey)
  } catch (error) {
    console.warn('Theme preference could not be read.', error)
    return null
  }
}

const saveTheme = theme => {
  try {
    localStorage.setItem(storageKey, theme)
  } catch (error) {
    console.warn('Theme preference could not be saved.', error)
  }
}

const updateThemeToggleUi = isDarkMode => {
  const nextModeLabel = isDarkMode ? 'Light mode' : 'Dark mode'

  themeToggle.setAttribute(
    'aria-label',
    `Activate ${nextModeLabel.toLowerCase()}`
  )
  themeToggle.setAttribute('aria-pressed', String(isDarkMode))
  themeToggle.dataset.tooltip = nextModeLabel
}

const setTheme = theme => {
  const isDarkMode = theme === 'dark'

  body.classList.toggle('dark-mode', isDarkMode)
  root.classList.toggle('dark-mode', isDarkMode)
  updateThemeToggleUi(isDarkMode)
  saveTheme(theme)
}

const initialTheme = getStoredTheme() === 'dark' ? 'dark' : 'light'
setTheme(initialTheme)

themeToggle.addEventListener('click', () => {
  const nextTheme = body.classList.contains('dark-mode') ? 'light' : 'dark'
  setTheme(nextTheme)
})

const displayList = () => {
  const isMenuOpen = btnHamburgerIcon.classList.contains('fa-bars')

  btnHamburgerIcon.classList.toggle('fa-bars', !isMenuOpen)
  btnHamburgerIcon.classList.toggle('fa-times', isMenuOpen)
  navList.classList.toggle('display-nav-list', isMenuOpen)
}

btnHamburger.addEventListener('click', displayList)

const scrollUp = () => {
  const btnScrollTop = document.querySelector('.scroll-top')
  const shouldDisplay =
    body.scrollTop > 500 || document.documentElement.scrollTop > 500

  btnScrollTop.style.display = shouldDisplay ? 'grid' : 'none'
}

document.addEventListener('scroll', scrollUp)

const applyScrollReveal = () => {
  const revealElements = document.querySelectorAll(
    '.about__photo, .project, .skills__category, .tools-section, .experience-item, .contact, .footer'
  )

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          obs.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.15, rootMargin: '0px 0px -10px 0px' }
  )

  revealElements.forEach(element => {
    element.classList.add('reveal')
    observer.observe(element)
  })
}

applyScrollReveal()
