import { useState, useRef } from 'react'
import { 
  FaUsers, 
  FaBook, 
  FaCreditCard, 
  FaFileAlt, 
  FaCog, 
  FaSignOutAlt,
  FaChevronLeft,
  FaChevronRight,
  FaChevronDown,
  FaUserPlus,
  FaUserCheck,
  FaBookmark,
  FaGraduationCap,
  FaTachometerAlt,
} from 'react-icons/fa'

const menuItems = [
  { icon: FaTachometerAlt, label: 'Dashboard' },
  { 
    icon: FaUsers, 
    label: 'Profile', 
    subItems: [
      { icon: FaUserPlus, label: 'Add Profile' },
      { icon: FaUserCheck, label: 'Verify Profile' },
    ]
  },
  { 
    icon: FaBook, 
    label: 'Create College',
    subItems: [
      { icon: FaBookmark, label: 'Add College' },
      { icon: FaGraduationCap, label: 'Manage College' },
    ]
  },
  { icon: FaCreditCard, label: 'Payments Config' },
  { icon: FaFileAlt, label: 'Reports' },
  { icon: FaCog, label: 'Settings' },
]

const profileFields = [
  { label: 'Profile ID', name: 'profile_id', type: 'number' },
  { label: 'First Name', name: 'fname', type: 'text' },
  { label: 'Last Name', name: 'lname', type: 'text' },
  { label: 'Email', name: 'email', type: 'email' },
  { label: 'Phone', name: 'phone', type: 'tel' },
  { label: 'Password', name: 'password', type: 'password' },
  { label: 'User Role', name: 'userRole', type: 'text', value: 'SuperAdmin', readOnly: true },
]

const collegeFields = [
  { label: 'College ID', name: 'college_id', type: 'number' },
  { label: 'Logo', name: 'logo', type: 'file' },
  { label: 'College Name', name: 'college_name', type: 'text' },
  { label: 'Address', name: 'address', type: 'text' },
  { label: 'City', name: 'city', type: 'text' },
  { label: 'State', name: 'state', type: 'text' },
  { label: 'Country', name: 'country', type: 'text' },
  { label: 'Postal Code', name: 'postal_code', type: 'text' },
  { label: 'Phone', name: 'phone', type: 'tel' },
  { label: 'Email', name: 'email', type: 'email' },
  { label: 'Website', name: 'website', type: 'url' },
]

const paymentConfigFields = [
  { label: 'AES Key', name: 'aes_key', type: 'text' },
  { label: 'School Name', name: 'school_name', type: 'text' },
  { label: 'APS Key', name: 'aps_key', type: 'text' },
  { label: 'Fee Config', name: 'fee_config', type: 'textarea' },
  { label: 'AES Key', name: 'aes_key', type: 'text' },
  { label: 'School Name', name: 'school_name', type: 'text' },
  { label: 'APS Key', name: 'aps_key', type: 'text' },
  { label: 'Fee Config', name: 'fee_config', type: 'textarea' },
]

