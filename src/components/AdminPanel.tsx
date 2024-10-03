import { useState } from 'react'
import { 
  FaTachometerAlt, FaUser, FaUserGraduate, FaCreditCard, FaBook, FaStream,
  FaLayerGroup, FaBookOpen, FaGraduationCap, FaPray, FaVenusMars, FaUsers,
  FaBookReader, FaFileAlt, FaCalendarAlt, FaSignOutAlt, FaBars, FaTimes,
  FaChevronDown, FaBell, FaCog
} from 'react-icons/fa'

const menuItems = [
  { icon: FaTachometerAlt, label: 'Dashboard' },
  { icon: FaUser, label: 'Profile' },
  { icon: FaUserGraduate, label: 'Students' },
  { icon: FaCreditCard, label: 'Payments' },
  { icon: FaBook, label: 'Course' },
  { icon: FaFileAlt, label: 'Reports' },
  { icon: FaCalendarAlt, label: 'Sessional Year' },
]

const setupItems = [
  { icon: FaStream, label: 'Stream' },
  { icon: FaLayerGroup, label: 'Subject Group' },
  { icon: FaBookOpen, label: 'Minor Subject' },
  { icon: FaGraduationCap, label: 'Major Subject' },
  { icon: FaPray, label: 'Religion' },
  { icon: FaVenusMars, label: 'Gender Master' },
  { icon: FaUsers, label: 'Caste Master' },
  { icon: FaBookReader, label: 'Vocational Subject' },
]

export default function NewAdminPanel() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [activeSection, setActiveSection] = useState('Dashboard')
  const [showNotice, setShowNotice] = useState(false)
  const [isSetupOpen, setIsSetupOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const handleMenuClick = (label: string) => {
    setActiveSection(label)
    setIsSetupOpen(false)
  }

  const toggleSetup = () => {
    setIsSetupOpen(!isSetupOpen)
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition duration-200 ease-in-out z-20`}>
        <nav className="space-y-1 mb-6">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className={`flex items-center w-full px-4 py-2.5 text-left transition duration-200 ${activeSection === item.label ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
              onClick={() => handleMenuClick(item.label)}
            >
              <item.icon className="w-5 h-5 mr-3" />
              <span>{item.label}</span>
            </button>
          ))}
          <div className="relative">
            <button
              className={`flex items-center justify-between w-full px-4 py-2.5 text-left transition duration-200 ${isSetupOpen ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
              onClick={toggleSetup}
            >
              <div className="flex items-center">
                <FaCog className="w-5 h-5 mr-3" />
                <span>Setup</span>
              </div>
              <FaChevronDown className={`w-4 h-4 transition-transform duration-200 ${isSetupOpen ? 'transform rotate-180' : ''}`} />
            </button>
            {isSetupOpen && (
              <div className="mt-2 pl-4 space-y-1">
                {setupItems.map((item, index) => (
                  <button
                    key={index}
                    className={`flex items-center w-full px-4 py-2 text-sm transition duration-200 ${activeSection === item.label ? 'bg-gray-600 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'}`}
                    onClick={() => handleMenuClick(item.label)}
                  >
                    <item.icon className="w-4 h-4 mr-3" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>
        <button className="flex items-center space-x-3 px-4 py-2.5 rounded transition duration-200 hover:bg-gray-700 w-full text-left text-gray-300 hover:text-white">
          <FaSignOutAlt className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex justify-between items-center p-4 bg-white shadow-md">
          <div className="flex items-center">
            <button onClick={toggleSidebar} className="text-gray-500 focus:outline-none focus:text-gray-700 md:hidden">
              {isSidebarOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
            </button>
            <div className="ml-4 flex items-center">
              <h1 className="text-2xl font-semibold">Admin Panel</h1>
              <button
                onClick={() => setShowNotice(!showNotice)}
                className="ml-4 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <FaBell className="w-6 h-6" />
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <p className="text-sm text-gray-500">College Management System</p>
            <div className="rounded-full bg-gray-200 p-2">
              <img src="/placeholder.svg?height=40&width=40" alt="Admin Logo" className="w-10 h-10 rounded-full" />
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-6">{activeSection}</h2>
            {activeSection === 'Course' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label htmlFor="course_id" className="block text-sm font-medium text-gray-700">Course ID</label>
                  <input type="number" id="course_id" name="course_id" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                </div>
                <div className="space-y-1">
                  <label htmlFor="college_id" className="block text-sm font-medium text-gray-700">College ID</label>
                  <input type="number" id="college_id" name="college_id" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                </div>
                <div className="space-y-1">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                  <input type="text" id="name" name="name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                </div>
                <div className="space-y-1">
                  <label htmlFor="fees" className="block text-sm font-medium text-gray-700">Fees</label>
                  <input type="number" id="fees" name="fees" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                </div>
                <div className="space-y-1">
                  <label htmlFor="last_date" className="block text-sm font-medium text-gray-700">Last Date</label>
                  <input type="date" id="last_date" name="last_date" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                </div>
              </div>
            )}
            {activeSection !== 'Course' && (
              <p className="text-gray-500">Content for {activeSection} section goes here. You can implement forms and data management for each section based on the provided database schema.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}