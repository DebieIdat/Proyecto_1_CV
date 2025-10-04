// Smooth scroll para los enlaces de navegación
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })

      // Cerrar el menú móvil si está abierto
      const navbarCollapse = document.querySelector(".navbar-collapse")
      if (navbarCollapse.classList.contains("show")) {
        const bsCollapse = new window.bootstrap.Collapse(navbarCollapse)
        bsCollapse.hide()
      }
    }
  })
})

// Cambiar el estilo de la navbar al hacer scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 50) {
    navbar.style.padding = "0.5rem 0"
    navbar.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.15)"
  } else {
    navbar.style.padding = "1rem 0"
    navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)"
  }
})

// Resaltar el enlace activo en la navegación
const sections = document.querySelectorAll("section[id]")
const navLinks = document.querySelectorAll(".nav-link")

window.addEventListener("scroll", () => {
  let current = ""
  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight
    if (window.pageYOffset >= sectionTop - 100) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
})

// Animación de las barras de progreso cuando entran en el viewport
const observerOptions = {
  threshold: 0.5,
  rootMargin: "0px 0px -100px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const progressBars = entry.target.querySelectorAll(".progress-bar")
      progressBars.forEach((bar) => {
        const width = bar.style.width
        bar.style.width = "0"
        setTimeout(() => {
          bar.style.width = width
        }, 100)
      })
      observer.unobserve(entry.target)
    }
  })
}, observerOptions)

const skillsSection = document.querySelector("#skills")
if (skillsSection) {
  observer.observe(skillsSection)
}

// Manejo del formulario de contacto
const contactForm = document.getElementById("contactForm")
const formMessage = document.getElementById("formMessage")

contactForm.addEventListener("submit", (e) => {
  e.preventDefault()

  // Obtener los valores del formulario
  const name = document.getElementById("name").value
  const email = document.getElementById("email").value
  const subject = document.getElementById("subject").value
  const message = document.getElementById("message").value

  // Simular envío del formulario (aquí deberías integrar con tu backend)
  formMessage.classList.remove("d-none", "alert-danger", "alert-success")
  formMessage.classList.add("alert-success")
  formMessage.textContent = "¡Mensaje enviado con éxito! Te contactaré pronto."

  // Limpiar el formulario
  contactForm.reset()

  // Ocultar el mensaje después de 5 segundos
  setTimeout(() => {
    formMessage.classList.add("d-none")
  }, 5000)

  // En producción, aquí enviarías los datos a tu servidor
  console.log("Formulario enviado:", { name, email, subject, message })
})

// Animación de entrada para las tarjetas
const cards = document.querySelectorAll(".card")
const cardObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "0"
        entry.target.style.transform = "translateY(20px)"
        setTimeout(() => {
          entry.target.style.transition = "all 0.6s ease"
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }, 100)
        cardObserver.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.1 },
)

cards.forEach((card) => {
  cardObserver.observe(card)
})
