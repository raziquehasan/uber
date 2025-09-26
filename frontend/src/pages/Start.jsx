
import React from 'react'
import { Link } from 'react-router-dom'
const Start = () => {
  return (
    <div>
      <div className='bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1619059558110-c45be64b73ae?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen pt-8 flex justify-between flex-col w-full'>
        <img className='w-16 ml-8' src="https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoid2VhcmVcL2ZpbGVcLzhGbTh4cU5SZGZUVjUxYVh3bnEyLnN2ZyJ9:weare:F1cOF9Bps96cMy7r9Y2d7affBYsDeiDoIHfqZrbcxAw?width=1200&height=417" alt="" />
        <div className='bg-white pb-8 py-4 px-4'>
          <h2 className='text-[30px] font-semibold'>Get Started with Uber</h2>
          <p className='text-gray-600 text-sm mb-6'>Choose how you want to use Uber</p>
          
          {/* User Login */}
          <Link to='/login' className='flex items-center justify-center w-full bg-black text-white py-4 rounded-lg mt-4 hover:bg-gray-800 transition-colors'>
            <div className="flex items-center">
              <i className="ri-user-line text-xl mr-3"></i>
              <div className="text-left">
                <div className="font-semibold">Continue as Rider</div>
                <div className="text-sm opacity-80">Book and track your rides</div>
              </div>
            </div>
          </Link>
          
          {/* Captain Login */}
          <Link to='/captain-login' className='flex items-center justify-center w-full bg-gray-100 text-gray-900 py-4 rounded-lg mt-3 hover:bg-gray-200 transition-colors border border-gray-300'>
            <div className="flex items-center">
              <i className="ri-steering-2-line text-xl mr-3"></i>
              <div className="text-left">
                <div className="font-semibold">Continue as Captain</div>
                <div className="text-sm opacity-70">Drive and earn with Uber</div>
              </div>
            </div>
          </Link>
          
          {/* Sign up options */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-center text-sm text-gray-600 mb-3">New to Uber?</p>
            <div className="flex space-x-3">
              <Link to='/signup' className='flex-1 text-center py-2 px-4 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors'>
                Sign up as Rider
              </Link>
              <Link to='/captain-signup' className='flex-1 text-center py-2 px-4 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors'>
                Sign up as Captain
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Start