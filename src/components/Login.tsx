import { useState } from 'react'
import { FaLock, FaSignInAlt, FaEnvelope, FaEye, FaEyeSlash, FaBell, FaTimes, FaCog, FaUserPlus } from 'react-icons/fa'

interface Notice {
  id: number;
  title: string;
  content: string;
  date: string;
}

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [notices, setNotices] = useState<Notice[]>([
    { id: 1, title: "System Maintenance", content: "Scheduled maintenance on Friday, 10 PM - 2 AM.", date: "2023-09-15" },
    { id: 2, title: "New Feature Release", content: "Check out our new dashboard features!", date: "2023-09-14" },
    { id: 3, title: "Holiday Notice", content: "Our offices will be closed on Monday for the national holiday.", date: "2023-09-13" },
    { id: 4, title: "New Feature Release", content: "Check out our new dashboard features!", date: "2023-09-14" },
    { id: 5, title: "Holiday Notice", content: "Our offices will be closed on Monday for the national holiday.", date: "2023-09-13" },
    { id: 6, title: "New Feature Release", content: "Check out our new dashboard features!", date: "2023-09-14" },
  ])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('Login attempted with:', { email, password })
    // Here you would typically handle the login logic
  }

  const handleDismissNotice = (id: number) => {
    setNotices(notices.filter(notice => notice.id !== id))
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <img src="/placeholder.svg?height=40&width=40" alt="Logo" className="h-12 w-12 mr-3" />
            <div>
              <h1 className="text-2xl font-bold text-blue-950 flex items-center">
                <FaCog className="mr-2 h-6 w-6" /> Delhi Public School
              </h1>
              <p className="text-sm text-gray-600">123 Education Street, New Delhi, India</p>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-grow flex flex-col lg:flex-row p-4 space-y-4 lg:space-y-0 lg:space-x-4">
        {/* Notice Board */}
        <div className="w-full lg:w-1/2">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-blue-950 flex items-center">
              <FaBell className="mr-2" /> Notice Board
            </h2>
            <div className="space-y-4">
              {notices.map((notice) => (
                <div key={notice.id} className="bg-gray-50 p-4 rounded-md relative">
                  <button
                    onClick={() => handleDismissNotice(notice.id)}
                    className="absolute top-2 right-2 text-blue-700 hover:text-gray-700"
                    aria-label="Dismiss notice"
                  >
                    <FaTimes />
                  </button>
                  <h3 className="font-semibold">{notice.title}</h3>
                  <p className="text-sm text-blue-700 mt-1">{notice.content}</p>
                  <p className="text-xs text-blue-900 mt-2">{notice.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Login Form */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center">
          <h2 className="text-5xl font-bold mb-4 text-blue-950 h-10"> ONLINE REGISTRATION</h2>
          <h4 className="text-1xl font-bold mb-4 text-blue-950">NOW OPEN FOR REGISTRATION</h4>
          <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
            <h3 className="text-center text-3xl font-extrabold text-gray-900 mb-6">
              Sign in to your account
            </h3>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    className="appearance-none block w-full px-3 py-2 pl-10 pr-10 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500"
                    >
                      {showPassword ? (
                        <FaEyeSlash className="h-5 w-5" aria-hidden="true" />
                      ) : (
                        <FaEye className="h-5 w-5" aria-hidden="true" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="./Reset" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="w-1/2 flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <FaSignInAlt className="h-5 w-5 mr-2" aria-hidden="true" />
                  Sign in
                </button>
                <button
                  type="button"
                  className="w-1/2 flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <FaUserPlus className="h-5 w-5 mr-2" aria-hidden="true" />
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="bg-white shadow-md mt-8">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-sm">
          Powered by @Dps Technologies
        </div>
      </footer>
    </div>
  )
}