export default function SuperAdminPanel() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [activeSection, setActiveSection] = useState('Dashboard')
  const [activeSubSection, setActiveSubSection] = useState('')
  const [expandedMenus, setExpandedMenus] = useState<string[]>([])
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const toggleMenu = (label: string) => {
    setExpandedMenus(prev => 
      prev.includes(label) 
        ? prev.filter(item => item !== label)
        : [...prev, label]
    )
  }

  const handleMenuClick = (label: string, subLabel?: string) => {
    setActiveSection(label)
    setActiveSubSection(subLabel || '')
    if (subLabel) {
      setExpandedMenus(prev => 
        prev.includes(label) ? prev : [...prev, label]
      )
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('Form submitted')
  }

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setLogoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleLogoClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside 
        className={`bg-gray-800 text-white ${
          isSidebarOpen ? 'w-64' : 'w-20'
        } space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-0'
        } md:relative md:translate-x-0 transition duration-200 ease-in-out z-20`}
      >
        <nav className="space-y-1 mb-6">
          {menuItems.map((item, index) => (
            <div key={index}>
              <button
                className={`flex items-center justify-between w-full px-4 py-2.5 text-left transition duration-200 ${
                  activeSection === item.label ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
                onClick={() => item.subItems ? toggleMenu(item.label) : handleMenuClick(item.label)}
              >
                <div className="flex items-center">
                  <item.icon className={`w-5 h-5 ${isSidebarOpen ? 'mr-3' : ''}`} />
                  {isSidebarOpen && <span>{item.label}</span>}
                </div>
                {item.subItems && isSidebarOpen && (
                  <FaChevronDown className={`w-4 h-4 transition-transform duration-200 ${expandedMenus.includes(item.label) ? 'transform rotate-180' : ''}`} />
                )}
              </button>
              {item.subItems && expandedMenus.includes(item.label) && isSidebarOpen && (
                <div className="pl-4 mt-1 space-y-1">
                  {item.subItems.map((subItem, subIndex) => (
                    <button
                      key={subIndex}
                      className={`flex items-center w-full px-4 py-2 text-sm transition duration-200 ${
                        activeSubSection === subItem.label ? 'bg-gray-600 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                      }`}
                      onClick={() => handleMenuClick(item.label, subItem.label)}
                    >
                      <subItem.icon className="w-4 h-4 mr-3" />
                      <span>{subItem.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
        <button className={`flex items-center ${
          isSidebarOpen ? 'justify-start space-x-3' : 'justify-center'
        } w-full px-4 py-2.5 rounded transition duration-200 hover:bg-gray-700 text-left text-gray-300 hover:text-white`}>
          <FaSignOutAlt className="w-5 h-5" />
          {isSidebarOpen && <span>Logout</span>}
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex justify-between items-center p-4 bg-white shadow-md">
          <div className="flex items-center">
            <button 
              onClick={toggleSidebar} 
              className="text-gray-500 focus:outline-none focus:text-gray-700"
              aria-label={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
            >
              {isSidebarOpen ? <FaChevronLeft className="w-6 h-6" /> : <FaChevronRight className="w-6 h-6" />}
            </button>
            <div className="ml-4">
              <h1 className="text-2xl font-semibold">Super Admin Panel</h1>
              <p className="text-sm text-gray-500">College Management System</p>
            </div>
          </div>
          <div className="rounded-full bg-gray-200 p-2">
            <img src="/placeholder.svg?height=40&width=40" alt="Super Admin Logo" className="w-10 h-10 rounded-full" />
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-6">{activeSubSection || activeSection}</h2>
            {activeSection === 'Profile' && activeSubSection === 'Add Profile' && (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {profileFields.map((field, index) => (
                    <div key={index} className="space-y-1">
                      <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        id={field.name}
                        name={field.name}
                        defaultValue={field.value}
                        readOnly={field.readOnly}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200">
                    Add Profile
                  </button>
                </div>
              </form>
            )}
            {activeSection === 'Create College' && activeSubSection === 'Add College' && (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {collegeFields.map((field, index) => (
                    <div key={index} className="space-y-1">
                      <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                        {field.label}
                      </label>
                      {field.name === 'logo' ? (
                        <div className="mt-1 flex items-center">
                          <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                            {logoPreview ? (
                              <img src={logoPreview} alt="College logo preview" className="h-full w-full object-cover" />
                            ) : (
                              <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                              </svg>
                            )}
                          </span>
                          <button
                            type="button"
                            onClick={handleLogoClick}
                            className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Change
                          </button>
                          <input
                            ref={fileInputRef}
                            type="file"
                            id={field.name}
                            name={field.name}
                            accept="image/*"
                            onChange={handleLogoChange}
                            className="hidden"
                          />
                        </div>
                      ) : (
                        <input
                          type={field.type}
                          id={field.name}
                          name={field.name}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        />
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200">
                    Create College
                  </button>
                </div>
              </form>
            )}
            {activeSection === 'Payments Config' && (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
                  {paymentConfigFields.map((field, index) => (
                    <div key={index} className="space-y-1">
                      <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                        {field.label}
                      </label>
                      {field.type === 'textarea' ? (
                        <textarea
                          id={field.name}
                          name={field.name}
                          rows={4}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        />
                      ) : (
                        <input
                          type={field.type}
                          id={field.name}
                          name={field.name}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        />
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200">
                    Save Payment Config
                  </button>
                </div>
              </form>
            )}
            {(activeSection !== 'Profile' && activeSection !== 'Create College' && activeSection !== 'Payments Config') || 
             (activeSection === 'Profile' && activeSubSection !== 'Add Profile') ||
             (activeSection === 'Create College' && activeSubSection !== 'Add College') && (
              <p className="text-gray-500">Content for {activeSubSection || activeSection} section goes here.</p>
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white shadow-md p-4 text-center">
          <p className="text-sm text-gray-600">Powered by @Dps technologies</p>
        </footer>
      </div>
    </div>
  )
}