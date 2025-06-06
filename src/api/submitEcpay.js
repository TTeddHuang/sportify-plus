import axios from 'axios'

export async function submitEcpay(token, payment) {
  try {
    const res = await axios.post(
      'https://sportify.zeabur.app/api/v1/users/create-payment',
      payment,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )
    const wrapper = document.createElement('div')
    wrapper.innerHTML = res.data.trim()
    const form = wrapper.querySelector('form')
    document.body.appendChild(form)
    form.submit()

    setTimeout(() => {
      if (form) {
        form.remove()
      }
    }, 1000)
  } catch (error) {
    console.error('付款跳轉失敗:', error)
    throw error
  }
}
