import React from 'react';
import { Clock, Star, Users, BookOpen } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { createCheckoutSession } from '../lib/stripe';
import toast from 'react-hot-toast';

interface CourseCardProps {
  course: {
    id: number;
    title: string;
    description: string;
    image: string;
    price: number;
    duration: string;
    level: string;
    students: number;
    rating: number;
    lessons: number;
  };
}

export default function CourseCard({ course }: CourseCardProps) {
  const { user, userProfile } = useAuth();
  const [enrolling, setEnrolling] = React.useState(false);

  const handleEnroll = async () => {
    if (!user) {
      toast.error('Please login to enroll in courses');
      return;
    }

    try {
      setEnrolling(true);
      const session = await createCheckoutSession(course.id.toString(), user.uid);
      
      // Redirect to Stripe Checkout
      const stripe = await stripePromise;
      if (stripe) {
        const { error } = await stripe.redirectToCheckout({
          sessionId: session.id,
        });
        if (error) {
          toast.error(error.message);
        }
      }
    } catch (error) {
      toast.error('Failed to enroll in course');
    } finally {
      setEnrolling(false);
    }
  };

  const isEnrolled = userProfile?.enrolledCourses?.includes(course.id.toString());

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-indigo-600 dark:text-indigo-400 rounded-full text-sm font-semibold">
            {course.level}
          </span>
        </div>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-400" fill="currentColor" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{course.rating}</span>
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            <Users className="h-4 w-4 inline mr-1" />
            {course.students.toLocaleString()}
          </span>
        </div>
        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {course.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">{course.description}</p>
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {course.duration}
          </div>
          <div className="flex items-center">
            <BookOpen className="h-4 w-4 mr-1" />
            {course.lessons} lessons
          </div>
        </div>
        <div className="flex items-center justify-between pt-4 border-t dark:border-gray-700">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">${course.price}</span>
          {isEnrolled ? (
            <button className="bg-green-600 text-white px-6 py-2 rounded-lg cursor-default">
              Enrolled
            </button>
          ) : (
            <button
              onClick={handleEnroll}
              disabled={enrolling}
              className="bg-indigo-600 dark:bg-indigo-500 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transform hover:scale-105 transition-all duration-300 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:ring-offset-gray-800 disabled:opacity-50"
            >
              {enrolling ? 'Processing...' : 'Enroll Now'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}