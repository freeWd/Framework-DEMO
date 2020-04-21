export default function({ $axios, redirect }) {
  $axios.onRequest((config) => {
    console.log(config.url, '<--- http request interceptor')
  })

  $axios.onResponse((response) => {
    console.log(response.status, '<---- http response interceptor')
  })

  $axios.onError((error) => {
    console.log(error, '<---- http error interceptor')
    if (error.response.status === 500) {
      redirect('/')
    }
  })
}
