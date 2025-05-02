import $ from 'jquery'

export default function validate() {
  const forms = document.querySelectorAll('[data-validate]')

  if (!forms.length) return

  forms.forEach(form => {
    form.addEventListener('submit', event => {
      event.preventDefault()
      const inputs = form.querySelectorAll('.input, .checkbox, .textarea'),
        dataReqexp = {
          fio: /^[А-ЯЁа-яё]+(-[А-ЯЁа-яё]+)? [А-ЯЁа-яё]+( [А-ЯЁа-яё]+)?$/,
          personName: /^[а-яёА-ЯЁA-Za-z]+( [а-яёА-ЯЁA-Za-z]+)?$/u,
          email: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
          numbers: /^\d+$/,
        },
        error = (el, msg = 'Обязательное поле') => {
          const message = el.querySelector('.input__message')

          return {
            set: () => {
              if (message) message.innerText = msg
              const isCheckbox = el.querySelector('input[type="checkbox"]')
              el.classList.add(
                isCheckbox
                  ? 'checkbox--error'
                  : el.classList.contains('input')
                    ? 'input--error'
                    : 'textarea--error',
              )
            },
            remove: () => {
              const isCheckbox = el.querySelector('input[type="checkbox"]')
              el.classList.remove(
                isCheckbox
                  ? 'checkbox--error'
                  : el.classList.contains('input')
                    ? 'input--error'
                    : 'textarea--error',
              )
              if (message) message.innerText = ''
            },
          }
        },
        validateInput = input => {
          const field = input.querySelector('input, textarea'),
            name = field.getAttribute('data-input-name'),
            valueField = field.value

          if (field.hasAttribute('isrequired')) {
            if (field.type === 'file') {
              field.files.length > 0
                ? error(input).remove()
                : error(input, 'Выберите файл').set()
            } else if (valueField === '') {
              error(input, 'Обязательное поле').set()
            } else if (valueField !== '') {
              switch (name) {
                case 'name':
                  valueField.length >= 2 &&
                  valueField.match(dataReqexp.personName)
                    ? error(input).remove()
                    : error(input, 'Введите корректное имя').set()
                  break
                case 'fio':
                  valueField.length > 5 && valueField.match(dataReqexp.fio)
                    ? error(input).remove()
                    : error(input, 'Введите корректное ФИО').set()
                  break
                case 'email':
                  valueField.match(dataReqexp.email)
                    ? error(input).remove()
                    : error(input, 'Введите корректный E-mail').set()
                  break
                case 'phone':
                  valueField.length === 18
                    ? error(input).remove()
                    : error(input, 'Введите полный номер телефона').set()
                  break
                case 'message':
                  valueField.length >= 2
                    ? error(input).remove()
                    : error(input, 'Введите сообщение').set()
                  break
                case 'agreement':
                  const checkboxInput = input.querySelector(
                    'input[type="checkbox"]',
                  )
                  const checkboxWrapper = checkboxInput.closest('.checkbox')
                  checkboxInput.checked
                    ? checkboxWrapper.classList.remove('input--error')
                    : checkboxWrapper.classList.add('input--error')
                  break
                default:
                  valueField.length !== 0
                    ? error(input).remove()
                    : error(input).set()
              }
            } else {
              // error(input).set()
            }
          }
        },
        checkFields = () => {
          inputs.forEach(input => {
            validateInput(input)
          })
        },
        lifeValidate = () => {
          inputs.forEach(input => {
            input.addEventListener('click', () => {
              if (form.getAttribute('data-validate')) {
                const field = input.querySelector('input, textarea')

                field.addEventListener('input', () => validateInput(input))
                checkFields()
              }
            })
          })
        },
        validate = () => {
          let errors = 0

          inputs.forEach(input => {
            const field = input.querySelector('input, textarea')
            if (field.type === 'checkbox') {
              if (!field.checked) {
                input.classList.add('input--error')
                errors += 1
              } else {
                input.classList.remove('input--error')
              }
            } else if (field.type === 'file' && field.hasAttribute('isrequired')) {
              if (!field.files.length) {
                input.classList.add('input--error')
                errors += 1
              } else {
                input.classList.remove('input--error')
              }
            } else if (input.classList.contains('input--error')) {
              errors += 1
            }
          })

          if (errors === 0) {
            const submitBtn = form.querySelector('button[type="submit"]')
            const formData = new FormData()
            const formInputs = form.querySelectorAll('input, textarea')

            const successText = 'Ваше сообщение отправлено'
            const errorText = 'Ошибка при отправке формы'
            const resultModal = document.querySelector('#result-modal')

            const clearForm = () => formInputs.forEach(input => input.type === 'checkbox' ? input.checked = false : input.value = '')
            formInputs.forEach(input => {
              if (input.type === 'checkbox') {
                formData.append(input.name, input.checked)
              } else if (input.type === 'file') {
                const file = input.files[0]
                if (file) {
                  formData.append(input.name, file)
                }
              } else {
                formData.append(input.name, input.value)
              }
            })

            submitBtn.classList.add('loading')
            console.table(Object.fromEntries(formData))

            setTimeout(() => {
              $.ajax({
                type: 'POST',
                url: form.getAttribute('action') + '?ajax=Y',
                data: formData,
                processData: false,
                contentType: false,
                success: response => {
                  setTimeout(() => {
                    submitBtn.classList.remove('loading')
                    clearForm()

                    const currentModal = form.closest('.hystmodal')
                    resultModal.querySelector('.modal__title').innerText = successText
                    if (currentModal && window.hystModal) window.hystModal.close()

                    if (resultModal && window.hystModal) {
                      setTimeout(() => {
                        window.hystModal.open('#result-modal')
                      }, 300)
                    }
                  }, 500)
                },
                error: error => {
                  setTimeout(() => {
                    console.error('Ошибка: ', error)
                    submitBtn.classList.remove('loading')
                    clearForm()
                    resultModal.classList.add('modal--error')
                    resultModal.querySelector('.modal__title').innerText = errorText

                    const currentModal = form.closest('.hystmodal')
                    if (currentModal && window.hystModal) window.hystModal.close()

                    if (window.hystModal) {
                      setTimeout(() => {
                        window.hystModal.open('#result-modal')
                      }, 300)
                    }
                  }, 500)
                },
              })
            }, 1000)
          }
        }

      lifeValidate()
      checkFields()
      form.setAttribute('data-validate', 'true')
      form.setAttribute('novalidate', '')
      validate()
    })
  })
}
