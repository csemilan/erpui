import { useState, useEffect, useRef } from 'react';
import { FaUser, FaGraduationCap, FaCreditCard, FaChartLine, FaCog, FaSignOutAlt, FaBars, FaTimes, FaChevronLeft, FaChevronRight, FaEdit, FaSave } from 'react-icons/fa';

interface MenuItem {
  icon: React.ElementType;
  label: string;
}

interface ProfileField {
  label: string;
  name: string;
  type: string;
  value: string;
}

interface EducationField {
  label: string;
  name: string;
  type: string;
  value: string;
}

const menuItems: MenuItem[] = [
  { icon: FaUser, label: 'Profile' },
  { icon: FaGraduationCap, label: 'Education' },
  { icon: FaCreditCard, label: 'Payment' },
  { icon: FaChartLine, label: 'Status' },
  { icon: FaCog, label: 'Setting' },
];

const profileFields: ProfileField[] = [
  { label: 'Student ID', name: 'student_id', type: 'number', value: '' },
  { label: 'First Name', name: 'firstName', type: 'text', value: '' },
  { label: 'Last Name', name: 'lastName', type: 'text', value: '' },
  { label: 'Father\'s Name', name: 'fatherName', type: 'text', value: '' },
  { label: 'Mother\'s Name', name: 'motherName', type: 'text', value: '' },
  { label: 'Permanent Address', name: 'permanent_address', type: 'text', value: '' },
  { label: 'Correspondence Address', name: 'correspondence_address', type: 'text', value: '' },
  { label: 'Father\'s Phone', name: 'fatherPhone', type: 'tel', value: '' },
  { label: 'Mother\'s Phone', name: 'motherPhone', type: 'tel', value: '' },
  { label: 'Father\'s Occupation', name: 'fatherOccupation', type: 'text', value: '' },
  { label: 'Mother\'s Occupation', name: 'motherOccupation', type: 'text', value: '' },
  { label: 'Student Aadhar', name: 'studentAdhar', type: 'text', value: '' },
  { label: 'Gender', name: 'gender', type: 'text', value: '' },
  { label: 'Caste', name: 'caste', type: 'text', value: '' },
  { label: 'Religion', name: 'religion', type: 'text', value: '' },
  { label: '10th Qualification Year', name: '10_QualificationYear', type: 'number', value: '' },
  { label: '10th Qualification College', name: '10_QualificationCollege', type: 'text', value: '' },
  { label: '10th ERN', name: '10_ERN', type: 'text', value: '' },
  { label: '10th Maximum Marks (MM)', name: '10_MM', type: 'number', value: '' },
  { label: '10th Marks Obtained (MO)', name: '10_MO', type: 'number', value: '' },
  { label: '10th Status', name: '10_Status', type: 'text', value: '' },
  { label: '10th Percentage', name: '10_Percentage', type: 'number', value: '' },
  { label: '12th/UG Qualification Year', name: '12_ug_QualificationYear', type: 'number', value: '' },
  { label: '12th/UG Qualification College', name: '12_ug_QualificationCollege', type: 'text', value: '' },
  { label: '12th/UG ERN', name: '12_ug_ERN', type: 'text', value: '' },
  { label: '12th/UG Maximum Marks (MM)', name: '12_ug_MM', type: 'number', value: '' },
  { label: '12th/UG Marks Obtained (MO)', name: '12_ug_MO', type: 'number', value: '' },
  { label: '12th/UG Status', name: '12_ug_Status', type: 'text', value: '' },
  { label: '12th/UG Percentage', name: '12_ug_Percentage', type: 'number', value: '' },

];

const educationFields: EducationField[] = [
  { label: 'Subject Group Name', name: 'subjectGroupName', type: 'text', value: '' },
  { label: 'Subject Name', name: 'subjectName', type: 'text', value: '' },
  { label: 'Major Subject 1', name: 'majorSubject1', type: 'text', value: '' },
  { label: 'Major Subject 2', name: 'majorSubject2', type: 'text', value: '' },
  { label: 'Major Subject 3', name: 'majorSubject3', type: 'text', value: '' },
  { label: 'Minor Subject 1', name: 'minorSubject1', type: 'text', value: '' },
  { label: 'Minor Subject 2', name: 'minorSubject2', type: 'text', value: '' },
  { label: 'Vocational Subject', name: 'vocationalSubject', type: 'text', value: '' },
];

