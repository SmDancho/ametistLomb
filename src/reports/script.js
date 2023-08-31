const form = document.querySelector('.reports__form')
const formBtn = document.querySelector('#formBtn')
const userLogin = document.querySelector('#login')
const password = document.querySelector('#password')
const dataDiv = document.querySelector('.dataDiv')
const logoutBtn = document.querySelector('.logout__btn')

formBtn.addEventListener('click', (e) => {
    e.preventDefault()
    login()
    getMe()
    checkAuthentication()
})



async function login() {
    const option = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: userLogin.value,
            password: password.value,
        }),
    }

    const data = await fetch('https://marker-back-production.up.railway.app/auth/login', option).then(data => data).then(response => response.json())

    localStorage.setItem('user', JSON.stringify(data.user))
    localStorage.setItem('token', data.token)
    if (data) {
        window.location.reload()
    }

}

async function getMe() {
    const option = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${window.localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
        },
    }

    const data = await fetch('https://marker-back-production.up.railway.app/auth/getMe', option).then(response => response)
    const user = await data.json()
    if (user.user) {
        window.localStorage.setItem('user', JSON.stringify(user))
    }

}

function checkAuthentication() {

    if (window.localStorage.getItem('user')) {

        dataDiv.innerHTML = `
        <div class="user__info">
        <button type="button" class="logout__btn">Выйти</button>

        </div>
        <div class="reports__wrapper">
        
        <h3 class="reports__title">Отчеты</h3>
        <ul class="reports">
        <li class="reports__item">
          <a download href="../reports/01.01.2023_f1_oomd_g_draft (1).xlsx"
            >01.01.2023_f1_oomd_g_draft (1).xlsx</a
          >
        </li>
        <li class="reports__item">
          <a download href="../reports/01.01.2023_f2_oomd_g_draft.xlsx"
            >01.01.2023_f2_oomd_g_draft (1).xlsx</a
          >
        </li>
        <li class="reports__item">
          <a download href="../reports/01.01.2023_f3_oomd_g_draft.xlsx"
            >01.01.2023_f3_oomd_g_draft (1).xlsx</a
          >
        </li>
        <li class="reports__item">
          <a download href="../reports/01.01.2023_f4_oomd_g_draft.xlsx"
            >01.01.2023_f4_oomd_g_draft (1).xlsx</a
          >
        </li>
      </ul>
        </div>
       
        `
        dataDiv.children[0].childNodes[1]?.addEventListener('click', () => {
            window.localStorage.removeItem('user')
            window.localStorage.removeItem('token')
            window.location.reload()
        })
    }



}

checkAuthentication()

