import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User, BookOpen, Calendar, Mail, Award, Book } from 'lucide-react';
import { courses } from '../data/courses';

const Profile = () => {
  const { userProfile } = useAuth();

  if (!userProfile) return null;

  const enrolledCourseDetails = courses.filter(course => 
    userProfile.enrolledCourses?.includes(course.id.toString())
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-32"></div>
        <div className="px-6 py-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-32 h-32 bg-indigo-100 dark:bg-gray-700 rounded-full flex items-center justify-center -mt-20 border-4 border-white dark:border-gray-800">
              <User className="w-16 h-16 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div className="md:ml-8 mt-4 md:mt-0 text-center md:text-left">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{userProfile.name}</h1>
              <div className="flex items-center justify-center md:justify-start mt-2">
                <Mail className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-2" />
                <p className="text-gray-500 dark:text-gray-400">{userProfile.email}</p>
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mr-2" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Enrolled Courses</h2>
              </div>
              <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                {userProfile.enrolledCourses?.length || 0}
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Award className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mr-2" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Achievements</h2>
              </div>
              <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                {userProfile.enrolledCourses?.length || 0}
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Calendar className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mr-2" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Member Since</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                {new Date(userProfile.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {enrolledCourseDetails.length > 0 && (
            <div className="mt-12">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">My Courses</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {enrolledCourseDetails.map(course => (
                  <div key={course.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <Book className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {course.title}
                      </h3>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <Clock className="w-4 h-4 mr-1" />
                        {course.duration}
                      </div>
                      <div className="mt-4">
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                          <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '0%' }}></div>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">0% Complete</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;