export default function StudentPanel(): JSX.Element {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [activeSection, setActiveSection] = useState<string>('Profile');
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [profileData, setProfileData] = useState<ProfileField[]>(profileFields);
  const [educationData, setEducationData] = useState<EducationField[]>(educationFields);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = (): void => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (isMobile && isSidebarOpen && sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile, isSidebarOpen]);

  const toggleSidebar = (): void => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleMenuItemClick = (label: string): void => {
    setActiveSection(label);
    setIsEditing(false);
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  const handleEditToggle = (): void => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (name: string, value: string, isEducation: boolean = false): void => {
    if (isEducation) {
      setEducationData(prevData =>
        prevData.map(field =>
          field.name === name ? { ...field, value } : field
        )
      );
    } else {
      setProfileData(prevData =>
        prevData.map(field =>
          field.name === name ? { ...field, value } : field
        )
      );
    }
  };

  const handleSave = (): void => {
    console.log('Saving profile data:', profileData);
    console.log('Saving education data:', educationData);
    setIsEditing(false);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`bg-gray-800 text-white ${
          isSidebarOpen ? 'w-64' : 'w-20'
        } space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0 transition duration-200 ease-in-out z-20`}
      >
        <nav className="space-y-3 mb-6">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className={`flex items-center ${
                isSidebarOpen ? 'justify-start space-x-3' : 'justify-center'
              } w-full px-4 py-2.5 rounded transition duration-200 hover:bg-gray-700`}
              onClick={() => handleMenuItemClick(item.label)}
            >
              <item.icon className="w-5 h-5" />
              {isSidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>
        <button
          className={`flex items-center ${
            isSidebarOpen ? 'justify-start space-x-3' : 'justify-center'
          } w-full px-4 py-2.5 rounded transition duration-200 hover:bg-gray-700 mt-auto`}
        >
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
              aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
            >
              {isSidebarOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
            </button>
            <div className="ml-4">
              <h1 className="text-2xl font-semibold">Student Panel</h1>
              <p className="text-sm text-gray-500">Manage your profile and academic information</p>
            </div>
          </div>
          <div className="rounded-full bg-gray-200 p-2">
            <img
              src="/placeholder.svg?height=40&width=40"
              alt="Student Avatar"
              className="w-10 h-10 rounded-full"
            />
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4">
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">{activeSection}</h2>
              <button
                onClick={isEditing ? handleSave : handleEditToggle}
                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200"
              >
                {isEditing ? (
                  <>
                    <FaSave className="mr-2" />
                    Save
                  </>
                ) : (
                  <>
                    <FaEdit className="mr-2" />
                    Edit
                  </>
                )}
              </button>
            </div>
            {activeSection === 'Profile' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {profileData.map((field, index) => (
                  <div key={index} className="space-y-1">
                    <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      id={field.name}
                      name={field.name}
                      value={field.value}
                      onChange={(e) => handleInputChange(field.name, e.target.value)}
                      readOnly={!isEditing}
                      className={`mt-1 block w-full rounded-md py-2 px-3 ${
                        isEditing
                          ? 'border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                          : 'border-transparent bg-gray-100'
                      }`}
                    />
                  </div>
                ))}
              </div>
            )}
            {activeSection === 'Education' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {educationData.map((field, index) => (
                  <div key={index} className="space-y-1">
                    <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      id={field.name}
                      name={field.name}
                      value={field.value}
                      onChange={(e) => handleInputChange(field.name, e.target.value, true)}
                      readOnly={!isEditing}
                      className={`mt-1 block w-full rounded-md py-2 px-3 ${
                        isEditing
                          ? 'border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                          : 'border-transparent bg-gray-100'
                      }`}
                    />
                  </div>
                ))}
              </div>
            )}
            {activeSection !== 'Profile' && activeSection !== 'Education' && (
              <p className="text-gray-500">Content for {activeSection} section goes here.</p>
            )}
          </div>
        </main>
      </div>

      {/* Desktop Sidebar Toggle Button */}
      {!isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed bottom-4 left-4 bg-gray-800 text-white p-2 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50"
          aria-label={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          {isSidebarOpen ? (
            <FaChevronLeft className="w-6 h-6" />
          ) : (
            <FaChevronRight className="w-6 h-6" />
          )}
        </button>
      )}
    </div>
  );
}