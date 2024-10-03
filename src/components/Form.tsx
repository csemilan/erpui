import{ useState } from 'react'
import { FaUser, FaLock, FaUserPlus, FaEnvelope, FaEye, FaEyeSlash, FaBell, FaTimes, FaPhone, FaGraduationCap, FaSchool, FaCalendarAlt, FaPercent, FaBook, FaIdCard, FaUniversity, FaCheckSquare, FaCog } from 'react-icons/fa'

interface Notice {
  id: number;
  title: string;
  content: string;
  date: string;
}

export default function AdminRegistrationPage() {
  const [studentId, setStudentId] = useState('')
  const [collegeId, setCollegeId] = useState('')
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [lastQualification, setLastQualification] = useState('')
  const [lastSchool, setLastSchool] = useState('')
  const [passingYear, setPassingYear] = useState('')
  const [mm, setMm] = useState('')
  const [mo, setMo] = useState('')
  const [status, setStatus] = useState('')
  const [percentage, setPercentage] = useState('')
  const [courseId, setCourseId] = useState('')

  const [notices, setNotices] = useState<Notice[]>([
    { id: 1, title: "System Maintenance", content: "Scheduled maintenance on Friday, 10 PM - 2 AM.", date: "2023-09-15" },
    { id: 2, title: "New Feature Release", content: "Check out our new dashboard features!", date: "2023-09-14" },
    { id: 3, title: "Holiday Notice", content: "Our offices will be closed on Monday for the national holiday.", date: "2023-09-13" },
  ])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('Registration attempted with:', { 
      studentId, collegeId, fname, lname, email, phone, password, 
      lastQualification, lastSchool, passingYear, mm, mo, status, percentage, courseId 
    })
    // Here you would typically handle the registration logic
  }

  const handleDismissNotice = (id: number) => {
    setNotices(notices.filter(notice => notice.id !== id))
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <FaCog className="mr-2" /> Admin Panel
          </h1>
          <div className="flex items-center">
            <span className="text-gray-500 mr-4">Welcome, Admin</span>
            <img className="h-8 w-8 rounded-full" src="/placeholder.svg?height=32&width=32" alt="Admin" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-grow flex flex-col lg:flex-row">
        {/* Notice Board */}
        <div className="lg:w-1/3 bg-white shadow-md overflow-hidden m-4 rounded-lg">
          <div className="h-full flex flex-col">
            <div className="px-4 py-5 sm:px-6 bg-purple-600">
              <h2 className="text-lg leading-6 font-medium text-white flex items-center">
                <FaBell className="mr-2" /> Notice Board
              </h2>
            </div>
            <div className="flex-grow overflow-y-auto px-4 pb-4">
              <div className="space-y-4 mt-4">
                {notices.map((notice) => (
                  <div key={notice.id} className="bg-purple-50 p-4 rounded-md relative border border-purple-200">
                    <button
                      onClick={() => handleDismissNotice(notice.id)}
                      className="absolute top-2 right-2 text-purple-400 hover:text-purple-600"
                      aria-label="Dismiss notice"
                    >
                      <FaTimes />
                    </button>
                    <h3 className="text-sm font-medium text-purple-900">{notice.title}</h3>
                    <p className="mt-1 text-sm text-purple-700">{notice.content}</p>
                    <p className="mt-2 text-xs text-purple-500">{notice.date}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Registration Form */}
        <div className="lg:w-2/3 bg-white shadow-md overflow-hidden m-4 rounded-lg">
          <div className="h-full flex flex-col">
            <div className="px-4 py-5 sm:px-6 bg-teal-600">
              <h2 className="text-lg leading-6 font-medium text-white">Registration Form</h2>
            </div>
            <div className="flex-grow overflow-y-auto px-4 pb-4">
              <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                  {[
                    { id: 'student-id', label: 'Student ID', icon: FaIdCard, value: studentId, setValue: setStudentId },
                    { id: 'college-id', label: 'College ID', icon: FaUniversity, value: collegeId, setValue: setCollegeId },
                    { id: 'fname', label: 'First Name', icon: FaUser, value: fname, setValue: setFname },
                    { id: 'lname', label: 'Last Name', icon: FaUser, value: lname, setValue: setLname },
                    { id: 'email', label: 'Email', icon: FaEnvelope, value: email, setValue: setEmail, type: 'email' },
                    { id: 'phone', label: 'Phone', icon: FaPhone, value: phone, setValue: setPhone, type: 'tel' },
                    { id: 'last-qualification', label: 'Last Qualification', icon: FaGraduationCap, value: lastQualification, setValue: setLastQualification },
                    { id: 'last-school', label: 'Last School/College', icon: FaSchool, value: lastSchool, setValue: setLastSchool },
                    { id: 'passing-year', label: 'Passing Year', icon: FaCalendarAlt, value: passingYear, setValue: setPassingYear, type: 'number' },
                    { id: 'percentage', label: 'Percentage', icon: FaPercent, value: percentage, setValue: setPercentage, type: 'number', step: '0.01' },
                    { id: 'mm', label: 'Maximum Marks (MM)', icon: FaCheckSquare, value: mm, setValue: setMm, type: 'number' },
                    { id: 'mo', label: 'Marks Obtained (MO)', icon: FaCheckSquare, value: mo, setValue: setMo, type: 'number' },
                    { id: 'status', label: 'Status', icon: FaCheckSquare, value: status, setValue: setStatus },
                    { id: 'course-id', label: 'Course ID', icon: FaBook, value: courseId, setValue: setCourseId, type: 'number' },
                  ].map((field) => (
                    <div key={field.id}>
                      <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-1">
                        {field.label}
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <field.icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                        <input
                          type={field.type || 'text'}
                          name={field.id}
                          id={field.id}
                          step={field.step}
                          className="focus:ring-teal-500 focus:border-teal-500 block w-full pl-10 pr-3 py-3 sm:text-sm border-gray-300 rounded-md text-lg"
                          placeholder={field.label}
                          value={field.value}
                          onChange={(e) => field.setValue(e.target.value)}
                        />
                      </div>
                    </div>
                  ))}
                  
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaLock className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        id="password"
                        className="focus:ring-teal-500 focus:border-teal-500 block w-full pl-10 pr-10 py-3 sm:text-sm border-gray-300 rounded-md text-lg"
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
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                  >
                    <FaUserPlus className="mr-2 h-6 w-6" />
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}