enum AuthTabType {
  Login = 'Login',
  SignUp = 'SignUp'
}

interface loginCreds {
  email: string
  password: string
}

interface singnUpCreds {
  username:string
  email: string
  password: string
}

interface successAuthdata {
  access_token: string,
  token_type: string
}

interface task {
  title: string,
  description: string,
  due_date: string,
  completed: boolean
}

export {AuthTabType
  , loginCreds, singnUpCreds, successAuthdata,task}